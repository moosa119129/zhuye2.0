import Link from "next/link";
import { Tv, Youtube, BookOpen } from "lucide-react";

// 平台 SVG 图标（Simple Icons 风格）
function BilibiliIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L8.653 4.44c.071.071.134.142.187.213h6.907c.053-.071.116-.142.187-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.427.267.267.391.569.382.906a1.234 1.234 0 0 1-.382.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
        </svg>
    );
}

function WechatOfficialIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c-.072-.411-.108-.83-.108-1.257 0-3.746 3.508-6.787 7.855-6.787.12 0 .238.003.356.01C15.917 4.705 12.674 2.188 8.69 2.188zm-2.314 3.621a.982.982 0 1 1 0 1.965.982.982 0 0 1 0-1.965zm4.63 0a.982.982 0 1 1 0 1.965.982.982 0 0 1 0-1.965z M24 14.807c0-3.373-3.281-6.12-7.326-6.12-4.045 0-7.327 2.747-7.327 6.12 0 3.372 3.282 6.12 7.327 6.12.83 0 1.62-.12 2.36-.333a.704.704 0 0 1 .59.08l1.573.921a.27.27 0 0 0 .138.045.244.244 0 0 0 .244-.244c0-.06-.024-.117-.04-.176l-.322-1.224a.488.488 0 0 1 .176-.549C23.013 18.536 24 16.768 24 14.807zm-9.797-.737a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626zm4.93 0a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626z" />
        </svg>
    );
}

function XiaohongshuIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.54 5.4h1.08v1.8h2.52v1.08H12.6v.9h2.34v5.04H12.6v.9h2.88v1.08H12.6v1.8h-1.08v-1.8H8.64v-1.08h2.88v-.9H9.12v-5.04h2.34v-.9H9v-1.08h2.46V5.4zm-1.26 4.86v.9h1.26v-.9h-1.26zm0 1.8v.9h1.26v-.9h-1.26zm2.34-1.8v.9h1.26v-.9H12.6zm0 1.8v.9h1.26v-.9H12.6z" />
        </svg>
    );
}

function DouyinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-8.6a8.18 8.18 0 0 0 4.78 1.52V5.01a4.85 4.85 0 0 1-1.97.68" />
        </svg>
    );
}

const platforms = [
    { name: "B站", href: "https://space.bilibili.com/284427802?spm_id_from=333.337.search-card.all.click", icon: BilibiliIcon, color: "hover:text-[#FB7299]", active: true },
    { name: "抖音", href: "#", icon: DouyinIcon, color: "hover:text-[#1A1A1A]", active: false },
    { name: "小红书", href: "#", icon: XiaohongshuIcon, color: "hover:text-[#FF2442]", active: false },
    { name: "公众号", href: "#", icon: WechatOfficialIcon, color: "hover:text-[#07C160]", active: false },
];

export default function Footer() {
    return (
        <footer className="border-t border-warm-gray bg-white mt-24">
            <div className="container max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* 品牌 */}
                    <div>
                        <p className="font-['Caveat'] text-2xl font-bold text-charcoal mb-2">面面的爸爸</p>
                        <p className="text-charcoal-muted text-sm max-w-xs leading-relaxed">
                            我在教育和AI之间，找到了那条更短的路
                        </p>
                    </div>

                    {/* 链接 */}
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-1 md:text-left text-center">导航</p>
                        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                            {[
                                { label: "关于我", href: "/about" },
                                { label: "宣传片", href: "/film" },
                                { label: "作品集", href: "/works" },
                                { label: "课程服务", href: "/services" },
                                { label: "AI频道", href: "/ai" },
                                { label: "连接我", href: "/connect" }
                            ].map((item) => (
                                <Link key={item.label} href={item.href} className="text-sm font-bold text-charcoal hover:text-pop-orange transition-colors duration-200 cursor-pointer">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 社交平台 */}
                    <div>
                        <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-widest mb-3">关注我</p>
                        <div className="flex gap-3">
                            {platforms.map((p) => (
                                p.active ? (
                                    <a
                                        key={p.name}
                                        href={p.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={p.name}
                                        className={`p-2 rounded-lg bg-muted text-charcoal-light ${p.color} transition-all duration-200 cursor-pointer hover:bg-warm-gray`}
                                    >
                                        <p.icon className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <div
                                        key={p.name}
                                        title={`${p.name} (筹备中)`}
                                        className="p-2 rounded-lg bg-muted/50 text-charcoal-muted opacity-40 cursor-not-allowed grayscale"
                                    >
                                        <p.icon className="w-5 h-5" />
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t-[3px] border-charcoal flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold text-charcoal-muted tracking-widest uppercase">
                        © {new Date().getFullYear()} 面面的爸爸 · 保留所有权利
                    </p>
                    <Link
                        href="https://v1.mmdbb.org"
                        target="_blank"
                        className="text-[10px] font-bold text-charcoal-muted hover:text-charcoal border border-charcoal-muted px-2 py-1 transition-all hover:bg-warm-gray"
                    >
                        回到 1.0 老版
                    </Link>
                </div>
            </div>
        </footer>
    );
}
