"use client";

import { ArrowRight, Play, BookOpen, Brain, Film } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const chapters = [
    { time: "00:00", title: "一个教育博主的三件事", icon: "📌" },
    { time: "02:00", title: "升学这条路，怎么走才不绕弯", icon: "🎓" },
    { time: "04:30", title: "AI时代，每个人都可以做更多", icon: "🤖" },
    { time: "07:00", title: "用镜头帮你把好内容传递出去", icon: "🎬" },
    { time: "09:00", title: "下一步，我能帮你做什么", icon: "🤝" },
];

function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    // B站嵌入参数：autoplay=1, high_quality=1, danmaku=0
    // 待正式宣传片完成后替换 bvid
    const videoUrl = "//player.bilibili.com/player.html?bvid=BV1LzPjzvE73&page=1&high_quality=1&danmaku=0&autoplay=1";

    return (
        <div className="relative group">
            {/* 装饰阴影层 */}
            <div className="absolute top-3 left-3 w-full h-full bg-pop-yellow border-[3px] border-charcoal pointer-events-none" />

            <div className="relative w-full aspect-video border-[3px] border-charcoal bg-charcoal overflow-hidden cursor-pointer shadow-pop-sm group-hover:shadow-pop-md transition-all duration-300">
                {!isPlaying ? (
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center"
                        onClick={() => setIsPlaying(true)}
                    >
                        {/* 封面图 */}
                        <img
                            src="/videos/bilibili-cover-BV1LzPjzvE73.jpg"
                            alt="Video Cover"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* 遮罩层 */}
                        <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/10 transition-colors duration-300" />

                        {/* 筹备中提示 */}
                        <div className="relative z-30 flex flex-col items-center gap-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-pop-gradient border-[4px] border-charcoal flex items-center justify-center shadow-pop-sm group-active:translate-y-1 group-active:translate-x-1 group-active:shadow-none transition-all">
                                <Play className="w-10 h-10 md:w-12 md:h-12 text-charcoal fill-current ml-1" />
                            </div>
                            <div className="bg-white border-[3px] border-charcoal px-4 py-2 shadow-pop-xs">
                                <span className="text-sm font-black text-charcoal tracking-wider">宣传片筹备中 · 先看一期代表作</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <iframe
                        src={videoUrl}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        className="absolute inset-0 w-full h-full z-10"
                    />
                )}
            </div>
        </div>
    );
}

export default function FilmPage() {
    return (
        <div className="min-h-screen bg-warm-white">
            {/* ── 标题区 ── */}
            <section className="py-16 border-b-[3px] border-charcoal relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-halftone opacity-10 pointer-events-none" />
                <div className="container max-w-5xl mx-auto px-6 relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 mb-4 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase -rotate-2">个人宣传片</span>
                        <h1 className="section-title text-4xl md:text-5xl mb-4">
                            我能帮你做什么？
                        </h1>
                        <p className="section-subtitle">
                            几分钟了解我的能力和服务。<br />
                            无论你是家长、职场人还是教育机构——这里都有你需要的答案。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 视频区 ── */}
            <section className="py-12">
                <div className="container max-w-5xl mx-auto px-6">
                    <VideoPlayer />

                    {/* 视频描述 */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 三个方向速览 */}
                        <div className="border-[3px] border-charcoal shadow-pop-sm bg-white p-6 md:p-8 relative">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-halftone opacity-10 pointer-events-none" />
                            <h2 className="font-['Caveat'] text-2xl font-bold text-charcoal mb-5">这部片子讲什么</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: <BookOpen className="w-4 h-4" />,
                                        color: "bg-pop-orange",
                                        title: "教育与升学",
                                        desc: "从小升初到高升大，怎么帮家长理清规划思路"
                                    },
                                    {
                                        icon: <Brain className="w-4 h-4" />,
                                        color: "bg-pop-cyan",
                                        title: "AI 赋能",
                                        desc: "用AI工具提升效率，让每个人都能做超级个体"
                                    },
                                    {
                                        icon: <Film className="w-4 h-4" />,
                                        color: "bg-pop-blue",
                                        title: "视频服务",
                                        desc: "为学校和机构提供专业的视频内容制作"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`flex-shrink-0 w-8 h-8 ${item.color} border-[2px] border-charcoal flex items-center justify-center`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm text-charcoal">{item.title}</h4>
                                            <p className="text-xs text-charcoal-muted font-medium mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 章节索引 */}
                        <div className="border-[3px] border-charcoal shadow-pop-sm bg-white p-6 md:p-8">
                            <h2 className="font-['Caveat'] text-2xl font-bold text-charcoal mb-4">章节预览</h2>
                            <div className="space-y-1">
                                {chapters.map((ch, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 p-3 border-b-[2px] border-charcoal/10 last:border-b-0 hover:bg-pop-cyan/10 transition-colors duration-200 group cursor-pointer"
                                    >
                                        <span className="text-xs font-mono text-charcoal bg-pop-yellow px-2 py-1 border-[2px] border-charcoal font-bold flex-shrink-0">
                                            {ch.time}
                                        </span>
                                        <span className="text-sm font-medium text-charcoal-light group-hover:text-charcoal transition-colors duration-200">
                                            {ch.icon} {ch.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 border-t-[3px] border-charcoal bg-pop-gradient relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-halftone opacity-15 pointer-events-none -translate-x-1/2 translate-y-1/2" />
                <div className="container max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-4 relative z-10">
                    <span className="inline-block px-3 py-1 mb-2 border-[3px] border-charcoal shadow-pop-sm bg-white text-charcoal text-xs font-bold tracking-widest uppercase rotate-2">下一步</span>
                    <h2 className="section-title">找到你需要的，马上行动</h2>
                    <p className="section-subtitle">看完了？选一个最适合你的方向，深入了解。</p>
                    <div className="flex gap-3 mt-2">
                        <Link href="/works" className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-charcoal bg-charcoal text-white font-bold shadow-pop-sm hover:shadow-pop-md hover:-translate-y-0.5 transition-all group">
                            看看我的内容
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                        <Link href="/connect" className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-charcoal bg-white text-charcoal font-bold shadow-pop-sm hover:shadow-pop-md hover:-translate-y-0.5 transition-all">
                            直接联系我
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
