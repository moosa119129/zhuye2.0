import type { Metadata } from "next";
import { ArrowRight, BookOpen, Brain, Film, Lightbulb, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "关于我",
    description: "面面的爸爸：教育升学规划、AI效率工具、专业视频服务——三个方向，一个目标：帮你找到那条更短的路。",
};

const directions = [
    {
        icon: BookOpen,
        color: "bg-pop-orange",
        title: "教育与升学",
        desc: "从小升初到高升大，深度解读政策变化，帮家长理清每一步的选择逻辑。10万+家长关注的教育博主，全网输出升学规划内容。",
    },
    {
        icon: Brain,
        color: "bg-pop-cyan",
        title: "AI 赋能",
        desc: "不止于教育场景。AI正在改变每个人的工作方式，我把自己摸索出来的效率工具和方法论，分享给职场人、创业者和终身学习者。",
    },
    {
        icon: Film,
        color: "bg-pop-blue",
        title: "专业视频服务",
        desc: "课件录制、口播拍摄、人物访谈、活动跟拍——为学校、教科院和教育机构提供从策划到成片的一站式视频服务。",
    },
];

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
            <section className="py-24 border-b-[3px] border-charcoal">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* 照片 */}
                        <div className="relative w-full max-w-sm mx-auto group">
                            <div className="absolute top-4 left-4 w-full h-full bg-halftone border-[3px] border-charcoal" />
                            <div className="absolute top-2 left-2 w-full h-full bg-pop-cyan border-[3px] border-charcoal" />
                            <div className="relative aspect-[4/5] border-[3px] border-charcoal bg-white p-2 shadow-pop-md group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-300">
                                <div className="relative w-full h-full border-[3px] border-charcoal overflow-hidden">
                                    <Image
                                        src="/images/avatar-cartoon.png"
                                        alt="面面的爸爸 - 波普风格头像"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 文案 */}
                        <div className="flex flex-col gap-5">
                            <span className="inline-block px-3 py-1 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase -rotate-2 self-start">面面的爸爸</span>
                            <h1 className="section-title text-4xl md:text-5xl">我是谁</h1>
                            <div className="space-y-4 text-charcoal-light leading-relaxed">
                                <p>
                                    大家叫我"面面的爸爸"。做了父亲之后，我开始认真研究教育这件事——从升学政策到学习方法，一路摸索出了自己的一套体系。
                                </p>
                                <p>
                                    后来我发现，<strong className="text-charcoal">好的工具能让复杂的事情变简单</strong>。于是从教育延伸到AI，从个人创作延伸到帮机构做视频——三条看似不同的路，底层逻辑其实都是同一件事：<strong className="text-charcoal">找到更聪明的方法，把事情做好</strong>。
                                </p>
                                <p>
                                    现在，我是一个 10 万+ 粉丝的教育博主，也是 AI 效率工具的深度用户和分享者，同时为学校和教育机构提供专业视频服务。
                                </p>
                            </div>
                            <Link href="/film" className="btn-primary self-start mt-2 group">
                                看看我能帮你做什么
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 使命宣言 ── */}
            <section className="py-24 bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>
                <div className="container max-w-3xl mx-auto px-6 text-center relative z-10">
                    <div className="flex flex-col items-center gap-6">
                        <span className="inline-block px-4 py-1 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-2">为什么做这件事</span>
                        <blockquote className="font-['Caveat'] text-3xl md:text-4xl text-white leading-relaxed">
                            &quot;教育的方向可以更清晰，<br />
                            工作的效率可以更高，<br />
                            内容的表达可以更专业。&quot;
                        </blockquote>
                        <div className="w-12 h-[3px] bg-pop-orange" />
                        <p className="text-white/70 leading-relaxed text-lg">
                            很多时候不是不够努力，而是没找到更好的方法。<br />
                            <strong className="text-white">我想做的，就是把我找到的那条更短的路，分享给你。</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 三个方向 ── */}
            <section className="py-24">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 mb-4 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase -rotate-1">我在做什么</span>
                        <h2 className="section-title">三个方向，一个目标</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {directions.map((d) => (
                            <div key={d.title} className="border-[3px] border-charcoal shadow-pop-sm hover:shadow-pop-md transition-all hover:-translate-y-1 hover:translate-x-1 bg-white p-8 flex flex-col gap-4">
                                <div className={`w-12 h-12 ${d.color} border-[3px] border-charcoal flex items-center justify-center`}>
                                    <d.icon className="w-6 h-6 text-charcoal" />
                                </div>
                                <h3 className="font-black text-charcoal text-lg">{d.title}</h3>
                                <p className="text-charcoal-muted leading-relaxed text-sm">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 价值观 ── */}
            <section className="py-24 border-t-[3px] border-charcoal">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 mb-4 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-2">我的价值观</span>
                        <h2 className="section-title">我相信的事</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="border-[3px] border-charcoal shadow-pop-sm bg-white p-8 flex flex-col gap-4">
                                <div className="w-12 h-12 bg-pop-yellow border-[3px] border-charcoal flex items-center justify-center">
                                    <v.icon className="w-6 h-6 text-charcoal" />
                                </div>
                                <h3 className="font-black text-charcoal text-lg">{v.title}</h3>
                                <p className="text-charcoal-muted leading-relaxed text-sm">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 border-t-[3px] border-charcoal bg-pop-gradient">
                <div className="container max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                    <h2 className="section-title text-3xl">想知道我还能帮你做些什么？</h2>
                    <p className="text-charcoal-muted text-lg font-bold">看看我的作品，或者直接来聊聊你的需求。</p>
                    <div className="flex gap-4 mt-2">
                        <Link href="/works" className="btn-primary group border-[3px]">
                            我的作品集
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                        <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-charcoal bg-white font-bold text-charcoal shadow-pop-sm hover:shadow-pop-md hover:-translate-y-0.5 transition-all">
                            了解课程服务
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
