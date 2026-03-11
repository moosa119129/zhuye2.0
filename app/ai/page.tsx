"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Beaker, ArrowRight, Sparkles, Brain, Layout } from "lucide-react";

const apps = [
    {
        id: "wisefill",
        title: "WiseFill",
        subtitle: "中考志愿智能填报",
        description: "基于历年录取数据与 AI 逻辑，为家长提供科学的志愿填报建议。让每一个分数都发挥最大价值。",
        icon: <Sparkles className="w-8 h-8" />,
        color: "bg-pop-yellow",
        href: "/ai/wisefill",
        status: "Live"
    },
    {
        id: "roi-focus",
        title: "ROI Focus",
        subtitle: "灵感与投资组合管理",
        description: "基于 ROI 思维的时间管理工具。像经营公司一样经营你的时间与灵感，内置 AI 投资顾问分析。",
        icon: <Brain className="w-8 h-8" />,
        color: "bg-pop-cyan",
        href: "/ai/roi-focus",
        status: "Beta"
    },
    {
        id: "toudang",
        title: "Enrollment Demo",
        subtitle: "中考投档模拟演示",
        description: "直观展示平行志愿录取逻辑。通过动态模拟位次优先、遵循志愿的全过程，揭秘投档背后的算法真相。",
        icon: <Layout className="w-8 h-8" />,
        color: "bg-pop-pink",
        href: "/ai/toudang",
        status: "Classic"
    }
];

export default function LaboratoryPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1 mb-6 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase -rotate-2"
                    >
                        <span className="flex items-center gap-2">
                            <Beaker size={16} />
                            Laboratory
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-charcoal tracking-tighter mb-6"
                    >
                        实验室<span className="text-pop-pink">.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-charcoal-light max-w-2xl font-medium leading-relaxed"
                    >
                        探索人工智能在升学规划、个人成长与效率管理中的无限可能。
                        这里是我实验新点子、沉淀新能力的数字化练兵场。
                    </motion.p>
                </div>

                {/* Apps Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {apps.map((app, index) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={app.href} className="group block h-full">
                                <article className="relative h-full flex flex-col bg-white border-[3px] border-charcoal shadow-pop-md hover:shadow-pop-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                                    {/* Cover / Icon Area */}
                                    <div className={`${app.color} h-40 border-b-[3px] border-charcoal flex items-center justify-center relative overflow-hidden`}>
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                                            style={{ backgroundImage: `radial-gradient(circle, #000 2px, transparent 2px)`, backgroundSize: '20px 20px' }}>
                                        </div>
                                        <div className="relative z-10 p-6 bg-white border-[3px] border-charcoal shadow-pop-sm transform group-hover:scale-110 transition-transform duration-300">
                                            {app.icon}
                                        </div>

                                        <div className="absolute top-4 right-4 bg-white border-[2px] border-charcoal px-3 py-1 text-xs font-black shadow-pop-sm">
                                            {app.status}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="mb-4">
                                            <h2 className="text-4xl font-black text-charcoal tracking-tighter leading-none mb-2">
                                                {app.title}
                                            </h2>
                                            <p className="text-pop-pink font-bold text-lg">{app.subtitle}</p>
                                        </div>

                                        <p className="text-charcoal-light font-medium text-lg leading-relaxed mb-8 flex-grow">
                                            {app.description}
                                        </p>

                                        <div className="flex items-center gap-3 text-charcoal font-black text-xl group-hover:text-pop-pink transition-colors">
                                            <span>进入应用</span>
                                            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section (Laboratory Style) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 p-12 bg-neutral-100 border-[3px] border-charcoal shadow-pop-sm text-center"
                >
                    <h3 className="text-3xl font-black text-charcoal mb-4">更多灵感正在孵化中</h3>
                    <p className="text-charcoal-light font-medium text-lg mb-8 max-w-xl mx-auto">
                        每一个工具的诞生都源于一个真实的痛点。如果你有有趣的想法或合作意向，欢迎联系我协同共创。
                    </p>
                    <Link href="/connect" className="inline-block bg-charcoal text-white px-8 py-4 font-black text-xl hover:bg-pop-pink transition-colors shadow-pop-md active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                        联系实验室
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
