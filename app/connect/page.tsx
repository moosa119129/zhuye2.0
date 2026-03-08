"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Github,
    Twitter,
    Send,
    Mail,
    ArrowRight,
    QrCode,
    Smartphone,
    Globe
} from "lucide-react";

// 平台 SVG 图标
function BilibiliIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L8.653 4.44c.071.071.134.142.187.213h6.907c.053-.071.116-.142.187-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.427.267.267.391.569.382.906a1.234 1.234 0 0 1-.382.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
        </svg>
    );
}

const platforms = [
    {
        name: "B站",
        handle: "@面面的爸爸",
        desc: "中视频主阵地，深度教育解析和AI工具评测",
        href: "https://space.bilibili.com/284427802?spm_id_from=333.337.search-card.all.click",
        color: "hover:border-[#FB7299] hover:bg-pink-50/50",
        iconColor: "text-[#FB7299]",
        icon: BilibiliIcon,
        active: true
    },
    {
        name: "抖音",
        handle: "@面面的爸爸",
        desc: "短视频，教育干货和快速知识点",
        href: "https://www.douyin.com/user/self?from_tab_name=main",
        color: "hover:border-[#1A1A1A] hover:bg-charcoal/5",
        iconColor: "text-charcoal",
        icon: ({ className }: { className?: string }) => (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-8.6a8.18 8.18 0 0 0 4.78 1.52V5.01a4.85 4.85 0 0 1-1.97.68" />
            </svg>
        ),
        active: true
    },
    {
        name: "小红书",
        handle: "@面面的爸爸",
        desc: "生活化内容，亲子教育日常分享",
        href: "https://www.xiaohongshu.com/user/profile/60101ee700000000010003fc",
        color: "hover:border-[#FF2442] hover:bg-red-50/50",
        iconColor: "text-[#FF2442]",
        icon: ({ className }: { className?: string }) => (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.54 5.4h1.08v1.8h2.52v1.08H12.6v.9h2.34v5.04H12.6v.9h2.88v1.08H12.6v1.8h-1.08v-1.8H8.64v-1.08h2.88v-.9H9.12v-5.04h2.34v-.9H9v-1.08h2.46V5.4zm-1.26 4.86v.9h1.26v-.9h-1.26zm0 1.8v.9h1.26v-.9h-1.26zm2.34-1.8v.9h1.26v-.9H12.6zm0 1.8v.9h1.26v-.9H12.6z" />
            </svg>
        ),
        active: true
    },
    {
        name: "公众号",
        handle: "面面的爸爸",
        desc: "深度长文，完整逻辑线，适合沉浸阅读",
        href: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg2OTgzMDY5Ng==#wechat_redirect",
        color: "hover:border-[#07C160] hover:bg-green-50/50",
        iconColor: "text-[#07C160]",
        icon: ({ className }: { className?: string }) => (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c-.072-.411-.108-.83-.108-1.257 0-3.746 3.508-6.787 7.855-6.787.12 0 .238.003.356.01C15.917 4.705 12.674 2.188 8.69 2.188zm-2.314 3.621a.982.982 0 1 1 0 1.965.982.982 0 0 1 0-1.965zm4.63 0a.982.982 0 1 1 0 1.965.982.982 0 0 1 0-1.965z M24 14.807c0-3.373-3.281-6.12-7.326-6.12-4.045 0-7.327 2.747-7.327 6.12 0 3.372 3.282 6.12 7.327 6.12.83 0 1.62-.12 2.36-.333a.704.704 0 0 1 .59.08l1.573.921a.27.27 0 0 0 .138.045.244.244 0 0 0 .244-.244c0-.06-.024-.117-.04-.176l-.322-1.224a.488.488 0 0 1 .176-.549C23.013 18.536 24 16.768 24 14.807zm-9.797-.737a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626zm4.93 0a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626z" />
            </svg>
        ),
        active: true
    },
];

