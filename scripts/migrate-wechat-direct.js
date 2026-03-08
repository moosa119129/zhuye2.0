/**
 * 直接从微信公众号批量迁移文章到网站（终局直通方案，绕过 Obsidian）
 * 
 * 功能：
 * 1. 读取 final_migration_list.txt 中的微信链接
 * 2. 调用 Python 爬虫直接抓取原文、真实封面和图片
 * 3. 提取封面图、处理所有图片并放置于 public/articles/images
 * 4. 直接转换 Markdown 成 HTML
 * 5. 将结果直接写入 lib/articles-data.json，供前台渲染
 * 
 * 用法:
 *   node scripts/migrate-wechat-direct.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');
const { pinyin } = require('pinyin-pro');
const matter = require('gray-matter');

const CONFIG = {
    listFile: path.join(__dirname, '..', 'final_migration_list.txt'),
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
    console.log('🚀 开始直接迁移微信文章 (绕过 Obsidian) ...');

    if (!fs.existsSync(CONFIG.imagesOutputDir)) {
        fs.mkdirSync(CONFIG.imagesOutputDir, { recursive: true });
    }

    const listContent = fs.readFileSync(CONFIG.listFile, 'utf-8');
    const lines = listContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const articlesData = [];
    let idCounter = 1;

    for (const line of lines) {
        // 解析格式: title | publish-date: xxx | source: url
        const parts = line.split('|').map(p => p.trim());
        if (parts.length < 3) continue;

        const originalTitle = parts[0].replace('.md', '');
        const publishDateStr = parts[1].replace('publish-date:', '').trim();
        const urlStr = parts[2].replace('source:', '').trim();

        console.log(`\n---------------------------------`);
        console.log(`📥 正在抓取: ${originalTitle} \n🔗 URL: ${urlStr}`);

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
            console.error(`❌ 爬虫执行失败: ${originalTitle}`);
            continue;
        }

        const dirs = fs.readdirSync(outputDir).filter(f => fs.statSync(path.join(outputDir, f)).isDirectory());
        if (dirs.length === 0) {
            console.error(`❌ 未能找到输出目录: ${originalTitle}`);
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

        const slug = toSlug(originalTitle);

        // 1. 处理真实封面 (刚修改 python 注入在 YAML frontmatter 中的 cover_image)
        let finalCoverImageUrl = '';
        if (data && data.cover_image) {
            const coverUrl = data.cover_image;
            console.log(`✨ 发现真实封面图: ${coverUrl}`);
            const coverExt = coverUrl.includes('wx_fmt=png') ? '.png' : (coverUrl.includes('wx_fmt=gif') ? '.gif' : '.jpg');
            const coverFileName = `${slug}-cover${coverExt}`;
            const coverDestPath = path.join(CONFIG.imagesOutputDir, coverFileName);

            // 为了简化，从 node 下载真实封面图
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

        // 2. 将文章内部图片的 Markdown 本地路径替换并移动
        if (fs.existsSync(sourceImagesPath)) {
            const tempImages = fs.readdirSync(sourceImagesPath);
            for (const imgName of tempImages) {
                const sImg = path.join(sourceImagesPath, imgName);
                const newImgName = `${slug}-${imgName}`;
                const tImg = path.join(CONFIG.imagesOutputDir, newImgName);
                fs.copyFileSync(sImg, tImg);

                // 替换 Markdown 中的图片路径
                // Python生成的相对路径是 "images/img_xxx.jpg"
                const oldPathStr = `images/${imgName}`;
                const newPathStr = `/articles/images/${newImgName}`;
                content = content.split(oldPathStr).join(newPathStr);
            }
        }

        // 3. 彻底清理正文里混杂在开头的 "# 标题" 和 "> 公众号" 这些由于 python脚本生成的额外头部信息
        content = content.replace(/^# .*\n/m, '');
        content = content.replace(/^> 公众号.*\n/m, '');
        content = content.replace(/^> 发布时间.*\n/m, '');
        content = content.replace(/^> 原文链接.*\n/m, '');
        content = cleanContent(content);

        // 第一个非图片段落作为 excerpt
        let excerpt = '';
        const rawText = content.replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`#]/g, '')
            .replace(/\n+/g, ' ')
            .trim();
        excerpt = rawText.substring(0, 150);

        const htmlContent = marked.parse(content);

        articlesData.push({
            id: idCounter++,
            title: originalTitle,
            slug: slug,
            category: "升学规划", // 统一打上此标签
            excerpt: excerpt,
            content: htmlContent,
            coverImage: finalCoverImageUrl ? finalCoverImageUrl : "/covers/articles/default.jpg",
            published: true,
            publishedAt: publishDateStr,
            createdAt: publishDateStr,
            updatedAt: new Date().toISOString().split('T')[0]
        });

        console.log(`✅ 解析入库成功: ${originalTitle}`);
    }

    console.log(`\n🎉 全部抓取和解析完成！`);

    // 按发布日期排序（最新的在前）
    articlesData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    fs.writeFileSync(CONFIG.outputJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
    console.log(`📄 已直接生成数据至: ${CONFIG.outputJsonPath}`);
    console.log(`📊 总计文章数: ${articlesData.length}`);
}

main().catch(console.error);

