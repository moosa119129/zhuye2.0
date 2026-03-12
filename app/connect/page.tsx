"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Mail,
    Smartphone,
    MessageSquare,
    Sparkles,
    Zap
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
        qrImage: "/B站.jpg",
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
        qrImage: "/抖音.jpg",
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
        qrImage: "/小红书.jpg",
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
        desc: "深度长文，完整逻辑线，扫码沉浸阅读",
        href: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg2OTgzMDY5Ng==#wechat_redirect",
        color: "hover:border-[#07C160] hover:bg-green-50/50",
        iconColor: "text-[#07C160]",
        qrImage: "/公众号.jpg",
        icon: ({ className }: { className?: string }) => (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c-.072-.411-.108-.83-.108-1.257 0-3.746 3.508-6.787 7.855-6.787.12 0 .238.003.356.01C15.917 4.705 12.674 2.188 8.69 2.188zm-2.314 3.621a.982.982 0 1 1 0 1.965.982.982 0 0 1 0-1.965zm4.63 0a.982.982 0 1 1 0 1.965.982.982 0 0 1 0-1.965z M24 14.807c0-3.373-3.281-6.12-7.326-6.12-4.045 0-7.327 2.747-7.327 6.12 0 3.372 3.282 6.12 7.327 6.12.83 0 1.62-.12 2.36-.333a.704.704 0 0 1 .59.08l1.573.921a.27.27 0 0 0 .138.045.244.244 0 0 0 .244-.244c0-.06-.024-.117-.04-.176l-.322-1.224a.488.488 0 0 1 .176-.549C23.013 18.536 24 16.768 24 14.807zm-9.797-.737a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626zm4.93 0a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626z" />
            </svg>
        ),
        active: true
    },
    {
        name: "个人微信",
        handle: "wanlly",
        desc: "直接交流，探讨教育、AI与内容创作",
        href: "#",
        color: "hover:border-[#07C160] hover:bg-green-50/50",
        iconColor: "text-[#07C160]",
        qrImage: "/微信二维码.jpg",
        icon: Smartphone,
        active: true
    },
];

