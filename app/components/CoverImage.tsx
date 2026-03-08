"use client";

import { useState } from "react";

interface CoverImageProps {
    src: string;
    alt: string;
    className?: string;
    type: "video" | "article" | "podcast";
}

export function CoverImage({ src, alt, className, type }: CoverImageProps) {
    const [imgSrc, setImgSrc] = useState(src);

    const fallbackSrc = {
        video: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074",
        article: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=2068",
        podcast: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070",
    };

    return (
        <img
            src={imgSrc || fallbackSrc[type]}
            alt={alt}
            referrerPolicy="no-referrer"
            className={className}
            onError={() => {
                if (imgSrc !== fallbackSrc[type]) {
                    setImgSrc(fallbackSrc[type]);
                }
            }}
        />
    );
}
