import type { Metadata } from "next";
import { BookOpen, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { regularWorks, pinnedWorks } from "@/lib/works";
import { WorkItem } from "@/lib/data-mapper";

export const metadata: Metadata = {
    title: "全部公众号文章 - 作品集",
    description: "面面的爸爸的公众号文章合集",
};

export default function ArticlesPage() {
    const regularArticles = regularWorks.filter((w: WorkItem) => w.type === "article");
    const pinnedArticles = pinnedWorks.filter((w: WorkItem) => w.type === "article");
    const articles = [...pinnedArticles, ...regularArticles];

    return (
        <div className="min-h-screen">
            <section className="py-20 border-b border-warm-gray">
                <div className="container max-w-5xl mx-auto px-6">
                    <Link href="/works" className="inline-flex items-center gap-2 text-warm-orange hover:text-warm-orange-dark mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        返回作品集
                    </Link>
                    <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-warm-orange" />
                            <span className="section-label block">全部文章</span>
                        </div>
                        <h1 className="section-title text-4xl md:text-5xl mb-4">公众号文章合集</h1>
                        <p className="section-subtitle">
                            这里收录了过去的干货文章，涵盖升学规划、亲子教育等内容。共 {articles.length} 篇。
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-warm-white">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="flex flex-col gap-4">
                        {articles.map((work: WorkItem) => (
                            <Link
                                key={work.id}
                                href={work.link}
                                className="card block p-0 overflow-hidden group cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* 左侧封面 */}
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
                                            <span className="inline-flex items-center gap-1 text-xs text-charcoal-muted">
                                                <Calendar className="w-3 h-3" />
                                                {work.date}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-charcoal text-base md:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-warm-orange transition-colors">{work.title}</h3>
                                        <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">{work.excerpt}</p>
                                        <div className="mt-3 flex items-center gap-1 text-xs text-warm-orange font-medium">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span>阅读全文</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
