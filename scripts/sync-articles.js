/**
 * Obsidian 文章同步脚本
 * 
 * 功能：
 * 1. 读取 Obsidian 公众号文章库中的 Markdown 文件
 * 2. 解析 YAML frontmatter，筛选 status: 🚀 已发布 的文章
 * 3. 下载/复制图片到 public/articles/images/
 * 4. 转换 Markdown 为 HTML
 * 5. 生成 lib/articles-data.json
 * 
 * 用法：
 *   node scripts/sync-articles.js [vault-path]
 *   例如：node scripts/sync-articles.js "D:\MMDBB_vault"
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { pinyin } = require('pinyin-pro');
const https = require('https');
const http = require('http');

// 配置
const CONFIG = {
    // Obsidian 文章库相对于 vault 根目录的路径
    articlesPath: '20 Areas/Education/公众号文章库',
    // 输出的 JSON 文件路径
    outputJsonPath: 'lib/articles-data.json',
    // 图片输出目录
    imagesOutputDir: 'public/articles/images',
    // 发布状态标记
    // 发布状态标记（支持多个状态值）
    publishedStatuses: ['✅ 已发布', '🎯 定稿', '🚀 已发布'],
};

/**
 * 中文转拼音 slug
 */
function toSlug(title) {
    const pinyinStr = pinyin(title, { toneType: 'none', type: 'array' }).join('-');
    return pinyinStr
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 80);
}

/**
 * 下载图片
 */
function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const request = protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://mp.weixin.qq.com/'
            }
        }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(destPath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve(destPath);
            });
            fileStream.on('error', reject);
        });

        request.on('error', reject);
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Download timeout'));
        });
    });
}

/**
 * 生成图片文件名
 */
function generateImageFileName(url, slug, index) {
    let ext = '.jpg';
    if (url.includes('wx_fmt=png')) ext = '.png';
    else if (url.includes('wx_fmt=gif')) ext = '.gif';
    else if (url.includes('wx_fmt=webp')) ext = '.webp';
    else if (url.match(/\.(png|jpg|jpeg|gif|webp)/i)) {
        const match = url.match(/\.(png|jpg|jpeg|gif|webp)/i);
        ext = '.' + match[1].toLowerCase();
    }

    return `${slug}-img-${index}${ext}`;
}

/**
 * 处理文章中的图片
 */
