"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Brain, Users, ChevronRight, Play, Mic, Video, Film } from "lucide-react";
import { motion } from "framer-motion";

// ----- 动画变体 --------------------------------------------------
import { Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
    }),
};

// ── B站视频点击播放组件 ─────────────────────────────────
function BilibiliPlayer({ bvid, cover, alt, bgColor }: { bvid: string; cover: string; alt: string; bgColor: string }) {
    const [playing, setPlaying] = useState(false);
    return (
        <div className={`relative border-b-[3px] border-charcoal ${bgColor} overflow-hidden`}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {playing ? (
                    <iframe
                        src={`//player.bilibili.com/player.html?bvid=${bvid}&autoplay=1&high_quality=1`}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
                        frameBorder="0"
                    />
                ) : (
                    <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full cursor-pointer group/play bg-transparent border-none p-0">
                        <img src={cover} className="w-full h-full object-cover transition-transform duration-500 group-hover/play:scale-105" alt={alt} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/play:bg-black/30 transition-colors">
                            <div className="w-16 h-16 bg-white/90 border-[3px] border-charcoal flex items-center justify-center shadow-pop-sm group-hover/play:scale-110 transition-transform">
                                <Play className="w-7 h-7 text-charcoal fill-current ml-1" />
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}

// ── 精选代表作（占位数据）────────────────────────────────
const featuredWorks = [
    {
        id: 1,
        type: "video",
        category: "教育",
        title: "2025年成都升学全解析：这4条路，90%的家长不知道",
        excerpt: "政策拆解 × 择校策略 × 避坑指南，一期视频说清楚",
        cover: null,
        link: "/works/1",
    },
    {
        id: 2,
        type: "article",
        category: "AI工具",
        title: "用AI做了3个月学习记录，我发现了这件事",
        excerpt: "效率不是问题，习惯才是。这是我用AI辅助学习管理的真实复盘",
        cover: null,
        link: "/works/2",
    },
    {
        id: 3,
        type: "video",
        category: "教育",
        title: "中考后的暑假怎么过？给孩子的3条建议",
        excerpt: "不是鸡娃，是认知提升。这个暑假可以做三件很重要的事",
        cover: null,
        link: "/works/3",
    },
];

// ── 数据点 ────────────────────────────────────────────────
const stats = [
    { value: "10万+", label: "教育领域粉丝", icon: Users },
    { value: "教育 × AI", label: "双向深耕", icon: Brain },
    { value: "300+", label: "深度内容作品", icon: BookOpen },
];

export default function HomePage() {
    return (
        <div className="flex flex-col">

            {/* --------------------------------------------------
          Section 1: HERO — 波普碰撞 (Neo-Brutalism & Halftone)
      -------------------------------------------------- */}
            <section className="min-h-screen flex items-center bg-warm-white relative overflow-hidden text-charcoal">
                {/* 装饰性半调网点背景 - 仅限 Hero 区做大面积留底 */}
                <div className="absolute inset-0 bg-halftone-light opacity-50 pointer-events-none"></div>

                <div className="container max-w-6xl mx-auto px-6 z-10 mt-24 md:mt-0 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        {/* 文本内容区 - 左侧 */}
                        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                            <motion.div
                                custom={0.1}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="mb-10 -ml-4 md:-ml-12"
                            >
                                <span className="inline-block px-5 py-2 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-sm font-bold tracking-wide uppercase rotate-[-4deg]">
                                    教育 × AI × 自媒体
                                </span>
                            </motion.div>

                            <motion.h1
                                custom={0.2}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="font-['Caveat'] text-6xl md:text-8xl font-normal text-charcoal leading-tight mb-8 tracking-tight"
                                style={{ textShadow: "4px 4px 0px #FFD54F" }}
                            >
                                面面的爸爸
                            </motion.h1>

                            <motion.p
                                custom={0.3}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="text-xl md:text-2xl text-charcoal-light font-['Quicksand'] mb-4 leading-relaxed"
                            >
                                我在教育和AI之间，<br className="md:hidden" />
                                <span className="text-gradient-orange font-bold">找到了那条更短的路</span>
                            </motion.p>

                            <motion.div
                                custom={0.4}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="flex justify-center md:justify-start mt-8"
                            >
                                <Link
                                    href="/film"
                                    className="bg-pop-blue text-white font-bold text-lg px-8 py-3 rounded-full border-[3px] border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:translate-x-0.5 transition-all duration-200 inline-flex items-center group cursor-pointer"
                                >
                                    <Play className="w-5 h-5 mr-2 fill-white text-white group-hover:scale-110 transition-transform" />
                                    我的故事
                                </Link>
                            </motion.div>
                        </div>

                        {/* 头像展示区 - 右侧 */}
                        <motion.div
                            className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative group"
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                        >
                            <div className="relative w-72 h-72 md:w-96 md:h-96 max-w-full">
                                {/* 阴影层 1 - 亮黄 */}
                                <div className="absolute top-4 left-4 md:top-6 md:left-6 w-full h-full bg-pop-yellow border-[3px] border-charcoal rounded-none pointer-events-none"></div>
                                {/* 阴影层 2 - 半调网点 */}
                                <div className="absolute top-2 left-2 md:top-3 md:left-3 w-full h-full bg-halftone border-[3px] border-charcoal rounded-none pointer-events-none"></div>

                                {/* 实体头像层 */}
                                <div className="relative w-full h-full border-[3px] border-charcoal bg-white rounded-none p-2 shadow-pop-lg overflow-hidden group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300">
                                    <div className="relative w-full h-full border-[3px] border-charcoal rounded-none overflow-hidden bg-white">
                                        <Image
                                            src="/avatar-v2.png"
                                            alt="面面的爸爸 波普风头像"
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 768px) 300px, 400px"
                                        />
                                    </div>
                                </div>
                                {/* 浮点缀 */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -right-6 md:-bottom-2 md:-right-8 bg-pop-orange text-charcoal text-xl font-bold py-2 px-6 border-[3px] border-charcoal shadow-pop-sm rotate-[12deg]"
                                >
                                    Focus & Grow!
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------
          Section 2: STATS — 数据信任背书 (精致浅色对比)
      -------------------------------------------------- */}
            <section className="py-10 bg-warm-white border-y-[2px] border-charcoal/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>
                <div className="container max-w-4xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                custom={i * 0.1}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center p-5 bg-white border-[2px] border-charcoal shadow-pop-sm group hover:-translate-y-1 hover:translate-x-1 hover:shadow-pop-xs transition-all duration-200"
                            >
                                <stat.icon
                                    className="w-5 h-5 mb-3 group-hover:scale-110 transition-transform duration-300 text-pop-orange"
                                    strokeWidth={1.5}
                                />
                                <p className="text-xl md:text-2xl font-bold text-charcoal mb-2 tracking-tight">
                                    {stat.value}
                                </p>
                                <div className="h-0.5 w-8 bg-pop-orange mb-2 border border-charcoal/10"></div>
                                <p className="text-[9px] font-semibold text-charcoal-muted tracking-[0.2em] uppercase">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------
          Section 3: FEATURED WORKS — Pop Art Bento Grid (6 Items)
      -------------------------------------------------- */}
            <section id="content" className="py-24 bg-warm-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <span className="inline-block px-4 py-1 mb-4 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-2">精选内容</span>
                        <h2 className="section-title text-5xl md:text-6xl">看看我的内容吧</h2>
                    </motion.div>

                    {/* ===== Apple-style Interlocking Grid =====
                         Layout (12-col):
                         Row 1: [Article1  7cols] [Video1   5cols]
                         Row 2: [Podcast1 3cols] [Article2 4cols] [Video2 5cols]
                         Row 3: [Podcast1 cont.] [Podcast2 4cols] [Video2 text ]
                         外轮廓齐整，内部大小错落，封面完整显示不裁剪 */}
                    <div className="flex flex-col gap-6">

                        {/* === 上半区：大文章 + 视频1 === */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                            {/* 1. 大篇文章 — 左侧 7 列 */}
                            <motion.div custom={0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-7 group">
                                <Link href="/works/cheng-du-jiao-yu-bing-huo-liang-chong-tian-chu-sheng-l-die-po-6-yu-1-6-wan-zhong" className="block h-full">
                                    <div className="h-full bg-white border-[3px] border-charcoal shadow-pop-md hover:shadow-pop-lg transition-all flex flex-col group-hover:-translate-y-1 group-hover:translate-x-1">
                                        <div className="relative border-b-[3px] border-charcoal bg-pop-orange overflow-hidden">
                                            <div className="absolute inset-0 bg-halftone opacity-20 z-10 pointer-events-none"></div>
                                            <img
                                                src="/articles/images/cheng-du-jiao-yu-bing-huo-liang-chong-tian-chu-sheng-l-die-po-6-yu-1-6-wan-zhong-cover.jpg"
                                                className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                                                alt="成都教育文章封面"
                                            />
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-white border-[3px] border-charcoal font-black text-sm shadow-pop-xs z-20">
                                                核心深度
                                            </span>
                                        </div>
                                        <div className="p-6 md:p-8 bg-white flex flex-col justify-center">
                                            <h3 className="text-xl md:text-2xl font-black mb-3 leading-tight group-hover:text-pop-blue transition-colors tracking-tight">
                                                成都教育冰火两重天：出生率跌破6‰与16万中考大军
                                            </h3>
                                            <p className="text-charcoal font-bold text-base line-clamp-2 opacity-80">
                                                2025年全国出生人口数据刷新认知，成都中学段却迎来洪峰。择校逻辑需要彻底的"空杯心态"。
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* 2. 视频 1 — 右侧 5 列（封面+点击播放） */}
                            <motion.div custom={0.2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-5 group">
                                <div className="h-full bg-white border-[3px] border-charcoal shadow-pop-sm hover:shadow-pop-md transition-all flex flex-col overflow-hidden">
                                    <BilibiliPlayer bvid="BV1LzPjzvE73" cover="/covers/videos/BV1LzPjzvE73.jpg" alt="2026政策解读视频封面" bgColor="bg-pop-yellow" />
                                    <div className="p-5 flex flex-col justify-center bg-white flex-1">
                                        <span className="text-[9px] font-black uppercase mb-1.5 tracking-widest text-charcoal/60">Video • 政策解读</span>
                                        <h3 className="font-black text-[15px] leading-tight line-clamp-2">2026年成都中考政策解读：指标扩容与贯通培养</h3>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* === 下半区：视频2 + 播客2/文章2 + 播客1 === */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                            {/* 3. 视频 2 — 左侧 4 列（封面+点击播放） */}
                            <motion.div custom={0.3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-4 group">
                                <div className="h-full bg-white border-[3px] border-charcoal shadow-pop-sm hover:shadow-pop-md transition-all flex flex-col overflow-hidden">
                                    <BilibiliPlayer bvid="BV1kN41167mT" cover="/covers/videos/BV1kN41167mT.jpg" alt="中考家长会视频封面" bgColor="bg-pop-blue" />
                                    <div className="p-5 flex flex-col justify-center bg-white flex-1">
                                        <span className="text-[9px] font-black uppercase mb-1.5 tracking-widest text-charcoal/60">Video • 经验分享</span>
                                        <h3 className="font-black text-[14px] leading-tight line-clamp-2">中考必看：家长会读懂这4个细节才叫牛</h3>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 中间区域：播客2 + 文章2 上下叠放 */}
                            <div className="md:col-span-5 flex flex-col gap-6">

                                {/* 4. 播客 2 — 横向布局 */}
                                <motion.div custom={0.4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group">
                                    <Link href="https://www.xiaoyuzhoufm.com/episode/672c6d2182eb19451ddb0572" target="_blank" className="block">
                                        <div className="bg-white border-[3px] border-charcoal shadow-pop-sm hover:shadow-pop-md transition-all flex flex-row overflow-hidden group-hover:-translate-y-1 group-hover:translate-x-1">
                                            <div className="w-2/5 border-r-[3px] border-charcoal bg-pop-orange relative overflow-hidden flex-shrink-0">
                                                <img src="/podcast-cover.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="播客封面" />
                                                <Mic className="absolute bottom-2 right-2 w-4 h-4 text-white drop-shadow-md z-10" />
                                            </div>
                                            <div className="flex-1 p-4 flex flex-col justify-center bg-white group-hover:bg-pop-orange transition-colors">
                                                <span className="text-[9px] font-black uppercase mb-1.5 tracking-widest text-charcoal/60">Podcast • 成长真相</span>
                                                <h3 className="font-black text-[13px] leading-tight line-clamp-3 group-hover:text-white transition-colors">高质量陪伴，是给孩子成长过程中最坚实的基础</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>

                                {/* 5. 文章 2 — 宽封面 */}
                                <motion.div custom={0.5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group flex-1">
                                    <Link href="/works/ze-xiao-zhe-bi-zhang-hen-duo-jia-zhang-dou-suan-cuo-le-xiao-sheng-chu-he-chu-she" className="block h-full">
                                        <div className="h-full bg-white border-[3px] border-charcoal shadow-pop-sm hover:shadow-pop-md transition-all flex flex-col overflow-hidden group-hover:-translate-y-1 group-hover:translate-x-1">
                                            <div className="relative border-b-[3px] border-charcoal bg-pop-yellow overflow-hidden">
                                                <img src="/articles/images/ze-xiao-zhe-bi-zhang-hen-duo-jia-zhang-dou-suan-cuo-le-xiao-sheng-chu-he-chu-she-cover.jpg" className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" alt="择校文章封面" />
                                            </div>
                                            <div className="p-4 flex flex-col justify-center bg-white group-hover:bg-pop-yellow transition-colors flex-1">
                                                <span className="text-[9px] font-black uppercase mb-1.5 tracking-widest text-charcoal/60">Article • 择校决策</span>
                                                <h3 className="font-black text-[14px] leading-tight line-clamp-2">择校决策深度指南：教你如何算清升学这笔账</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* 6. 播客 1 — 右侧 3 列，正方形封面纵向排列 */}
                            <motion.div custom={0.6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-3 group">
                                <Link href="https://www.xiaoyuzhoufm.com/episode/67416b058d1233fb0d5dd71b" target="_blank" className="block h-full">
                                    <div className="h-full bg-white border-[3px] border-charcoal shadow-pop-sm hover:shadow-pop-md transition-all flex flex-col overflow-hidden group-hover:-translate-y-1 group-hover:translate-x-1">
                                        <div className="relative border-b-[3px] border-charcoal bg-pop-cyan overflow-hidden">
                                            <img src="/podcast-cover.png" className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" alt="播客封面" />
                                            <Mic className="absolute bottom-3 right-3 w-5 h-5 text-white drop-shadow-md z-10" />
                                        </div>
                                        <div className="p-4 flex flex-col justify-center bg-white group-hover:bg-pop-cyan transition-colors flex-1">
                                            <span className="text-[9px] font-black uppercase mb-1.5 tracking-widest text-charcoal/60">Podcast • 亲子教育</span>
                                            <h3 className="font-black text-[13px] leading-tight line-clamp-3">谁在数字时代受伤害？手机与亲子关系新解</h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>


                    <div className="mt-20 text-center">
                        <Link href="/works" className="btn-primary inline-flex text-xl px-12 py-5 border-[4px]">
                            我的内容
                            <ArrowRight className="w-6 h-6 ml-3" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------
          Section 3.5: 专业视频服务 — 快闪宣传片展示
      -------------------------------------------------- */}
            <section className="py-24 bg-charcoal relative overflow-hidden">
                {/* 半调纹理背景 */}
                <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>
                <div className="container max-w-6xl mx-auto px-6 relative z-10">

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-1 mb-6 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-1">
                            专业服务
                        </span>
                        <h2 className="section-title text-5xl md:text-6xl text-white">我还能帮你拍片子</h2>
                        <p className="mt-4 text-white/60 text-lg font-bold max-w-2xl mx-auto">
                            课件制作 · 口播拍摄 · 人物访谈 · 活动跟拍 · 宣传短片
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                        {/* 左侧：视频播放器占位 */}
                        <motion.div custom={0.2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-7">
                            <div className="relative border-[3px] border-white/20 shadow-pop-lg bg-charcoal overflow-hidden">
                                {/* 16:9 占位区域 — 后续替换为快闪视频 */}
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pop-blue/20 via-charcoal to-pop-orange/20">
                                        <Film className="w-16 h-16 text-white/30 mb-4" />
                                        <span className="text-white/40 font-black text-lg tracking-wide">快闪宣传片 · 即将上线</span>
                                        <span className="mt-2 text-white/20 text-sm font-bold">SHOWREEL COMING SOON</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 右侧：服务过的客户/项目列表 */}
                        <motion.div custom={0.4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-5">
                            <div className="space-y-6">
                                {[
                                    { client: '成都市某重点中学', project: '校园宣传片', type: '活动跟拍 + 后期制作' },
                                    { client: '区教科院', project: '教研活动纪录', type: '多机位拍摄 + 访谈剪辑' },
                                    { client: '教育培训机构', project: '系列课件录制', type: '口播拍摄 + 课件包装' },
                                    { client: '学校德育部门', project: '师生访谈系列', type: '人物访谈 + 纪实拍摄' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-10 h-10 border-[3px] border-white/20 bg-pop-blue/20 flex items-center justify-center">
                                            <Video className="w-5 h-5 text-white/60" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black text-base leading-tight">{item.client}</h4>
                                            <p className="text-white/50 text-sm font-bold mt-0.5">{item.project} — {item.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t-[2px] border-white/10">
                                <p className="text-white/30 text-xs font-bold">
                                    * 以上项目内容版权归委托方所有，仅展示服务能力
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------
          Section 4: ABOUT & FILM — 终于看到真人（带有拍立得风格）
      -------------------------------------------------- */}
            <section id="about" className="py-24 bg-white relative overflow-hidden">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                        {/* 左侧文案：为什么出发 */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="md:w-1/2 flex flex-col justify-center order-2 md:order-1"
                        >
                            <div>
                                <span className="inline-block px-3 py-1 mb-4 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase -rotate-2">关于我</span>
                            </div>
                            <h2 className="section-title mb-6">做正确的事，<br />哪怕是一条“慢路”</h2>
                            <div className="space-y-4 text-charcoal-muted leading-relaxed text-lg mb-8">
                                <p>
                                    我曾在这个行业里看到太多焦虑的父母和被压得喘不过气的孩子。教育本该是点燃火焰，而不是填满罐子。
                                </p>
                                <p>
                                    我想做的，不仅是帮你了解升学政策，更是结合AI技术，用更科学、更轻松的方式，帮家庭找到最适合孩子的那条路。
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-6 bg-white border-[3px] border-charcoal shadow-pop-sm relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-halftone opacity-10 pointer-events-none"></div>
                                <div className="w-12 h-12 rounded-full border-[3px] border-charcoal bg-pop-yellow flex flex-shrink-0 items-center justify-center relative z-10 transition-transform hover:scale-110">
                                    <Play className="w-5 h-5 text-charcoal ml-1" />
                                </div>
                                <div className="relative z-10">
                                    <p className="font-bold text-charcoal mb-1">认识一个真实的我</p>
                                    <p className="text-sm font-medium text-charcoal-muted mb-3">10分钟的个人微纪录片，现正筹备中</p>
                                    <Link href="/film" className="text-base font-bold bg-pop-cyan/20 px-4 py-2 border border-charcoal hover:bg-pop-cyan transition-colors inline-flex items-center">
                                        提前预约观看 <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* 右侧照片：拍立得/杂志画框感 */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="md:w-1/2 order-1 md:order-2"
                        >
                            <div className="relative max-w-sm mx-auto">
                                {/* 底层装饰框：高饱和品红色错位 */}
                                <div className="absolute inset-0 bg-pop-orange border-[3px] border-charcoal transform rotate-6 translate-x-4 translate-y-4 pointer-events-none"></div>
                                {/* 中层装饰框：半调网点 */}
                                <div className="absolute inset-0 bg-halftone border-[3px] border-charcoal transform -rotate-3 -translate-x-2 -translate-y-2 pointer-events-none bg-pop-cyan"></div>
                                {/* 实体相框（白边） */}
                                <div className="relative bg-white p-4 pb-16 border-[3px] border-charcoal shadow-pop-md transform transition-transform duration-500 hover:rotate-2">
                                    <div className="aspect-[3/4] overflow-hidden bg-orange-50 relative border-[3px] border-charcoal">
                                        {/* 过滤掉温和光线，保持本色 */}
                                        <img
                                            src="/profile-main.png"
                                            alt="在现场分享的面面的爸爸"
                                            className="w-full h-full object-cover object-top grayscale-[20%] contrast-125"
                                        />
                                    </div>
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center">
                                        <p className="font-['Caveat'] text-2xl text-charcoal font-medium opacity-80">在教育现场</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------
          Section 5: CONNECT — 连接区
      -------------------------------------------------- */}
            <section className="py-24 border-t-[3px] border-charcoal bg-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-halftone opacity-20 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
                <div className="container max-w-3xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-6"
                    >
                        <span className="inline-block px-3 py-1 border-[3px] border-charcoal shadow-pop-sm bg-pop-gradient text-charcoal text-xs font-bold tracking-widest uppercase rotate-3">链接</span>
                        <h2 className="section-title">怎么找到我？</h2>
                        {/* 邮件订阅 */}
                        <div className="w-full max-w-md mt-4">
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="你的邮箱地址"
                                    className="flex-1 px-5 py-3 border-[3px] border-charcoal bg-white text-charcoal placeholder:text-charcoal focus:outline-none focus:ring-0 focus:shadow-pop-sm transition-all duration-300 text-sm"
                                />
                                <button type="submit" className="btn-primary whitespace-nowrap px-8 border-l-0">
                                    订阅更新
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
