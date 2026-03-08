import { ARTICLES } from "@/lib/old-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Metadata } from "next";

export function generateStaticParams() {
    return ARTICLES.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) {
        return { title: "文章未找到" };
    }
    return {
        title: `${article.title} - 面面的爸爸`,
        description: article.excerpt || article.title,
    };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const article = ARTICLES.find((a) => a.slug === params.slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-warm-white">
            {/* 顶部导航 */}
            <div className="border-b border-warm-gray bg-white/60 backdrop-blur-md sticky top-0 z-30">
                <div className="container max-w-3xl mx-auto px-6 py-4">
                    <Link href="/works/articles" className="inline-flex items-center gap-2 text-warm-orange hover:text-warm-orange-dark transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        返回文章列表
                    </Link>
                </div>
            </div>

            {/* 文章头部 */}
            <header className="pt-12 pb-8">
                <div className="container max-w-3xl mx-auto px-6">
                    <div className="mb-4 flex items-center gap-3 flex-wrap">
                        <span className="badge-orange">{article.category}</span>
                        {article.publishedAt && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(article.publishedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal leading-tight" style={{ fontFamily: "'Noto Serif SC', 'Source Han Serif CN', Georgia, serif" }}>
                        {article.title}
                    </h1>
                </div>
            </header>

            {/* 文章正文 - 封面已经包含在content HTML中，不再单独显示 */}
            <div className="container max-w-3xl mx-auto px-6 pb-20">
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>

            {/* 底部 */}
            <div className="border-t border-warm-gray">
                <div className="container max-w-3xl mx-auto px-6 py-8 text-center">
                    <p className="text-sm text-charcoal-muted mb-3">— 全文完 —</p>
                    <Link href="/works/articles" className="btn-outline text-sm">
                        ← 返回文章列表
                    </Link>
                </div>
            </div>
        </article>
    );
}
