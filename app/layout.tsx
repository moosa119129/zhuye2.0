import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: {
        default: "面面的爸爸 — 教育×AI，找到那条更短的路",
        template: "%s | 面面的爸爸",
    },
    description: "我在教育和AI之间，找到了那条更短的路。10万+粉丝教育博主，专注教育规划与AI效率工具分享。",
    keywords: ["教育", "AI", "升学规划", "面面的爸爸", "自媒体", "教育博主"],
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body
                className={cn(
                    "min-h-screen bg-warm-white text-charcoal antialiased flex flex-col"
                )}
            >
                <Navbar />
                <main className="flex-1 pt-20">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
