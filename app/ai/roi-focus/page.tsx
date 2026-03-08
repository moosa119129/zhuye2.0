"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ROIDashboard } from "@/components/roi-focus/Dashboard";

export default function ROIFocusPage() {
    return (
        <div className="min-h-screen bg-white text-charcoal font-sans selection:bg-pop-yellow selection:text-charcoal pt-32 pb-24">
            {/* Header / Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <Link
                    href="/ai"
                    className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:text-pop-pink transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Lab
                </Link>

                <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-pop-pink p-2 border-[3px] border-charcoal shadow-pop-sm">
                                <Target size={24} className="text-white" />
                            </div>
                            <span className="font-black text-sm uppercase tracking-tighter bg-charcoal text-white px-3 py-1 italic">
                                Productivity Lab
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-charcoal leading-[0.9]">
                            ROI FOCUS<span className="text-pop-pink">.</span>
                        </h1>
                    </div>
                    <div className="max-w-md">
                        <p className="font-bold text-lg leading-snug border-l-[6px] border-charcoal pl-6 italic">
                            基于“投资回报率”视角的时间管理工具。通过量化单位工时的产出价值，帮助你识别“资产型”工作与“损耗型”杂务。
                        </p>
                    </div>
                </div>
            </div>

            {/* Main App Content */}
            <div className="max-w-7xl mx-auto px-6">
                <ROIDashboard />
            </div>

            {/* Methodology Section */}
            <div className="max-w-7xl mx-auto px-6 mt-32">
                <div className="bg-charcoal p-12 text-white border-[3px] border-charcoal relative overflow-hidden">
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-black mb-6 italic uppercase tracking-tighter">
                                <span className="text-pop-yellow decoration-solid underline decoration-4">The Methodology</span><br />
                                像经营公司一样经营你的时间
                            </h2>
                            <div className="space-y-6 opacity-90 font-bold">
                                <p>
                                    核心逻辑：你的每一分钟都是资本。
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <Zap className="text-pop-cyan shrink-0" />
                                        <span>核心资产：直接产生利润或长期积累的能力，应占据 60% 以上。</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <TrendingUp className="text-pop-pink shrink-0" />
                                        <span>杠杆建设：通过 SOP、工具或自动化，让未来的 1 小时产生 10 小时的效果。</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <ShieldCheck className="text-pop-yellow shrink-0" />
                                        <span>隔离损耗：琐事是隐形赤字，必须通过批量处理、授权或拒绝来控制。</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-64 h-64 border-[10px] border-pop-yellow rounded-full flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-500">
                                <span className="text-6xl font-black text-pop-yellow italic uppercase">60%</span>
                            </div>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pop-pink/10 blur-3xl rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
