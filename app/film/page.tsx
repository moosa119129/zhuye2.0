"use client";

import { ArrowRight, Play, BookOpen, Brain, Film, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

const pre_view_points = [
    { title: "个人核心理念", desc: "关于教育、AI与个体成长的深度思考", icon: "💡" },
    { title: "实战案例拆解", desc: "真实升学规划与AI提效方案展示", icon: "📊" },
    { title: "幕后创作空间", desc: "带你走进我的内容工作室", icon: "🎙️" },
    { title: "未来合作机会", desc: "我能为你提供的具体价值与路径", icon: "🚀" },
];

function PlaceholderPlayer() {
    return (
        <div className="relative group">
            {/* 装饰阴影层 */}
            <div className="absolute top-4 left-4 w-full h-full bg-pop-pink border-[4px] border-charcoal pointer-events-none" />

            <div className="relative w-full aspect-video border-[4px] border-charcoal bg-white overflow-hidden shadow-pop-sm flex flex-col items-center justify-center">
                {/* 网格背景 */}
                <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
                
                {/* 装饰线条 */}
                <div className="absolute top-0 left-0 w-full h-2 bg-pop-gradient border-b-[2px] border-charcoal" />
                <div className="absolute bottom-0 left-0 w-full h-2 bg-pop-gradient border-t-[2px] border-charcoal" />

                {/* 核心占位内容 */}
                <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-pop-yellow border-[4px] border-charcoal flex items-center justify-center shadow-pop-md rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Film className="w-12 h-12 md:w-16 md:h-16 text-charcoal" />
                    </div>
                    
                    <div className="space-y-2">
                        <div className="inline-block bg-charcoal text-white font-black px-4 py-1 skew-x-[-10deg] text-xl md:text-2xl">
                            <span className="inline-block skew-x-[10deg] italic tracking-tighter uppercase">Film Under Construction</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter mt-4">
                            宣传片正在剪辑中
                        </h3>
                        <p className="text-charcoal-muted font-bold text-sm md:text-lg max-w-md mx-auto leading-tight">
                            我们正在打磨每一个镜头，力求最真实地呈现“面面的爸爸”的核心价值。
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-pop-cyan/10 border-[2px] border-charcoal/20 rounded-full">
                        <Clock size={16} className="text-charcoal-muted animate-pulse" />
                        <span className="text-xs font-black text-charcoal-muted uppercase tracking-widest">Expected Release: 2026 Q2</span>
                    </div>
                </div>

                {/* 四角装饰 */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-4 border-l-4 border-charcoal" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-4 border-r-4 border-charcoal" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-4 border-l-4 border-charcoal" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-4 border-r-4 border-charcoal" />
            </div>
        </div>
    );
}

export default function FilmPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* ── 标题区 ── */}
            <section className="py-24 border-b-[3px] border-charcoal relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-80 h-80 bg-pop-cyan opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container max-w-5xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="mb-6">
                            <span className="bg-pop-yellow text-charcoal font-black px-4 py-1.5 border-[3px] border-charcoal shadow-pop-sm inline-block uppercase tracking-widest text-sm skew-x-[-6deg]">
                                <span className="inline-block skew-x-[6deg]">个人形象片</span>
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-6 tracking-tighter leading-none whitespace-nowrap">
                            关于我，这里有更直观的答案。
                        </h1>
                        <p className="text-xl text-charcoal-muted font-bold leading-relaxed max-w-lg">
                            我们正在制作一部短片，希望能在一杯咖啡的时间里，带你走近我的教育探索与AI实践。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 视频占位区 ── */}
            <section className="py-20">
                <div className="container max-w-5xl mx-auto px-6">
                    <PlaceholderPlayer />

                    {/* 预告点展示 */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* 左侧：看点预览 */}
                        <div className="border-[4px] border-charcoal shadow-pop-md bg-white p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-pop-orange/5 border-b-[4px] border-l-[4px] border-charcoal -rotate-45 translate-x-12 -translate-y-12" />
                            <h2 className="text-3xl font-black text-charcoal mb-8 italic flex items-center gap-3">
                                <Sparkles className="text-pop-orange" /> 片中精彩预告
                            </h2>
                            <div className="space-y-6">
                                {pre_view_points.map((point, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 border-2 border-transparent hover:border-charcoal hover:bg-pop-orange/5 transition-all duration-300 group">
                                        <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{point.icon}</div>
                                        <div>
                                            <h4 className="font-black text-lg text-charcoal mb-1">{point.title}</h4>
                                            <p className="text-sm text-charcoal-muted font-bold leading-tight">{point.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 右侧：品牌承诺 */}
                        <div className="flex flex-col gap-8">
                            <div className="flex-1 border-[4px] border-charcoal shadow-pop-md bg-pop-cyan/10 p-10 flex flex-col justify-center">
                                <h3 className="text-2xl font-black text-charcoal mb-4">为什么要做这部片子？</h3>
                                <p className="text-charcoal-muted font-bold leading-relaxed">
                                    文字是深邃的，而视频是鲜活的。我想通过镜头让你看到：那些关于“升学规划”的理性分析背后，是一个怎样的父亲，在如何用AI的力量，重塑教育的边界。
                                </p>
                            </div>
                            
                            <div className="border-[4px] border-charcoal shadow-pop-md bg-charcoal text-white p-10 group">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-pop-yellow rounded-full" /> 
                                    同步获取发布通知
                                </h3>
                                <Link href="/connect" className="inline-flex items-center gap-4 text-2xl font-black hover:text-pop-yellow transition-colors group">
                                    去订阅我的频道
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 底部引导 ── */}
            <section className="py-24 border-t-[3px] border-charcoal bg-[#1A1A1A] relative overflow-hidden">
                {/* 装饰性网格 */}
                <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />
                
                <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                        视频还没准备好，<br />
                        <span className="text-pop-yellow italic">但我的行动从未停止。</span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl font-bold mb-12 max-w-2xl mx-auto">
                        你可以先通过我的作品集了解我的实践成果，或者直接联系我探讨你的需求。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/works" className="px-10 py-5 bg-pop-yellow text-charcoal font-black text-xl border-[4px] border-charcoal shadow-pop-sm hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
                            浏览实战案例
                        </Link>
                        <Link href="/connect" className="px-10 py-5 bg-white text-charcoal font-black text-xl border-[4px] border-charcoal shadow-pop-sm hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
                            预约 1v1 沟通
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
