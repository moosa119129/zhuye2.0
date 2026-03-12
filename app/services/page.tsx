"use client";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, QrCode, ArrowRight, Play, MessageSquare, Rocket, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { COURSES } from "@/lib/old-data";

// --- 动画变体 ---
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
    })
};

// --- 1. 咨询数据 ---
const consultations = [
    {
        id: "c1",
        title: "单次深度咨询",
        tagline: "精准答疑 · 破除信息差",
        desc: "针对具体的升学困境、择校纠结或单一政策拆解。60分钟1对1对话，直接给出可执行的建议方案。",
        features: ["孩子情况基础诊断", "单一升学路径梳理", "关键决策点风险规避", "咨询后配套文档"],
        price: "微信预约",
        icon: <MessageSquare className="w-6 h-6" />,
        color: "bg-pop-yellow"
    },
    {
        id: "c2",
        title: "专项升学咨询",
        tagline: "板块突破 · 路径定制",
        desc: "针对具体的择校目标（如：指标到校专项、民办摇号策略、特长生路径）。多维度分析数据，锁定最优解。",
        features: ["往年录取数据比对", "多校区平行方案分析", "个性化简历指导", "目标校进校路径规划"],
        price: "微信预约",
        icon: <Star className="w-6 h-6" />,
        color: "bg-pop-blue"
    },
    {
        id: "c3",
        title: "深度陪伴咨询",
        tagline: "全程护航 · 动态调优",
        desc: "跨季度或跨年度的深度咨询。根据孩子的学习动态、考试成绩波动，实时调整升学策略，解决家长焦虑。",
        features: ["分阶段复盘会议", "心理辅导与压力缓解", "重大政策变化即时解读", "全天候微信交流渠道"],
        price: "微信预约",
        icon: <Rocket className="w-6 h-6" />,
        color: "bg-pop-orange"
    }
];

// --- 2. 课程数据 (2个正式 + 2个占位) ---
const courseWorks = [
    // 两个真实的 B站课程
    {
        id: COURSES[0].id,
        title: COURSES[0].title,
        desc: COURSES[0].description.slice(0, 45) + "...",
        price: COURSES[0].price,
        cover: "/covers/videos/BV1GZQwYYEnX.jpg",
        link: COURSES[0].linkUrl,
        type: "cheese"
    },
    {
        id: COURSES[1].id,
        title: COURSES[1].title,
        desc: COURSES[1].description.slice(0, 45) + "...",
        price: COURSES[1].price,
        cover: "/covers/videos/BV1kN41167mT.jpg",
        link: COURSES[1].linkUrl,
        type: "cheese"
    },
    // 两个高考占位符
    {
        id: "gt1",
        title: "2025高考志愿填报：投档原理与避坑指南",
        desc: "基于最新的新高考政策，详细拆解志愿组投档机制，帮助高三家长从容应对志愿填报。",
        price: "即将上线",
        cover: "/covers/videos/BV14V4y1b7cM.jpg", // 使用现有的高考相关封面作为占位
        link: "#",
        type: "placeholder"
    },
    {
        id: "gt2",
        title: "新高考选科深度解析：高一就要开始的战争",
        desc: "根据大学专业限选目录，反向推导最适合孩子的选科组合。赢在分流之前。",
        price: "敬请期待",
        cover: "/covers/videos/BV1At421b7K7.jpg", // 使用选科相关封面
        link: "#",
        type: "placeholder"
    }
];

