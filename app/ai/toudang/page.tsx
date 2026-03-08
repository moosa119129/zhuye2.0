"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Layout, Info, Maximize2, Minimize2 } from "lucide-react";

export default function EnrollmentDemoPage() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Listen for fullscreen change events (e.g. Esc key)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <main className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Top Banner / Breadcrumb */}
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/ai" className="text-charcoal-light hover:text-charcoal font-bold flex items-center gap-1 transition-colors underline decoration-2 decoration-pop-pink/30 underline-offset-4">
                        实验室
                    </Link>
                    <ChevronRight size={16} className="text-charcoal-light" />
                    <span className="text-charcoal font-black">投档演示系统</span>
                </div>

                {/* Header Section */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 bg-pop-pink text-white px-3 py-1 border-[3px] border-charcoal shadow-pop-sm mb-4"
                    >
                        <Layout size={16} />
                        <span className="font-bold text-xs uppercase tracking-wider text-charcoal">Simulation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-charcoal tracking-tighter mb-4"
                    >
                        中考投档演示<span className="text-pop-pink">.</span>
                    </motion.h1>

                    <p className="text-xl text-charcoal-light max-w-2xl font-medium leading-relaxed">
                        直观展示“位次优先、遵循志愿”的平行志愿录取逻辑。
                        通过动态模拟，帮助家长和考生快速理解投档全过程。
                    </p>
                </div>

                {/* Simulation Container */}
                <div
                    ref={containerRef}
                    className={`relative border-[4px] border-charcoal shadow-pop-lg bg-white overflow-hidden rounded-sm transition-all duration-500 ease-in-out ${isFullscreen ? 'fixed inset-0 z-50 !h-full !max-w-none shadow-none border-0' : ''}`}
                    style={isFullscreen ? {} : { height: 'calc(100vh - 350px)', minHeight: '700px' }}
                >
                    <div className="absolute top-0 left-0 right-0 h-12 bg-charcoal flex items-center px-6 justify-between border-b-[3px] border-charcoal z-10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-pop-pink border-[1.5px] border-white/20"></div>
                            <div className="w-3 h-3 rounded-full bg-pop-yellow border-[1.5px] border-white/20"></div>
                            <div className="w-3 h-3 rounded-full bg-pop-cyan border-[1.5px] border-white/20"></div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="hidden md:block text-[10px] font-black text-white/40 tracking-[3px] uppercase">
                                SIMULATION_ENGINE_PRO
                            </div>
                            <button
                                onClick={toggleFullscreen}
                                className="flex items-center gap-2 text-white hover:text-pop-yellow transition-colors font-bold text-xs uppercase"
                            >
                                {isFullscreen ? (
                                    <>
                                        <Minimize2 size={16} />
                                        <span>退出全屏</span>
                                    </>
                                ) : (
                                    <>
                                        <Maximize2 size={16} />
                                        <span>全屏演示</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <iframe
                        src="/toudang.html"
                        className="w-full h-full pt-12 border-0"
                        title="中考投档模拟演练"
                    />
                </div>

                {/* Help Note */}
                {!isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex items-start gap-4 p-6 bg-pop-yellow/10 border-[3px] border-charcoal shadow-pop-sm"
                    >
                        <div className="p-2 bg-pop-yellow border-[2px] border-charcoal shadow-pop-xs">
                            <Info size={20} className="text-charcoal" />
                        </div>
                        <div>
                            <h4 className="font-black text-charcoal mb-1">使用说明</h4>
                            <p className="text-charcoal-light font-medium">
                                请使用按钮控制模拟进程。在“手动”阶段可以观察每一个考生的检索逻辑；通过“快速投档”可以一次性处理多个位次。
                                投档过程中，请注意观察学校计划数的变化以及分数线的形成过程。
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
