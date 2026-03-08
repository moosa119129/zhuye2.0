import { Video, Article, Podcast } from "@/lib/old-data";
import coverMap from "../public/covers/videos/cover-map.json";

export interface WorkItem {
    id: string | number;
    type: "video" | "article" | "podcast";
    category: string;
    pinned: boolean;
    title: string;
    excerpt: string;
    date: string;
    cover: string | null;
    link: string;
    bvid?: string;
    materials: { title: string; isPublic: boolean; type: "pdf" | "excel" | "link" | "image" | "other" }[];
}

// B站封面映射表（由 scripts/fetch-bilibili-covers.mjs 下载后自动生成）
const biliCoverMap: Record<string, string> = coverMap;

/**
 * 获取视频的本地封面路径
 * 优先使用 cover-map.json 中通过API下载到本地的封面
 */
function getVideoCover(bvid: string): string {
    if (bvid && biliCoverMap[bvid]) {
        return biliCoverMap[bvid];
    }
    // 如果映射表中没有，返回一个占位
    return "/covers/videos/default.jpg";
}

// Map old video data to new work item format
export const mapVideoToWork = (video: Video, isPinned = false, extraData?: Partial<WorkItem>): WorkItem => {
    return {
        id: `v_${video.id}`,
        type: "video",
        category: video.category,
        pinned: isPinned,
        title: video.title,
        excerpt: "",
        date: "2024-01-01",
        cover: getVideoCover(video.bvid),
        bvid: video.bvid,
        link: video.bvid ? `https://www.bilibili.com/video/${video.bvid}` : "#",
        materials: [],
        ...extraData
    };
};

export const mapArticleToWork = (article: Article, isPinned = false, extraData?: Partial<WorkItem>): WorkItem => {
    return {
        id: `a_${article.id}`,
        type: "article",
        category: article.category,
        pinned: isPinned,
        title: article.title,
        excerpt: (article.excerpt || "").replace(/\*\*/g, '').replace(/^核心摘要[：:]\s*/i, ''),
        date: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : "2024-01-01",
        // 公众号文章封面：优先使用同步脚本提取的封面，缺失时使用默认封面
        cover: article.coverImage || "/covers/articles/default.jpg",
        link: `/works/${article.slug}`,
        materials: [],
        ...extraData
    };
};

export const mapPodcastToWork = (podcast: Podcast, isPinned = false, extraData?: Partial<WorkItem>): WorkItem => {
    return {
        id: `p_${podcast.id}`,
        type: "podcast",
        category: "播客",
        pinned: isPinned,
        title: podcast.title,
        excerpt: podcast.description,
        date: podcast.publishedAt ? new Date(podcast.publishedAt).toISOString().split('T')[0] : "2024-01-01",
        // 播客封面已从旧项目复制到 public/podcast-cover.png
        cover: podcast.coverImage || "/podcast-cover.png",
        link: podcast.linkUrl,
        materials: [],
        ...extraData
    };
};
