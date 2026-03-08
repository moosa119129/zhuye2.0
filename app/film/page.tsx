"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const chapters = [
    { time: "00:00", title: "我是谁？一个普通爸爸的非普通选择" },
    { time: "02:30", title: "教育这件事，我想了很多年" },
    { time: "05:00", title: "AI出现之后，我的世界变了" },
    { time: "07:30", title: "我想做一件什么样的事" },
    { time: "09:00", title: "来，上车" },
];

function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    // B站嵌入参数：autoplay=1, high_quality=1, danmaku=0
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

                        {/* 播放按钮 */}
                        <div className="relative z-30 w-20 h-20 md:w-24 md:h-24 bg-pop-gradient border-[4px] border-charcoal flex items-center justify-center shadow-pop-sm group-active:translate-y-1 group-active:translate-x-1 group-active:shadow-none transition-all">
                            <Play className="w-10 h-10 md:w-12 md:h-12 text-charcoal fill-current ml-1" />
                        </div>

                        {/* 提示文案 */}
                        <div className="absolute bottom-6 left-6 z-30 bg-white border-[2px] border-charcoal px-3 py-1 shadow-pop-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-1">
                            <span className="text-xs font-bold text-charcoal tracking-wider">点击开始播放</span>
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
                            认识我的最快方式
                        </h1>
                        <p className="section-subtitle">
                            有故事，有情怀，有干货。<br />
                            这是到目前为止，我最诚实的一次自我介绍。
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
                        {/* 写给你的话 */}
                        <div className="border-[3px] border-charcoal shadow-pop-sm bg-white p-6 md:p-8 relative">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-halftone opacity-10 pointer-events-none" />
                            <h2 className="font-['Caveat'] text-2xl font-bold text-charcoal mb-4">写给你的话</h2>
                            <div className="space-y-3 text-charcoal-light leading-relaxed">
                                <p>
                                    我做这期视频，不是为了&ldquo;涨粉&rdquo;。
                                </p>
                                <p>
                                    是因为我发现，很多关注我的人，其实不太清楚我是一个什么样的人，为什么做这件事。
                                </p>
                                <p>
                                    所以我想认真地、诚实地，跟你说清楚。
                                </p>
                                <p className="font-bold text-charcoal bg-pop-yellow/30 px-2 py-1 inline-block border border-charcoal">
                                    看完之后，你大概就会知道——你要不要上这辆车。
                                </p>
                            </div>
                        </div>

                        {/* 章节索引 */}
                        <div className="border-[3px] border-charcoal shadow-pop-sm bg-white p-6 md:p-8">
                            <h2 className="font-['Caveat'] text-2xl font-bold text-charcoal mb-4">这10分钟里</h2>
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
                                            {ch.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 border-t-[3px] border-charcoal bg-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-halftone opacity-15 pointer-events-none -translate-x-1/2 translate-y-1/2" />
                <div className="container max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-4 relative z-10">
                    <span className="inline-block px-3 py-1 mb-2 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-2">下一步</span>
                    <h2 className="section-title">看完了，然后呢？</h2>
                    <p className="section-subtitle">认识完了，来看看我能帮到你什么。</p>
                    <div className="flex gap-3 mt-2">
                        <Link href="/works" className="btn-primary group">
                            看看我的内容
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                        <Link href="/services" className="btn-outline">
                            了解课程服务
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
