import type { Metadata } from "next";
import { ArrowRight, Lightbulb, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "关于我",
    description: "面面的爸爸：一个在教育和AI之间找到更短路的人。10万+粉丝教育博主，分享教育规划与AI效率工具。",
};

const values = [
    {
        icon: Lightbulb,
        title: "工具思维",
        desc: "无论教育还是效率，最好的方式是找到正确的工具。AI是目前最强大的工具。",
    },
    {
        icon: Heart,
        title: "长期主义",
        desc: "不追热点，只做对孩子和自己真正有价值的事。慢就是快。",
    },
    {
        icon: Zap,
        title: "知行合一",
        desc: "我分享的每一个方法，都是我自己验证过的。没有亲测，不做推荐。",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* ── Hero ── */}
            <section className="py-24 border-b border-warm-gray">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* 照片 */}
                        <div className="relative w-full max-w-sm mx-auto group">
                            <div className="absolute top-4 left-4 w-full h-full bg-halftone border-[3px] border-charcoal" />
                            <div className="absolute top-2 left-2 w-full h-full bg-pop-cyan border-[3px] border-charcoal" />
                            <div className="relative aspect-[4/5] border-[3px] border-charcoal bg-white p-2 shadow-pop-md group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-300">
                                <div className="relative w-full h-full border-[3px] border-charcoal">
                                    <Image
                                        src="/images/avatar.jpg"
                                        alt="面面的爸爸 - 专业形象"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 文案 */}
                        <div className="flex flex-col gap-5">
                            <span className="section-label">面面的爸爸</span>
                            <h1 className="section-title text-4xl md:text-5xl">我是谁</h1>
                            <div className="space-y-4 text-charcoal-light leading-relaxed">
                                <p>
                                    我是一个有10万+粉丝的教育博主，同时也在深度研究AI工具的实际应用。
                                </p>
                                <p>
                                    "面面"是我孩子的小名。因为做了爸爸，我开始认真思考教育这件事——不是焦虑，而是真的想弄清楚：<strong className="text-charcoal">什么样的成长路径，才能不走弯路？</strong>
                                </p>
                                <p>
                                    后来我发现，这个问题的答案和很多事情一样：需要的不是更努力，而是更好的工具和方法论。
                                </p>
                            </div>
                            <Link href="/film" className="btn-primary self-start mt-2 group">
                                看我的个人宣传片
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 使命宣言 ── */}
            <section className="py-24 bg-charcoal">
                <div className="container max-w-3xl mx-auto px-6 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <span className="section-label text-warm-orange">为什么做这件事</span>
                        <blockquote className="font-['Caveat'] text-3xl md:text-4xl text-white leading-relaxed">
                            "有个村子，从来没见过汽车。<br />
                            所有人都觉得自行车，<br />
                            是地球上最快的交通工具。"
                        </blockquote>
                        <div className="w-12 h-0.5 bg-warm-orange" />
                        <p className="text-white/70 leading-relaxed text-lg">
                            我的使命，就是让更多人知道：还有更好的路。<br />
                            <strong className="text-white">来，上车，我带你一程。</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 价值观 ── */}
            <section className="py-24">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="mb-12 text-center">
                        <span className="section-label mb-2 block">我的价值观</span>
                        <h2 className="section-title">我相信的事</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="card p-8 flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                    <v.icon className="w-6 h-6 text-warm-orange" />
                                </div>
                                <h3 className="font-semibold text-charcoal text-lg">{v.title}</h3>
                                <p className="text-charcoal-muted leading-relaxed text-sm">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 border-t border-warm-gray bg-orange-50/40">
                <div className="container max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-4">
                    <h2 className="section-title">想更深入地认识我？</h2>
                    <p className="section-subtitle">看看我的内容，或者直接来预约聊聊。</p>
                    <div className="flex gap-3 mt-2">
                        <Link href="/works" className="btn-primary group">
                            看我的作品集
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