export default function ConnectPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* ── 标题区 ── */}
            <section className="py-24 border-b border-charcoal/10">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="max-w-2xl">
                        <div className="mb-6">
                            <span className="bg-pop-orange text-white font-black px-4 py-1.5 border-[3px] border-charcoal shadow-pop-sm inline-block uppercase tracking-widest text-sm">
                                社交矩阵
                            </span>
                        </div>
                        <h1 className="section-title text-5xl md:text-6xl mb-6 text-charcoal font-black tracking-tighter">来，连接一下</h1>
                        <p className="text-xl text-charcoal-muted leading-relaxed font-medium">
                            我在不同平台分享不同维度的内容，选你最顺手的就行。<br />
                            或者留下你的邮箱，我定期发有价值的东西给你。
                        </p>
                        <div className="mt-10">
                            <button className="bg-pop-orange text-white px-10 py-4 text-lg font-black border-[3px] border-charcoal shadow-pop-sm hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all active:scale-95">
                                立即订阅
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 平台链接卡片 (主流内容平台) ── */}
            <section className="py-20">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Sparkles className="text-pop-yellow w-6 h-6" />
                        <h3 className="text-2xl font-black text-charcoal italic">主流内容平台</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {platforms
                            .filter(p => !["公众号", "个人微信"].includes(p.name))
                            .map((p) => (
                                <a
                                    key={p.name}
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`card p-8 flex flex-col gap-6 cursor-pointer border-[3px] border-charcoal shadow-pop-md transition-all duration-300 bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-pop-lg ${p.color}`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-charcoal/5 flex items-center justify-center border-2 border-charcoal`}>
                                        <p.icon className={`w-8 h-8 ${p.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="font-black text-charcoal text-2xl mb-1">{p.name}</p>
                                        <p className="text-sm text-charcoal-muted font-bold mb-3">{p.handle}</p>
                                        <p className="text-sm text-charcoal-muted/80 leading-relaxed">{p.desc}</p>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </section>

            {/* ── 扫码极速订阅 (二维码矩阵) ── */}
            <section className="py-24 bg-charcoal text-white">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <Zap className="text-pop-cyan w-10 h-10 mb-4 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">扫码极速订阅</h2>
                        <p className="text-white/60 max-w-md font-medium">适合手机端快速关注，不错过任何动态。</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {platforms
                            .filter(p => p.name !== "个人微信")
                            .map((p) => (
                                <div key={`qr-${p.name}`} className="flex flex-col items-center text-center gap-6 group">
                                    <div className="w-full aspect-square bg-white p-4 border-[4px] border-pop-cyan shadow-pop-sm group-hover:rotate-2 transition-transform duration-300 overflow-hidden">
                                        <img
                                            src={p.qrImage}
                                            alt={`${p.name} 二维码`}
                                            className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-black text-xl mb-1">{p.name}</p>
                                        <p className="text-xs text-white/40 font-bold tracking-wider">{p.handle}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* ── 深度私域连接 (个人微信专属板块) ── */}
            <section className="py-24 border-y-[3px] border-charcoal bg-pop-yellow/10 overflow-hidden">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16 relative">
                        {/* 背景装饰 */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-pop-pink/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex-1 space-y-8 relative z-10">
                            <div className="inline-block bg-charcoal text-pop-yellow font-black px-6 py-2 skew-x-[-12deg] text-lg">
                                <span className="inline-block skew-x-[12deg]">深度私域连接</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-charcoal leading-tight tracking-tighter">
                                觉得内容有启发？<br />
                                加我微信，直接聊。
                            </h2>
                            <ul className="space-y-6 font-black text-charcoal/80 text-lg">
                                <li className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-pop-pink border border-charcoal rotate-45" />
                                    探讨 AI 时代的家庭教育策略
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-pop-cyan border border-charcoal rotate-45" />
                                    交流内容创作与数字游民心得
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-pop-yellow border border-charcoal rotate-45" />
                                    或者只是打个招呼，交个朋友
                                </li>
                            </ul>
                        </div>
                        
                        <div className="w-full max-w-[340px] relative z-10">
                            <div className="bg-white border-[3px] border-charcoal p-8 shadow-pop-lg rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-8 border-b-2 border-charcoal/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-pop-green rounded-2xl border-2 border-charcoal flex items-center justify-center shadow-pop-sm">
                                            <MessageSquare size={24} className="text-charcoal" />
                                        </div>
                                        <div>
                                            <p className="font-black text-charcoal text-xl leading-none">面面的爸爸</p>
                                            <p className="text-[10px] font-bold text-charcoal/40 mt-1 uppercase">Personal Account</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black bg-pop-green px-3 py-1 border-2 border-charcoal shadow-pop-sm">实名微信</span>
                                </div>
                                <div className="w-full aspect-square border-[3px] border-charcoal p-3 mb-8 bg-neutral-50 shadow-inner">
                                    <img
                                        src="/微信二维码.jpg"
                                        alt="个人微信二维码"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-charcoal mb-1 underline decoration-pop-pink decoration-2 underline-offset-4">
                                        备注“来自网站”
                                    </p>
                                    <p className="text-[10px] font-bold text-charcoal-muted opacity-60">
                                        我会亲自通过每一条申请
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 邮件订阅 ── */}
            <section className="py-24">
                <div className="container max-w-3xl mx-auto px-6">
                    <div className="flex flex-col items-center text-center gap-12">
                        <div className="w-24 h-24 rounded-[2rem] bg-pop-orange/10 flex items-center justify-center border-[4px] border-charcoal shadow-pop-md rotate-3">
                            <Mail className="w-12 h-12 text-pop-orange -rotate-3" />
                        </div>
                        <div>
                            <span className="text-pop-orange font-black uppercase tracking-[0.3em] mb-4 block text-sm">不定期邮件周刊</span>
                            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-8 tracking-tight">不想错过，留个邮箱</h2>
                            <p className="text-xl text-charcoal-muted max-w-md font-medium leading-relaxed">
                                有新课程、新工具或深度思考，我会第一时间发给你。<br />
                                不发垃圾邮件，只发硬核干货。
                            </p>
                        </div>
                        <form className="w-full max-w-xl" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col sm:flex-row gap-4 p-2 border-[3px] border-charcoal bg-white shadow-pop-sm">
                                <input
                                    type="email"
                                    placeholder="输入你的邮箱地址..."
                                    className="flex-1 px-6 py-4 bg-transparent text-charcoal font-black placeholder:text-charcoal-muted/40 focus:outline-none text-xl"
                                />
                                <button type="submit" className="px-12 py-4 bg-pop-orange text-white font-black border-[3px] border-charcoal shadow-pop-sm hover:bg-orange-600 transition-colors active:scale-95 text-xl">
                                    立即订阅
                                </button>
                            </div>
                            <p className="mt-6 text-xs font-bold text-charcoal/30">
                                随时可以退订 · 保护你的隐私
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
