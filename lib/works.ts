import { VIDEOS, ARTICLES, PODCASTS } from "./old-data";
import { mapVideoToWork, mapArticleToWork, mapPodcastToWork, WorkItem } from "./data-mapper";

// --- 置顶作品：严格选择 2 视频、2 播客、2 公众号 ---

// 1. 公众号核心文章 (ID 30) - 占据 8x2
const oa_chengdu = ARTICLES.find(a => a.id === 30);

// 2. 视频 1 (BV1LzPjzvE73) - 占据 4x1
const v_policy = {
    id: 42,
    title: "2026教育大计，16万人参加中考！成都取消调考、贯通培养、指标扩容的真正用意",
    bvid: "BV1LzPjzvE73",
    type: "video",
    category: "教育",
    coverImage: "/covers/videos/BV1LzPjzvE73.jpg"
};

// 3. 视频 2 (BV1kN41167mT) - 占据 4x1
const v_meeting = {
    id: 41,
    title: "2025成都中考等级化改革...成都教育的新变量",
    bvid: "BV1kN41167mT",
    type: "video",
    category: "教育",
    coverImage: "/covers/videos/BV1kN41167mT.jpg"
};

// 4. 播客 1 (ID 1) - 占据 4x1 (水平排版)
const p_digital = PODCASTS.find(p => p.id === 1);

// 5. 公众号文章 2 (ID 29) - 占据 4x1
const oa_choice = ARTICLES.find(a => a.id === 29);

// 6. 播客 2 (ID 2) - 占据 4x1 (水平排版)
const p_companion = PODCASTS.find(p => p.id === 2);

// 使用 compact 模式构造 pinnedWorks，过滤掉由于数据缺失可能导致的 undefined
export const pinnedWorks: WorkItem[] = [
    oa_chengdu ? mapArticleToWork(oa_chengdu, true) : null,
    v_policy ? mapVideoToWork(v_policy, true) : null,
    v_meeting ? mapVideoToWork(v_meeting, true) : null,
    p_digital ? mapPodcastToWork(p_digital, true) : null,
    oa_choice ? mapArticleToWork(oa_choice, true) : null,
    p_companion ? mapPodcastToWork(p_companion, true) : null
].filter((w): w is WorkItem => w !== null);

// 挑选剩余视频作为普通列表
const pinnedBvids = pinnedWorks.map(w => w.bvid).filter(Boolean);
const selectedOldVideos = VIDEOS
    .filter(v => !pinnedBvids.includes(v.bvid))
    .slice(0, 6)
    .map(v => mapVideoToWork(v, false));

const selectedOldArticles = ARTICLES
    .filter(a => !pinnedWorks.some(pw => pw.id === a.id))
    .map((a) => mapArticleToWork(a, false));

const selectedOldPodcasts = PODCASTS
    .filter(p => !pinnedWorks.some(pw => pw.id === p.id))
    .map((p) => mapPodcastToWork(p, false));

export const allWorks: WorkItem[] = [
    ...pinnedWorks,
    ...selectedOldVideos,
    ...selectedOldArticles,
    ...selectedOldPodcasts
];

export const regularWorks = allWorks.filter(w => !w.pinned);