async function processImages(content, slug, vaultPath, imagesDir, filePath) {
    let processedContent = content;
    const imageMap = new Map();
    let imageIndex = 0;
    // 需要从正文中移除的无效图片（SVG占位符、data: URL等）
    const invalidImagePatterns = [];

    const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const obsidianImageRegex = /!\[\[([^\]]+)\]\]/g;

    let match;
    const imagesToDownload = [];

    while ((match = mdImageRegex.exec(content)) !== null) {
        const [fullMatch, alt, url] = match;

        if (imageMap.has(url)) continue;
        // 将无效图片（data: URL、SVG占位符）标记为需要移除，而不是直接跳过
        if (url.startsWith('data:') || url.includes("www.w3.org/2000/svg")) {
            invalidImagePatterns.push(fullMatch);
            continue;
        }

        imageIndex++;
        const fileName = generateImageFileName(url, slug, imageIndex);
        const localPath = `/articles/images/${fileName}`;
        const destPath = path.join(imagesDir, fileName);

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            const decodedUrl = decodeURIComponent(url);
            const fileDir = path.dirname(filePath);
            const localImagePath = path.join(fileDir, decodedUrl);

            if (fs.existsSync(localImagePath)) {
                if (!fs.existsSync(destPath)) {
                    console.log(`  📋 复制本地图片: ${fileName}`);
                    fs.copyFileSync(localImagePath, destPath);
                } else {
                    console.log(`  ⏭️  图片已存在: ${fileName}`);
                }
                imageMap.set(url, { localPath, destPath, alt, isLocal: true });
            } else {
                console.log(`  ⚠️  本地图片未找到: ${localImagePath}`);
            }
            continue;
        }

        imageMap.set(url, { localPath, destPath, alt, isLocal: false });
        imagesToDownload.push({ url, destPath, fileName });
    }

    for (const { url, destPath, fileName } of imagesToDownload) {
        if (fs.existsSync(destPath)) {
            console.log(`  ⏭️  图片已存在: ${fileName}`);
            continue;
        }

        try {
            console.log(`  ⬇️  下载图片: ${fileName}`);
            await downloadImage(url, destPath);
        } catch (error) {
            console.log(`  ❌ 下载失败: ${fileName} - ${error.message}`);
        }
    }

    for (const [originalUrl, { localPath, alt }] of imageMap) {
        const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedUrl}\\)`, 'g');
        processedContent = processedContent.replace(regex, `![${alt || '图片'}](${localPath})`);
    }

    // 移除所有无效图片的 Markdown 语法（SVG占位符、data: URL等）
    for (const pattern of invalidImagePatterns) {
        // 使用字符串替换而非正则，因为 pattern 中可能含有大量特殊字符
        while (processedContent.includes(pattern)) {
            processedContent = processedContent.replace(pattern, '');
        }
    }

    // 处理 Obsidian 本地图片语法 ![[image.png]]
    const obsidianMatches = [...content.matchAll(obsidianImageRegex)];
    for (const match of obsidianMatches) {
        const imageName = match[1];
        const possiblePaths = [
            path.join(vaultPath, CONFIG.articlesPath, 'assets', imageName),
            path.join(vaultPath, CONFIG.articlesPath, 'attachments', imageName),
            path.join(vaultPath, CONFIG.articlesPath, imageName),
            path.join(vaultPath, 'attachments', imageName),
            path.join(vaultPath, 'assets', imageName),
        ];

        let foundPath = null;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                foundPath = p;
                break;
            }
        }

        if (foundPath) {
            imageIndex++;
            const ext = path.extname(imageName);
            const fileName = `${slug}-local-${imageIndex}${ext}`;
            const destPath = path.join(imagesDir, fileName);
            const localPath = `/articles/images/${fileName}`;

            if (!fs.existsSync(destPath)) {
                console.log(`  📋 复制本地图片: ${fileName}`);
                fs.copyFileSync(foundPath, destPath);
            }

            processedContent = processedContent.replace(match[0], `![${imageName}](${localPath})`);
        }
    }

    // 确定封面图：优先使用 alt 为 cover_image 的图片，其次使用正文第一张图
    let coverImage = null;
    for (const [originalUrl, info] of imageMap) {
        if (info.alt === 'cover_image') {
            coverImage = info.localPath;
            break;
        }
    }
    if (!coverImage && imageMap.size > 0) {
        coverImage = [...imageMap.values()][0].localPath;
    }

    return { content: processedContent, coverImage };
}

/**
 * 清理文章内容
 */
function cleanContent(content) {
    return content
        .replace(/点击蓝字\s*关注.*$/gm, '')
        .replace(/原创.*\[.*\].*\*\d{4}年.*$/gm, '')
        .replace(/继续滑动看下一个/g, '')
        .replace(/向上滑动看下一个/g, '')
        .replace(/同步该文章/g, '')
        .replace(/作者提示:.*$/gm, '')
        // 移除 Obsidian 内部链接 [[link]]
        .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (match, link, alias) => alias || link)
        // 移除多余空行
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/**
 * 检查是否到了发布日期
 */
function isPublishDateReached(publishDate) {
    if (!publishDate) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(publishDate);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate <= today;
}

/**
 * 预处理 frontmatter：移除 Obsidian wikilinks
 */
function preprocessFrontmatter(fileContent) {
    const fmMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) return fileContent;

    const cleanedFm = fmMatch[1].replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (m, link, alias) => alias || link);
    return fileContent.replace(fmMatch[0], `---\n${cleanedFm}\n---`);
}

/**
 * 解析单篇文章
 */
async function parseArticle(filePath, vaultPath, imagesDir, id) {
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // 预处理 frontmatter 中的 Obsidian 语法
    fileContent = preprocessFrontmatter(fileContent);

    let data, content;
    try {
        const parsed = matter(fileContent);
        data = parsed.data;
        content = parsed.content;
    } catch (err) {
        const fileName = path.basename(filePath, '.md');
        console.log(`  ⚠️ YAML 解析失败，跳过: ${fileName} - ${err.message}`);
        return null;
    }

    // 检查发布状态
    if (!CONFIG.publishedStatuses.includes(data.status)) {
        return null;
    }

    // 检查是否到了计划发布日期
    const publishDate = data['publish-date'];
    if (!isPublishDateReached(publishDate)) {
        const fileName = path.basename(filePath, '.md');
        console.log(`⏰ 计划发布: ${fileName} (${publishDate})`);
        return 'scheduled';
    }

    const fileName = path.basename(filePath, '.md');
    const slug = toSlug(fileName);

    console.log(`📄 处理文章: ${fileName}`);

    // 尝试从 frontmatter 提取封面图（微信文章通常有 cover_image 字段）
    let frontmatterCover = null;
    if (data.cover_image) {
        // frontmatter 中有 cover_image（通常是微信 mmbiz 的封面URL）
        const coverUrl = data.cover_image;
        if (coverUrl.startsWith('http')) {
            imageIndex = 0; // 重置计数器
            const coverFileName = `${slug}-cover.jpg`;
            const coverDestPath = path.join(imagesDir, coverFileName);
            const coverLocalPath = `/articles/images/${coverFileName}`;
            if (!fs.existsSync(coverDestPath)) {
                try {
                    console.log(`  🖼️  下载封面: ${coverFileName}`);
                    await downloadImage(coverUrl, coverDestPath);
                    frontmatterCover = coverLocalPath;
                } catch (err) {
                    console.log(`  ⚠️  封面下载失败: ${err.message}`);
                }
            } else {
                frontmatterCover = coverLocalPath;
            }
        }
    }

    // 处理图片
    const { content: processedContent, coverImage } = await processImages(content, slug, vaultPath, imagesDir, filePath);

    // 封面优先级：frontmatter cover_image > 正文首图
    const finalCover = frontmatterCover || coverImage || null;

    // 清理内容
    const cleanedContent = cleanContent(processedContent);

    // 转换为 HTML
    const htmlContent = marked.parse(cleanedContent);

    // 提取摘要（第一个 blockquote 或前200字）
    let excerpt = '';
    const blockquoteMatch = cleanedContent.match(/^>\s*(.+)$/m);
    if (blockquoteMatch) {
        excerpt = blockquoteMatch[1].trim();
    } else {
        excerpt = cleanedContent
            .replace(/^#+\s+.+$/gm, '')
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`#]/g, '')
            .trim()
            .substring(0, 200);
    }

    return {
        id,
        title: fileName,
        slug,
        category: data.topic || '升学规划',
        excerpt,
        content: htmlContent,
        coverImage: finalCover,
        published: true,
        publishedAt: data['publish-date'] || data.created || new Date().toISOString().split('T')[0],
        createdAt: data.created || new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
    };
}

