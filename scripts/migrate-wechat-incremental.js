/**
 * 增量从微信公众号迁移新文章到网站（终局直通方案，绕过 Obsidian）
 * 
 * 功能：
 * 1. 读取指定的 URL 列表文件（纯链接）
 * 2. 调用 Python 爬虫直接抓取原文、真实封面和图片
 * 3. 自动提取 Python 生成的 Markdown Frontmatter 中的标题和日期
 * 4. 直接转换 Markdown 成 HTML
 * 5. 将结果追加写入 lib/articles-data.json，去重并排序
 * 
 * 用法:
 *   node scripts/migrate-wechat-incremental.js [url-list-file]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');
const { pinyin } = require('pinyin-pro');
const matter = require('gray-matter');

const CONFIG = {
    scraperDir: path.join(__dirname, '..', 'tools', 'wechat-article-to-markdown'),
    pythonExe: 'python',
    imagesOutputDir: path.join(__dirname, '..', 'public', 'articles', 'images'),
    outputJsonPath: path.join(__dirname, '..', 'lib', 'articles-data.json')
};

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

function cleanContent(content) {
    return content
        .replace(/点击蓝字\s*关注.*$/gm, '')
        .replace(/原创.*\[.*\].*\*\d{4}年.*$/gm, '')
        .replace(/继续滑动看下一个/g, '')
        .replace(/向上滑动看下一个/g, '')
        .replace(/同步该文章/g, '')
        .replace(/作者提示:.*$/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

async function main() {
    const inputFilePath = process.argv[2];
    if (!inputFilePath) {
        console.error('❌ 请提供 URL 列表文件路径');
        process.exit(1);
    }

    console.log(`🚀 开始增量迁移微信文章: ${inputFilePath}`);

    if (!fs.existsSync(CONFIG.imagesOutputDir)) {
        fs.mkdirSync(CONFIG.imagesOutputDir, { recursive: true });
    }

    // 加载现有数据
    let articlesData = [];
    if (fs.existsSync(CONFIG.outputJsonPath)) {
        try {
            articlesData = JSON.parse(fs.readFileSync(CONFIG.outputJsonPath, 'utf-8'));
        } catch (e) {
            console.warn('⚠️ 现有 JSON 损坏或为空，将创建新列表');
        }
    }

    const existingUrls = new Set(articlesData.map(a => a.sourceUrl));
    const listContent = fs.readFileSync(inputFilePath, 'utf-8');
    const urls = listContent.split('\n').map(l => l.trim()).filter(l => l.length > 0 && l.startsWith('http'));

    let newCount = 0;

    for (const urlStr of urls) {
        if (existingUrls.has(urlStr)) {
            console.log(`⏩ 跳过已存在的 URL: ${urlStr}`);
            continue;
        }

        console.log(`\n---------------------------------`);
        console.log(`📥 正在抓取增量文章: ${urlStr}`);

        const outputDir = path.join(CONFIG.scraperDir, 'output');
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
        }
        fs.mkdirSync(outputDir, { recursive: true });

        // 调用 Python 爬虫
        try {
            execSync(`"${CONFIG.pythonExe}" -m wechat_article_to_markdown "${urlStr}"`, {
                cwd: CONFIG.scraperDir,
                stdio: 'inherit'
            });
        } catch (err) {
            console.error(`❌ 爬虫执行失败: ${urlStr}`);
            continue;
        }

        const dirs = fs.readdirSync(outputDir).filter(f => fs.statSync(path.join(outputDir, f)).isDirectory());
        if (dirs.length === 0) {
            console.error(`❌ 未能找到输出目录: ${urlStr}`);
            continue;
        }

        const articleTitleDir = dirs[0];
        const sourcePath = path.join(outputDir, articleTitleDir);
        const mdFileName = `${articleTitleDir}.md`;
        const sourceMdPath = path.join(sourcePath, mdFileName);
        const sourceImagesPath = path.join(sourcePath, 'images');

        if (!fs.existsSync(sourceMdPath)) {
            console.error(`❌ Markdown 未生成: ${sourceMdPath}`);
            continue;
        }

        const fileContent = fs.readFileSync(sourceMdPath, 'utf-8');
        const parsed = matter(fileContent);
        let content = parsed.content;
        const data = parsed.data;

        const originalTitle = data.title || articleTitleDir;
        const publishDateStr = data.publish_date || new Date().toISOString().split('T')[0];
        const slug = toSlug(originalTitle);

        console.log(`📄 标题: ${originalTitle} | 日期: ${publishDateStr}`);

        // 1. 处理真实封面
        let finalCoverImageUrl = '';
        if (data && data.cover_image) {
            const coverUrl = data.cover_image;
            console.log(`✨ 发现真实封面图: ${coverUrl}`);
            const coverExt = coverUrl.includes('wx_fmt=png') ? '.png' : (coverUrl.includes('wx_fmt=gif') ? '.gif' : '.jpg');
            const coverFileName = `${slug}-cover${coverExt}`;
            const coverDestPath = path.join(CONFIG.imagesOutputDir, coverFileName);

            try {
                execSync(`curl -sL "${coverUrl}" -o "${coverDestPath}"`);
                if (fs.existsSync(coverDestPath)) {
                    finalCoverImageUrl = `/articles/images/${coverFileName}`;
                    console.log(`   下载完成真实封面!`);
                }
            } catch (e) {
                console.log(`   封面下载失败!`);
            }
        }

        // 2. 处理文章内部图片
        if (fs.existsSync(sourceImagesPath)) {
            const tempImages = fs.readdirSync(sourceImagesPath);
            for (const imgName of tempImages) {
                const sImg = path.join(sourceImagesPath, imgName);
                const newImgName = `${slug}-${imgName}`;
                const tImg = path.join(CONFIG.imagesOutputDir, newImgName);
                fs.copyFileSync(sImg, tImg);

                const oldPathStr = `images/${imgName}`;
                const newPathStr = `/articles/images/${newImgName}`;
                content = content.split(oldPathStr).join(newPathStr);
            }
        }

        // 3. 清理正文头部
        content = content.replace(/^# .*\n/m, '');
        content = content.replace(/^> 公众号.*\n/m, '');
        content = content.replace(/^> 发布时间.*\n/m, '');
        content = content.replace(/^> 原文链接.*\n/m, '');
        content = cleanContent(content);

        const rawText = content.replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`#]/g, '')
            .replace(/\n+/g, ' ')
            .trim();
        const excerpt = rawText.substring(0, 150);

        const htmlContent = marked.parse(content);

        articlesData.push({
            id: Date.now() + newCount, // 简单生成 ID
            title: originalTitle,
            slug: slug,
            category: "升学规划",
            excerpt: excerpt,
            content: htmlContent,
            coverImage: finalCoverImageUrl ? finalCoverImageUrl : "/covers/articles/default.jpg",
            published: true,
            publishedAt: publishDateStr,
            createdAt: publishDateStr,
            updatedAt: new Date().toISOString().split('T')[0],
            sourceUrl: urlStr
        });

        newCount++;
        console.log(`✅ ${originalTitle} 已准备就绪`);
    }

    if (newCount > 0) {
        // 按发布日期排序（最新的在前）
        articlesData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // 重新分配连续的 ID (可选)
        articlesData.forEach((item, index) => {
            item.id = articlesData.length - index;
        });

        fs.writeFileSync(CONFIG.outputJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
        console.log(`\n🎉 增量迁移完成！增加了 ${newCount} 篇文章。`);
        console.log(`📄 数据更新至: ${CONFIG.outputJsonPath}`);
    } else {
        console.log(`\n💤 没有发现新文章需要迁移。`);
    }
}

main().catch(console.error);

