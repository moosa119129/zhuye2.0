"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Search,
    Sparkles,
    Trash2,
    RefreshCcw,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Trophy,
    Target,
    ShieldCheck
} from "lucide-react";
import { ALL_SCHOOLS } from "@/components/wisefill/data";
import { School, Strategy } from "@/components/wisefill/types";

export default function WiseFillPage() {
    const [score, setScore] = useState<number | "">("");
    const [strategy, setStrategy] = useState<Strategy>(null);
    const [slots, setSlots] = useState<(School | null)[]>(Array(8).fill(null));
    const [aiText, setAiText] = useState("等待输入分数和策略...");

    const currentRanking = useMemo(() => {
        if (!score) return 0;
        return Math.max(1, Math.floor(50000 - (Number(score) * 70)));
    }, [score]);

    const recommendations = useMemo(() => {
        if (!score) return [];
        const numScore = Number(score);
        return ALL_SCHOOLS
            .filter(s => Math.abs(s.score - numScore) <= 25)
            .sort((a, b) => Math.abs(a.score - numScore) - Math.abs(b.score - numScore))
            .slice(0, 10);
    }, [score]);

    useEffect(() => {
        if (!score) {
            setAiText("请在左侧输入您的中考分数，系统将为您匹配最佳学校。");
            return;
        }
        if (!strategy) {
            setAiText(`当前分数 ${score}，预计位次约 ${currentRanking}。请选择一种填报策略。`);
            return;
        }

        const filledCount = slots.filter(s => s !== null).length;
        const rushCount = slots.filter(s => s && s.score > Number(score)).length;
        const stableCount = slots.filter(s => s && s.score <= Number(score) && s.score >= Number(score) - 10).length;

        let analysis = `已应用 [${strategy === 'rush' ? '冲刺' : strategy === 'stable' ? '稳健' : '保底'}] 策略。`;
        analysis += ` 当前包含 ${rushCount} 个冲刺志愿，${stableCount} 个稳妥志愿。`;
        if (filledCount < 8) {
            analysis += " ⚠️ 建议填满 8 个志愿以分散风险。";
        } else {
            analysis += " ✅ 志愿已满，梯度分布合理。";
        }
        setAiText(analysis);
    }, [score, strategy, slots, currentRanking]);

    const handleStrategyChange = (newStrategy: Strategy) => {
        setStrategy(newStrategy);
        if (!score) return;

        const numScore = Number(score);
        const rushPool = ALL_SCHOOLS.filter(s => s.score > numScore && s.score <= numScore + 15).sort((a, b) => a.score - b.score);
        const stablePool = ALL_SCHOOLS.filter(s => s.score <= numScore && s.score >= numScore - 10).sort((a, b) => b.score - a.score);
        const protectPool = ALL_SCHOOLS.filter(s => s.score < numScore - 10 && s.score >= numScore - 40).sort((a, b) => b.score - a.score);

        let targetSchools: School[] = [];
        if (newStrategy === 'rush') {
            targetSchools = [...rushPool.slice(0, 3), ...stablePool.slice(0, 3), ...protectPool.slice(0, 2)];
        } else if (newStrategy === 'stable') {
            targetSchools = [...rushPool.slice(0, 1), ...stablePool.slice(0, 5), ...protectPool.slice(0, 2)];
        } else {
            targetSchools = [...stablePool.slice(0, 3), ...protectPool.slice(0, 5)];
        }

        targetSchools.sort((a, b) => b.score - a.score);
        const newSlots = Array(8).fill(null);
        targetSchools.slice(0, 8).forEach((school, i) => { newSlots[i] = school; });
        setSlots(newSlots);
    };

    const addSchool = (school: School) => {
        const firstEmpty = slots.indexOf(null);
        if (firstEmpty !== -1) {
            const newSlots = [...slots];
            newSlots[firstEmpty] = school;
            setSlots(newSlots);
        }
    };

    const removeSchool = (index: number) => {
        const newSlots = [...slots];
        newSlots[index] = null;
        setSlots(newSlots);
    };

    const reset = () => {
        setScore("");
        setStrategy(null);
        setSlots(Array(8).fill(null));
    };

    return (
        <main className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Top Banner / Breadcrumb */}
                <div className="flex items-center gap-2">
                    <Link href="/ai" className="text-charcoal-light hover:text-charcoal font-bold flex items-center gap-1">
                        实验室
                    </Link>
                    <ChevronRight size={16} className="text-charcoal-light" />
                    <span className="text-charcoal font-black">WiseFill</span>
                </div>

                <div className="grid lg:grid-cols-[350px_1fr_320px] gap-8 items-stretch">
                    {/* Left: Score & Control */}
                    <section className="flex flex-col gap-6 h-full">
                        <div className="bg-white border-[3px] border-charcoal shadow-pop-md p-6 flex-grow">
                            <h2 className="text-2xl font-black text-charcoal mb-6 flex items-center gap-2">
                                <Target className="text-pop-pink" /> 填报基础
                            </h2>

                            <div className="mb-6">
                                <label className="block text-sm font-black text-charcoal mb-2 uppercase">Your Score / 成绩</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value ? Number(e.target.value) : "")}
                                        placeholder="输入中考分数..."
                                        className="w-full bg-white border-[3px] border-charcoal p-4 text-2xl font-black focus:outline-none focus:bg-pop-yellow transition-colors placeholder:text-neutral-300"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal font-black opacity-30 italic">PTS</div>
                                </div>
                            </div>

                            <div className="bg-neutral-100 border-[3px] border-charcoal p-4 mb-6">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xs font-black text-charcoal-light uppercase">Est. Ranking / 估位</span>
                                    <span className="text-2xl font-black text-charcoal">{currentRanking.toLocaleString()}</span>
                                </div>
                                <div className="h-2 bg-white border-[2px] border-charcoal overflow-hidden">
                                    <motion.div
                                        className="h-full bg-pop-cyan"
                                        initial={{ width: 0 }}
                                        animate={{ width: score ? `${Math.min(100, (Number(score) / 700) * 100)}%` : 0 }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={reset}
                                className="w-full flex items-center justify-center gap-2 border-[3px] border-charcoal py-3 font-black hover:bg-neutral-100 transition-colors"
                            >
                                <RefreshCcw size={18} /> 重置所有
                            </button>
                        </div>

                        {/* AI Analysis Box */}
                        <div className="bg-pop-pink border-[3px] border-charcoal shadow-pop-md p-6 text-charcoal">
                            <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                                <Sparkles size={20} /> AI 实时分析
                            </h3>
                            <p className="font-bold leading-relaxed">{aiText}</p>
                        </div>
                    </section>

                    {/* Middle: Selection Slots */}
                    <section className="flex flex-col gap-6 h-full">
                        {/* Strategy Selection */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'rush', label: '冲刺型', color: 'bg-pop-yellow', icon: <Trophy size={18} /> },
                                { id: 'stable', label: '稳健型', color: 'bg-pop-cyan', icon: <ShieldCheck size={18} /> },
                                { id: 'protect', label: '保底型', color: 'bg-pop-green', icon: <CheckCircle2 size={18} /> }
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    disabled={!score}
                                    onClick={() => handleStrategyChange(s.id as Strategy)}
                                    className={`flex flex-col items-center justify-center p-4 border-[3px] border-charcoal transition-all shadow-pop-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${strategy === s.id ? s.color : 'bg-white opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                                        } ${!score ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <div className="mb-1">{s.icon}</div>
                                    <span className="font-black text-sm">{s.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Slots */}
                        <div className="bg-white border-[3px] border-charcoal shadow-pop-md overflow-hidden">
                            <div className="bg-charcoal p-3 flex justify-between items-center">
                                <h2 className="text-white font-black text-lg">志愿方案表</h2>
                                <span className="text-pop-yellow text-xs font-black">VOLUNTEER LIST (8)</span>
                            </div>
                            <div className="divide-y-[3px] divide-charcoal">
                                {slots.map((slot, i) => (
                                    <div key={i} className="flex h-20 group">
                                        <div className="w-12 bg-neutral-100 flex items-center justify-center border-r-[3px] border-charcoal font-black text-xl italic text-charcoal-light">
                                            {i + 1}
                                        </div>
                                        <div className="flex-grow flex items-center px-6 relative overflow-hidden bg-white">
                                            {slot ? (
                                                <div className="flex items-center justify-between w-full">
                                                    <div>
                                                        <h4 className="font-black text-xl text-charcoal">{slot.name}</h4>
                                                        <div className="flex gap-2">
                                                            <span className="text-xs font-bold text-pop-pink">{slot.score}分</span>
                                                            <span className="text-xs font-bold text-charcoal-light opacity-50">录取率 {slot.probability}%</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeSchool(i)}
                                                        className="text-neutral-300 hover:text-pop-pink transition-colors p-2"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-neutral-300 font-bold italic select-none">待选择或拖拽...</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={!score || slots.every(s => s === null)}
                            className="w-full bg-charcoal text-white py-5 font-black text-2xl border-[3px] border-charcoal shadow-pop-md hover:bg-pop-pink transition-colors disabled:bg-neutral-200 disabled:border-neutral-300 disabled:shadow-none"
                        >
                            立刻生成方案 PDF
                        </button>
                    </section>

                    {/* Right: Recommendation Pool */}
                    <section className="flex flex-col gap-6 h-full">
                        <div className="bg-white border-[3px] border-charcoal shadow-pop-md h-full flex flex-col">
                            <div className="p-4 border-b-[3px] border-charcoal bg-neutral-100 flex items-center gap-2">
                                <Search size={18} className="text-charcoal" />
                                <span className="font-black text-sm uppercase">Quick Search</span>
                            </div>

                            <div className="p-4 flex-grow overflow-hidden relative">
                                <motion.div
                                    className="divide-y-[1px] divide-neutral-100"
                                    animate={{
                                        y: recommendations.length > 5 ? [0, -200, 0] : 0
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >

                                    {!score ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-300">
                                            <AlertCircle size={40} className="mb-2" />
                                            <p className="font-bold italic">输入分数显示推荐</p>
                                        </div>
                                    ) : (
                                        recommendations.map(school => (
                                            <div key={school.id} className="py-4 flex items-center justify-between group">
                                                <div>
                                                    <h4 className="font-black text-charcoal group-hover:text-pop-pink transition-colors">{school.name}</h4>
                                                    <span className="text-xs font-bold bg-neutral-100 border border-charcoal px-2 py-0.5">{school.score}分</span>
                                                </div>
                                                <button
                                                    onClick={() => addSchool(school)}
                                                    className="bg-white border-[2px] border-charcoal w-8 h-8 flex items-center justify-center font-black hover:bg-pop-yellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