/**
 * 主函数
 */
/**
 * 递归获取目录下所有 Markdown 文件
 */
function getFilesRecursive(dir, baseDir, allFiles = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFilesRecursive(fullPath, baseDir, allFiles);
        } else {
            if (file.endsWith('.md') && !file.startsWith('.')) {
                allFiles.push(path.relative(baseDir, fullPath));
            }
        }
    }
    return allFiles;
}

async function main() {
    const vaultPath = process.argv[2] || 'D:\\MMDBB_vault';
    const articlesDir = path.join(vaultPath, CONFIG.articlesPath);

    console.log('🚀 Obsidian 文章同步脚本');
    console.log(`📁 Vault 路径: ${vaultPath}`);
    console.log(`📁 文章目录: ${articlesDir}`);

    if (!fs.existsSync(articlesDir)) {
        console.error(`❌ 文章目录不存在: ${articlesDir}`);
        process.exit(1);
    }

    const imagesDir = path.resolve(CONFIG.imagesOutputDir);
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
        console.log(`📁 创建图片目录: ${imagesDir}`);
    }

    const files = getFilesRecursive(articlesDir, articlesDir);

    console.log(`📝 找到 ${files.length} 个文章文件`);

    const articles = [];
    let id = 1;
    let scheduledCount = 0;
    let errorCount = 0;

    for (const file of files) {
        const filePath = path.join(articlesDir, file);
        try {
            const result = await parseArticle(filePath, vaultPath, imagesDir, id);

            if (result === 'scheduled') {
                scheduledCount++;
            } else if (result) {
                articles.push(result);
                id++;
            }
        } catch (err) {
            errorCount++;
            console.log(`  ❌ 处理失败: ${file} - ${err.message}`);
        }
    }

    console.log(`\n✅ 已处理 ${articles.length} 篇已发布文章`);
    if (scheduledCount > 0) {
        console.log(`⏰ ${scheduledCount} 篇文章等待计划发布`);
    }
    if (errorCount > 0) {
        console.log(`❌ ${errorCount} 篇文章处理失败`);
    }

    // 按发布日期排序（最新的在前）
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const outputPath = path.resolve(CONFIG.outputJsonPath);
    fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
    console.log(`📄 已生成: ${outputPath}`);

    console.log('\n📊 统计:');
    console.log(`   - 已发布文章: ${articles.length}`);
    console.log(`   - 计划发布: ${scheduledCount}`);
    console.log(`   - 处理失败: ${errorCount}`);
    console.log(`   - 草稿/跳过: ${files.length - articles.length - scheduledCount - errorCount}`);
}

main().catch(console.error);
