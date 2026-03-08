import type { Metadata } from "next";
import { Play, BookOpen, Lock, Download, ExternalLink, FileText, Mic } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "作品集",
    description: "面面的爸爸的视频、文章和配套资料，涵盖教育规划与AI工具两大方向。",
};

import { pinnedWorks, regularWorks } from "@/lib/works";
import { WorkItem } from "@/lib/data-mapper";

export const fileTypeIcon = (type: string) => {
    if (type === "pdf") return <FileText className="w-3 h-3" />;
    if (type === "excel") return <FileText className="w-3 h-3" />;
    if (type === "link") return <ExternalLink className="w-3 h-3" />;
    return <Download className="w-3 h-3" />;
};

export default function WorksPage() {
    const pinned = pinnedWorks;
    const rest = regularWorks;

    const videos = rest.filter((w: WorkItem) => w.type === "video").slice(0, 6);
    const articles = rest.filter((w: WorkItem) => w.type === "article").slice(0, 3);
    const podcasts = rest.filter((w: WorkItem) => w.type === "podcast").slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* ── 标题区 ── */}
            <section className="py-20 border-b border-warm-gray">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="max-w-2xl">
                        <span className="section-label mb-3 block">作品集</span>
                        <h1 className="section-title text-4xl md:text-5xl mb-4">我做的东西</h1>
                        <p className="section-subtitle">
                            视频、文章，以及每期内容附带的配套物料。<br />
                            公开的直接下载，非公开的需要解锁。
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 代表作置顶 ── */}
            {pinned.length > 0 && (
                <section className="py-16 bg-orange-50/40">
                    <div className="container max-w-5xl mx-auto px-6">
                        <div className="mb-8">
                            <span className="section-label mb-1 block">置顶精选</span>
                            <h2 className="text-xl font-semibold text-charcoal">代表作</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pinned.map((work: WorkItem) => (
                                <VideoCard key={work.id} work={work} featured />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 视频板块 ── */}
            {videos.length > 0 && (
                <section className="py-16">
                    <div className="container max-w-5xl mx-auto px-6">
                        <div className="mb-8 flex items-center gap-2">
                            <Play className="w-6 h-6 text-warm-orange" />
                            <h2 className="text-xl font-semibold text-charcoal">中视频</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((work: WorkItem) => (
                                <VideoCard key={work.id} work={work} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 文章板块 ── */}
            {articles.length > 0 && (
                <section className="py-16 bg-warm-white">
                    <div className="container max-w-5xl mx-auto px-6">
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-warm-orange" />
                                <h2 className="text-xl font-semibold text-charcoal">公众号文章</h2>
                            </div>
                            <Link href="/works/articles" className="text-sm text-warm-orange hover:text-warm-orange-dark transition-colors font-medium">
                                查看全部 →
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            {articles.map((work: WorkItem) => (
                                <ArticleCard key={work.id} work={work} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 播客板块 ── */}
            {podcasts.length > 0 && (
                <section className="py-16">
                    <div className="container max-w-5xl mx-auto px-6">
                        <div className="mb-8 flex items-center gap-2">
                            <Mic className="w-6 h-6 text-warm-orange" />
                            <h2 className="text-xl font-semibold text-charcoal">播客</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {podcasts.map((work: WorkItem) => (
                                <PodcastCard key={work.id} work={work} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 更多提示 */}
            <section className="py-12 border-t border-warm-gray">
                <div className="container max-w-5xl mx-auto px-6 text-center">
                    <p className="text-charcoal-muted text-sm mb-4">内容持续更新中</p>
                    <div className="flex justify-center gap-3">
                        <a href="https://space.bilibili.com/" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm cursor-pointer">
                            B站看视频
                        </a>
                        <Link href="/works/articles" className="btn-outline text-sm cursor-pointer">
                            公众号看文章
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ── 视频卡片：16:9 横版封面 ── */
function VideoCard({ work, featured = false }: { work: WorkItem; featured?: boolean }) {
    return (
        <a href={work.link} target="_blank" rel="noopener noreferrer" className="card block p-0 overflow-hidden flex flex-col h-full group cursor-pointer">
            <div className={`w-full ${featured ? "aspect-video" : "aspect-[16/9]"} bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden flex-shrink-0`}>
                {work.cover && (
                    <img src={work.cover} alt={work.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className={`absolute inset-0 flex items-center justify-center z-10`}>
                    <div className={`rounded-full bg-white/80 shadow-sm flex items-center justify-center backdrop-blur-sm ${featured ? "w-14 h-14" : "w-11 h-11"}`}>
                        <Play className={`${featured ? "w-7 h-7" : "w-5 h-5"} text-warm-orange ml-0.5`} />
                    </div>
                </div>
                <div className="absolute top-3 left-3 z-10">
                    <span className="badge-orange bg-white/95 backdrop-blur-sm shadow-sm">{work.category}</span>
                </div>
            </div>
            <div className={`p-5 flex-1 flex flex-col ${featured ? "md:p-6" : ""}`}>
                <span className="text-xs text-charcoal-muted font-medium mb-2">{work.date}</span>
                <h3 className={`font-semibold text-charcoal leading-snug mb-2 line-clamp-2 ${featured ? "text-lg md:text-xl" : "text-base"}`}>{work.title}</h3>
                {work.excerpt && <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2 flex-1">{work.excerpt}</p>}
            </div>
        </a>
    );
}

/* ── 文章卡片：横向排列，左图右文，很适合宽扁封面 ── */
function ArticleCard({ work }: { work: WorkItem }) {
    const isExternal = work.link.startsWith("http");
    const Tag = isExternal ? "a" : Link;
    const linkProps = isExternal ? { href: work.link, target: "_blank", rel: "noopener noreferrer" } : { href: work.link };

    return (
        <Tag {...linkProps} className="card block p-0 overflow-hidden group cursor-pointer">
            <div className="flex flex-col md:flex-row">
                {/* 左侧封面 - 保持公众号原始宽扁比例，不裁切 */}
                <div className="md:w-80 lg:w-96 flex-shrink-0 overflow-hidden">
                    <div className="aspect-[2.35/1] bg-gradient-to-br from-orange-50 to-amber-50 relative">
                        {work.cover && (
                            <img src={work.cover} alt={work.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        )}
                    </div>
                </div>
                {/* 右侧信息 */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="badge-orange text-[11px]">{work.category}</span>
                        <span className="text-xs text-charcoal-muted">{work.date}</span>
                    </div>
                    <h3 className="font-semibold text-charcoal text-base md:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-warm-orange transition-colors">{work.title}</h3>
                    <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">{work.excerpt}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-warm-orange font-medium">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>阅读全文</span>
                    </div>
                </div>
            </div>
        </Tag>
    );
}

/* ── 播客卡片：正方形封面（唱片样式） ── */
function PodcastCard({ work }: { work: WorkItem }) {
    return (
        <a href={work.link} target="_blank" rel="noopener noreferrer" className="card block p-0 overflow-hidden group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
                {work.cover && (
                    <img src={work.cover} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                            <Mic className="w-4 h-4 text-warm-orange" />
                        </div>
                        <span className="text-white/80 text-xs font-medium">{work.date}</span>
                    </div>
                    <h3 className="text-white font-semibold text-base leading-snug line-clamp-2">{work.title}</h3>
                </div>
            </div>
            <div className="p-4">
                <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">{work.excerpt}</p>
            </div>
        </a>
    );
}

/* ── 通用 WorkCard（保留导出供其他页面用） ── */
export function WorkCard({ work, featured = false }: { work: WorkItem; featured?: boolean }) {
    if (work.type === "video") return <VideoCard work={work} featured={featured} />;
    if (work.type === "article") return <ArticleCard work={work} />;
    if (work.type === "podcast") return <PodcastCard work={work} />;

    // fallback
    return (
        <a href={work.link} target="_blank" rel="noopener noreferrer" className="card block p-0 overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
                {work.cover && <img src={work.cover} alt={work.title} className="w-full h-full object-cover" />}
            </div>
            <div className="p-5">
                <h3 className="font-semibold text-charcoal text-base">{work.title}</h3>
            </div>
        </a>
    );
}