// --- 3. 服务数据 ---
const professionalServices = [
    {
        title: "中考志愿服务 (成都专供)",
        tagline: "数据驱动 · 稳进不跌",
        desc: "成都中考专属服务：包含指标到校估分、项目班面试辅导、正式志愿填报的一站式托管。IT大厂算法背景数据支撑。",
        features: ["全区位次深度分析", "分批次志愿梯度设计", "进校优惠政策对接", "考后滑档紧急响应"],
        color: "bg-pop-cyan"
    },
    {
        title: "高考志愿服务 (全国范围)",
        tagline: "科学选拔 · 锁死名校",
        desc: "全方位高考志愿管家。基于千万级数据模型，不仅看位次，更看就业趋势和专业天花板。让每一分都发挥最大价值。",
        features: ["位次法/线差法双重校验", "城市/大学/专业三维权衡", "人工智能专业适配测试", "终稿人工交叉审核"],
        color: "bg-pop-orange"
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-warm-white">
            {/* ── Header Section ── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-halftone-light opacity-10 pointer-events-none"></div>
                <div className="container max-w-5xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <span className="inline-block px-4 py-1 mb-4 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-1">
                            好服务
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-charcoal mb-6 tracking-tight">
                            找到那条<span className="text-white bg-charcoal px-4 py-2 rotate-[-2deg] inline-block mt-2">更短的路</span>
                        </h1>
                        <p className="text-xl text-charcoal-light font-bold leading-relaxed max-w-xl">
                            从内容直播到深度服务，我们提供涵盖课程、咨询、全案服务的升学与 AI 赋能陪伴体系。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── 1. 课程板块 (Course) ── */}
            <section className="py-20 bg-warm-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-md">
                            <span className="text-pop-orange font-black uppercase tracking-widest text-xs">01 • Section</span>
                            <h2 className="text-4xl font-black text-charcoal mt-1">系统课程</h2>
                            <p className="text-charcoal-muted mt-2 font-medium">把核心升学逻辑沉淀为可反复学习的内容，助你成为专业家长。</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courseWorks.map((course, idx) => (
                            <motion.div
                                key={course.id}
                                custom={idx}
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeUp}
                                viewport={{ once: true }}
                                className={`border-[3px] border-charcoal shadow-pop-sm flex flex-col bg-white overflow-hidden group ${course.type === 'placeholder' ? 'opacity-80' : 'hover:-translate-y-2 hover:translate-x-1 transition-all'}`}
                            >
                                <div className={`aspect-video border-b-[3px] border-charcoal relative overflow-hidden bg-pop-blue ${course.type === 'placeholder' ? 'grayscale-[0.5]' : ''}`}>
                                    <Image
                                        src={course.cover || "/placeholder-course.jpg"}
                                        alt={course.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-12 h-12 text-white fill-current" />
                                    </div>
                                    {course.type === 'placeholder' && (
                                        <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                                            <span className="text-[10px] font-black bg-charcoal text-white px-2 py-1 uppercase tracking-widest">Coming Soon</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-black text-sm leading-tight line-clamp-2">{course.title}</h3>
                                    </div>
                                    <p className="text-xs text-charcoal-light font-medium line-clamp-3 mb-4 leading-relaxed mt-auto">
                                        {course.desc}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t-2 border-charcoal/5">
                                        <span className="text-pop-orange font-black">{course.price}</span>
                                        {course.type === 'cheese' ? (
                                            <Link href={course.link} target="_blank" className="font-black text-[10px] uppercase underline hover:text-pop-blue">立即前往 B站学习</Link>
                                        ) : (
                                            <span className="text-[10px] font-black text-charcoal/30 uppercase cursor-not-allowed italic">正在录制中</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 2. 咨询板块 (Consultation) ── */}
            <section className="py-24 bg-white border-y-[3px] border-charcoal relative">
                <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-pop-blue font-black uppercase tracking-widest text-xs">02 • Section</span>
                        <h2 className="text-4xl font-black text-charcoal mt-1">定制咨询</h2>
                        <div className="h-1.5 w-24 bg-pop-blue mx-auto mt-4 border border-charcoal"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {consultations.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                custom={idx}
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeUp}
                                viewport={{ once: true }}
                                className="bg-white border-[3px] border-charcoal p-8 shadow-pop-md flex flex-col group relative"
                            >
                                <div className={`absolute -top-6 -right-6 w-14 h-14 ${item.color} border-[3px] border-charcoal shadow-pop-xs flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform`}>
                                    {item.icon}
                                </div>
                                <div className="mb-6">
                                    <span className="text-[10px] font-black bg-charcoal text-white px-2 py-0.5 uppercase tracking-tighter">{item.tagline}</span>
                                    <h3 className="text-2xl font-black text-charcoal mt-3">{item.title}</h3>
                                </div>
                                <p className="text-sm text-charcoal-muted font-bold leading-relaxed mb-8">
                                    {item.desc}
                                </p>
                                <ul className="space-y-3 mb-10">
                                    {item.features.map(f => (
                                        <li key={f} className="flex items-center gap-3 text-xs font-black text-charcoal-light">
                                            <CheckCircle className="w-4 h-4 text-charcoal flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-charcoal text-white font-black text-sm border-[3px] border-charcoal hover:bg-white hover:text-charcoal transition-all shadow-pop-xs hover:shadow-none">
                                    扫码预约
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. 服务板块 (Service) ── */}
            <section className="py-24 bg-warm-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-pop-cyan font-black uppercase tracking-widest text-xs">03 • Section</span>
                        <h2 className="text-4xl font-black text-charcoal mt-1">全案服务</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {professionalServices.map((service, idx) => (
                            <motion.div
                                key={service.title}
                                custom={idx}
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeUp}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row bg-white border-[3px] border-charcoal shadow-pop-md overflow-hidden"
                            >
                                <div className={`md:w-20 w-full ${service.color} border-b-[3px] md:border-b-0 md:border-r-[3px] border-charcoal flex items-center justify-center p-4`}>
                                    <h3 className="font-black text-charcoal text-2xl tracking-tighter md:[writing-mode:vertical-rl] leading-none py-4">
                                        {service.title.split(' (')[0]}
                                    </h3>
                                </div>
                                <div className="p-10 flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-black text-charcoal/50 uppercase">{service.tagline}</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(s => <Star key={s} className="w-3 h-3 fill-pop-yellow text-charcoal" />)}
                                        </div>
                                    </div>
                                    <p className="font-bold text-charcoal leading-relaxed mb-8">
                                        {service.desc}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {service.features.map(f => (
                                            <div key={f} className="flex items-center gap-2 text-xs font-bold text-charcoal-muted">
                                                <ShieldCheck className="w-4 h-4 text-pop-orange" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 p-4 border-[3px] border-dashed border-charcoal/20 flex items-center justify-center bg-neutral-50">
                                        <span className="font-black text-charcoal/40 text-[10px] uppercase">需要 1v1 资格审核 · 限定名额</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QR Connect ── */}
            <section className="py-24 border-t-[3px] border-charcoal bg-white relative overflow-hidden">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
                        <div className="text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pop-orange">Connect</span>
                            <h2 className="text-4xl font-black text-charcoal mt-2 mb-6 tracking-tight">聊聊你的成长与升学路径</h2>
                            <p className="text-lg text-charcoal-muted font-bold max-w-md leading-relaxed">
                                每一个孩子和企业都是独特的个体。在不确定的时代里，我们结合人工智能与升学逻辑，为您找到确定性的出口。
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative flex items-center gap-6">
                                <motion.div
                                    className="flex flex-col items-center gap-2 rotate-[-5deg]"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <span className="font-black text-pop-orange text-sm italic">与我链接</span>
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <ArrowRight className="w-6 h-6 text-pop-orange" />
                                    </motion.div>
                                </motion.div>

                                <div className="w-56 h-56 bg-white border-[3px] border-charcoal shadow-pop-lg p-2 flex items-center justify-center relative rotate-2 hover:rotate-0 transition-transform cursor-crosshair">
                                    <div className="absolute -top-4 -left-4 bg-pop-orange text-white text-[9px] font-black px-2 py-1 border-[2px] border-charcoal">WeChat</div>
                                    <Image 
                                        src="/wechat-qr.jpg" 
                                        alt="微信二维码" 
                                        width={200} 
                                        height={200}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