export default function ConnectPage() {
    return (
        <div className="min-h-screen">
            {/* ── 标题区 ── */}
            <section className="py-20 border-b border-warm-gray">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="max-w-2xl">
                        <div className="mb-6">
                            <span className="bg-pop-orange text-white font-bold px-4 py-1.5 border-[3px] border-charcoal shadow-pop-sm inline-block uppercase tracking-widest text-sm translate-x-[-2px] translate-y-[-2px]">
                                找到我
                            </span>
                        </div>
                        <h1 className="section-title text-4xl md:text-5xl mb-4 text-charcoal">来，连接一下</h1>
                        <p className="section-subtitle">
                            我在好几个平台都有内容，选你最顺手的就行。<br />
                            或者留下你的邮箱，我定期发有价值的东西给你。
                        </p>
                        {/* Added V1 link */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <button className="bg-pop-orange text-white px-8 py-3 font-bold border-[3px] border-charcoal shadow-pop-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:bg-orange-600">
                                立即订阅
                            </button>
                            <Link
                                href="https://v1.mmdbb.org"
                                target="_blank"
                                className="text-sm font-bold text-charcoal-muted hover:text-charcoal border-b border-charcoal-muted/30 hover:border-charcoal transition-all py-1"
                            >
                                想看旧版内容？回到 1.0
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 平台卡片 ── */}
            <section className="py-16">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {platforms.map((p) => (
                            p.active ? (
                                <a
                                    key={p.name}
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`card p-6 flex items-center gap-5 cursor-pointer border-2 border-transparent transition-all duration-300 ${p.color}`}
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0`}>
                                        <p.icon className={`w-7 h-7 ${p.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-charcoal text-lg">{p.name}</p>
                                        <p className="text-sm text-charcoal-muted mb-1">{p.handle}</p>
                                        <p className="text-xs text-charcoal-muted/80 leading-relaxed">{p.desc}</p>
                                    </div>
                                </a>
                            ) : (
                                <div
                                    key={p.name}
                                    className="card p-6 flex items-center gap-5 border-2 border-transparent bg-muted/30 grayscale opacity-60"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0`}>
                                        <p.icon className={`w-7 h-7 text-charcoal-muted`} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-charcoal-muted text-lg">{p.name}</p>
                                            <span className="text-[10px] bg-charcoal/10 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">筹备中</span>
                                        </div>
                                        <p className="text-sm text-charcoal-muted mb-1">{p.handle}</p>
                                        <p className="text-xs text-charcoal-muted/60 leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 二维码矩阵 ── */}
            <section className="py-16 bg-muted/30 border-y border-warm-gray">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <span className="section-label mb-2 block">扫码关注</span>
                        <h2 className="section-title mb-4">快速订阅，深度触达</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {platforms.map((p) => (
                            <div key={`qr-${p.name}`} className="card p-6 flex flex-col items-center text-center gap-4 bg-white">
                                <div className="w-full aspect-square bg-muted/20 border-2 border-dashed border-charcoal/20 flex flex-col items-center justify-center gap-2 rounded-lg relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-halftone-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <p.icon className={`w-10 h-10 ${p.iconColor} opacity-40`} />
                                    <span className="text-[10px] font-bold text-charcoal-muted uppercase tracking-tighter bg-charcoal/5 px-2 py-0.5 rounded">二维码即将更新</span>
                                </div>
                                <div>
                                    <p className="font-bold text-charcoal mb-1">{p.name}</p>
                                    <p className="text-[10px] text-charcoal-muted leading-tight">{p.desc.slice(0, 15)}...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 邮件订阅 ── */}
            <section className="py-20">
                <div className="container max-w-3xl mx-auto px-6">
                    <div className="flex flex-col items-center text-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-pop-orange/10 flex items-center justify-center border-[3px] border-charcoal shadow-pop-sm">
                            <Mail className="w-8 h-8 text-pop-orange" />
                        </div>
                        <div>
                            <span className="section-label mb-2 block">邮件订阅</span>
                            <h2 className="section-title mb-4">不想错过，留个邮箱</h2>
                            <p className="section-subtitle max-w-md">
                                有新课程、新内容、新工具，我会第一时间通知你。<br />
                                不发广告，只发我认为有价值的东西。
                            </p>
                        </div>
                        <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="你的邮箱地址"
                                    className="flex-1 px-4 py-4 border-[3px] border-charcoal bg-white text-charcoal placeholder:text-charcoal-muted/60 focus:outline-none focus:ring-4 focus:ring-pop-orange/10 transition-all duration-200 text-base"
                                />
                                <button type="submit" className="btn-primary whitespace-nowrap cursor-pointer py-4 px-8 bg-pop-orange border-charcoal shadow-pop-sm">
                                    立即订阅
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
