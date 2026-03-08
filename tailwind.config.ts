import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1280px",
            },
        },
        extend: {
            colors: {
                // 品牌色系 (方案 B: 温和呼吸风)
                "warm-white": "#FFFBF4",
                "warm-orange": {
                    DEFAULT: "#E57550",
                    light: "#FFA07A",
                    dark: "#CC5B39",
                },
                "charcoal": {
                    DEFAULT: "#43382D",
                    light: "#5A4F44",
                    muted: "#8A7E73",
                },
                // 波普风/新粗野主义高饱和色彩 (Pop Art Palette - Mature Educator Tone)
                "pop": {
                    yellow: "#FFD54F", // 柔和一点的明黄
                    orange: "#FF5722", // 热烈但不俗气的亮橙色
                    cyan: "#00E5FF",    // 青蓝
                    blue: "#2962FF",    // 可靠的宝蓝
                },
                // Tailwind CSS 变量映射
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                border: "var(--border)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
            },
            fontFamily: {
                sans: ["Inter", "PingFang SC", "system-ui", "sans-serif"],
                serif: ['"Noto Serif SC"', '"Source Han Serif CN"', "Georgia", "serif"],
            },
            borderRadius: {
                lg: "16px",
                md: "12px",
                sm: "8px",
                xl: "20px",
                "2xl": "24px",
                "3xl": "32px",
            },
            boxShadow: {
                "warm-sm": "0 2px 8px rgba(67, 56, 45, 0.04), 0 1px 2px rgba(67, 56, 45, 0.02)",
                "warm-md": "0 8px 24px rgba(67, 56, 45, 0.06), 0 4px 12px rgba(67, 56, 45, 0.04)",
                "warm-lg": "0 16px 48px rgba(67, 56, 45, 0.08), 0 8px 24px rgba(67, 56, 45, 0.06)",
                "orange-glow": "0 8px 32px rgba(229, 117, 80, 0.20)",
                // 波普风/新粗野主义硬阴影 (Neo-brutalism Shadows)
                "pop-sm": "4px 4px 0px 0px rgba(0,0,0,1)",
                "pop-md": "8px 8px 0px 0px rgba(0,0,0,1)",
                "pop-lg": "12px 12px 0px 0px rgba(0,0,0,1)",
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease-out forwards",
                "fade-in": "fadeIn 0.4s ease-out forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
