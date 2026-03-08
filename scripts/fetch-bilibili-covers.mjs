/**
 * B站视频封面下载脚本
 * 通过B站公开API获取视频封面，下载到 public/covers/videos/ 目录
 * 
 * 用法: node scripts/fetch-bilibili-covers.mjs
 * 
 * 每次新增视频后跑一次即可，已有的不会重复下载。
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const COVERS_DIR = path.join(ROOT, 'public', 'covers', 'videos');

// 确保目录存在
fs.mkdirSync(COVERS_DIR, { recursive: true });

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.bilibili.com/' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(new Error('JSON parse error: ' + data.substring(0, 200))); }
            });
        }).on('error', reject);
    });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        // B站图片URL可能是 http 开头
        const finalUrl = url.replace(/^http:/, 'https:');
        const client = finalUrl.startsWith('https') ? https : http;
        client.get(finalUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.bilibili.com/'
            }
        }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode} for ${finalUrl}`));
            }
            const fileStream = fs.createWriteStream(dest);
            res.pipe(fileStream);
            fileStream.on('finish', () => { fileStream.close(); resolve(); });
            fileStream.on('error', reject);
        }).on('error', reject);
    });
}

async function fetchCoverForBvid(bvid) {
    const ext = '.jpg';
    const localPath = path.join(COVERS_DIR, `${bvid}${ext}`);
    const publicPath = `/covers/videos/${bvid}${ext}`;

    // 跳过已下载
    if (fs.existsSync(localPath)) {
        console.log(`  ✓ 已存在: ${bvid}`);
        return publicPath;
    }

    try {
        const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
        const result = await fetchJSON(apiUrl);
        if (result.code !== 0 || !result.data?.pic) {
            console.error(`  ✗ API失败 ${bvid}: code=${result.code}, message=${result.message}`);
            return null;
        }

        const picUrl = result.data.pic;
        console.log(`  ↓ 下载: ${bvid} <- ${picUrl}`);
        await downloadFile(picUrl, localPath);
        console.log(`  ✓ 完成: ${bvid}`);
        return publicPath;
    } catch (err) {
        console.error(`  ✗ 出错 ${bvid}:`, err.message);
        return null;
    }
}

// 从 old-data 中读取所有 bvid
async function main() {
    // 动态读取所有视频的 bvid
    const oldDataPath = path.join(ROOT, 'lib', 'old-data.ts');
    const oldDataContent = fs.readFileSync(oldDataPath, 'utf-8');

    // 提取所有 bvid
    const bvidRegex = /bvid:\s*["']([^"']+)["']/g;
    const bvids = [];
    let match;
    while ((match = bvidRegex.exec(oldDataContent)) !== null) {
        if (match[1]) bvids.push(match[1]);
    }

    // 也检查 works.ts 中的新增视频
    const worksPath = path.join(ROOT, 'lib', 'works.ts');
    const worksContent = fs.readFileSync(worksPath, 'utf-8');
    while ((match = bvidRegex.exec(worksContent)) !== null) {
        if (match[1] && !bvids.includes(match[1])) bvids.push(match[1]);
    }

    console.log(`\n🎬 找到 ${bvids.length} 个B站视频，开始下载封面...\n`);

    const results = {};
    for (const bvid of bvids) {
        // 避免过快请求，间隔300ms
        await new Promise(r => setTimeout(r, 300));
        const localPath = await fetchCoverForBvid(bvid);
        if (localPath) {
            results[bvid] = localPath;
        }
    }

    // 输出映射表
    const mappingPath = path.join(COVERS_DIR, 'cover-map.json');
    fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2), 'utf-8');
    console.log(`\n✅ 完成！共下载 ${Object.keys(results).length} 个封面`);
    console.log(`📄 映射表已保存到: ${mappingPath}`);
}

main().catch(console.error);
