"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "主页" },
    { href: "/about", label: "关于我" },
    { href: "/film", label: "宣传片" },
    { href: "/works", label: "作品集" },
    { href: "/services", label: "好服务" },
    { href: "/ai", label: "实验室" },
    { href: "/connect", label: "连接我" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-4 left-4 right-4 z-50 transition-all duration-300 bg-white border-[3px] border-charcoal shadow-pop-sm",
                scrolled
                    ? "bg-white/95 backdrop-blur-md"
                    : "bg-white"
            )}
        >
            <nav className="flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer group relative"
                    title="回到主页"
                >
                    <img
                        src="/logo.png"
                        alt="面面的爸爸 Logo"
                        className="h-10 w-auto object-contain relative z-10"
                    />
                    <span className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal text-pop-yellow text-xs font-bold px-2 py-1 whitespace-nowrap pointer-events-none border-[2px] border-charcoal flex items-center shadow-pop-sm">
                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-charcoal rotate-45"></span>
                        回到主页
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-2">
                    {navLinks.slice(1).map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 text-base transition-all duration-200 cursor-pointer block",
                                    pathname === link.href
                                        ? "bg-pop-cyan text-charcoal font-bold border-[2px] border-charcoal shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px]"
                                        : "font-medium text-charcoal-light hover:text-charcoal border-[2px] border-transparent hover:border-charcoal hover:bg-neutral-100"
                                )}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 rounded-lg text-charcoal hover:bg-muted transition-colors duration-200 cursor-pointer"
                    aria-label="菜单"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 pt-1 border-t-[3px] border-charcoal mt-2">
                    <ul className="flex flex-col gap-2 mt-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={cn(
                                        "block px-4 py-2 text-base transition-all duration-200 cursor-pointer border-[2px]",
                                        pathname === link.href
                                            ? "bg-pop-cyan text-charcoal font-bold border-charcoal shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                            : "font-medium text-charcoal-light border-transparent hover:text-charcoal hover:bg-neutral-100 hover:border-charcoal"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
