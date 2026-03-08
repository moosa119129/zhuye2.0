/**
 * 微信公众号文章一键导入脚本
 * 
 * 功能：
 * 1. 调用 wechat-article-to-markdown 工具抓取文章
 * 2. 注入网站所需的 YAML frontmatter
 * 3. 将文章和图片移动到 Obsidian 库
 * 4. (可选) 自动触发网站同步
 * 
 * 用法：
 *   node scripts/import-wechat.js <wechat-url> [publish-date]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ==================== 配置 ====================
const CONFIG = {
    scraperDir: path.join(__dirname, '..', 'tools', 'wechat-article-to-markdown'),
    obsidianArticlesPath: path.join(__dirname, '..', 'articles-vault', '公众号文章库'),
    // 直接使用系统 python，因为刚才已经全局安装了所有依赖
    pythonExe: 'python',
};

async function main() {
    const url = process.argv[2];
    const publishDate = process.argv[3] || new Date().toISOString().split('T')[0];

    if (!url) {
        console.error('❌ 请提供微信文章 URL');
        process.exit(1);
    }

    console.log(`🚀 开始处理微信文章: ${url}`);

    try {
        // 0. 清理旧的输出
        const outputDir = path.join(CONFIG.scraperDir, 'output');
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
        }
        fs.mkdirSync(outputDir, { recursive: true });

        // 1. 调用 Python 抓取
        console.log('🔄 正在抓取文章内容...');
        // 我们在爬虫目录下运行，它会生成 output/<title>
        try {
            execSync(`"${CONFIG.pythonExe}" -m wechat_article_to_markdown "${url}"`, {
                cwd: CONFIG.scraperDir,
                stdio: 'inherit'
            });
        } catch (err) {
            console.error('❌ 爬虫执行失败:', err.message);
            if (err.stdout) console.error(err.stdout.toString());
            if (err.stderr) console.error(err.stderr.toString());
            throw err;
        }

        // 2. 寻找抓取出来的目录
        const dirs = fs.readdirSync(outputDir).filter(f => fs.statSync(path.join(outputDir, f)).isDirectory());

        if (dirs.length === 0) {
            throw new Error('未发现输出目录，抓取可能失败');
        }

        // 假设最新的目录就是刚刚抓取的（或者按名称匹配）
        // 这里简单处理：取第一个目录
        const articleTitleDir = dirs[0];
        const sourcePath = path.join(outputDir, articleTitleDir);
        const mdFileName = `${articleTitleDir}.md`;
        const sourceMdPath = path.join(sourcePath, mdFileName);
        const sourceImagesPath = path.join(sourcePath, 'images');

        console.log(`✨ 抓取成功: ${articleTitleDir}`);

        // 3. 读取 Markdown 并注入 Frontmatter
        let content = fs.readFileSync(sourceMdPath, 'utf-8');

        // 如果文件已经有 # 标题，我们在这个脚本里插入 YAML
        const frontmatter = `---
status: '🚀 已发布'
publish-date: '${publishDate}'
topic: 'AI 思考'
---

`;
        content = frontmatter + content;
        fs.writeFileSync(sourceMdPath, content, 'utf-8');

        // 4. 移动到 Obsidian
        const targetMdPath = path.join(CONFIG.obsidianArticlesPath, mdFileName);
        const targetImagesDir = path.join(CONFIG.obsidianArticlesPath, 'images');

        console.log(`🔍 准备移动:`);
        console.log(`   源路径: ${sourceMdPath}`);
        console.log(`   目标路径: ${targetMdPath}`);

        if (!fs.existsSync(targetImagesDir)) {
            fs.mkdirSync(targetImagesDir, { recursive: true });
        }

        console.log(`🚚 正在移动文件到 Obsidian...`);
        fs.copyFileSync(sourceMdPath, targetMdPath);
        fs.unlinkSync(sourceMdPath);

        if (fs.existsSync(sourceImagesPath)) {
            const images = fs.readdirSync(sourceImagesPath);
            for (const img of images) {
                const sImg = path.join(sourceImagesPath, img);
                const tImg = path.join(targetImagesDir, img);
                // 如果图片已存在则跳过或覆盖
                fs.copyFileSync(sImg, tImg);
            }
        }

        // 5. 清理临时目录
        fs.rmSync(sourcePath, { recursive: true, force: true });

        console.log(`✅ 文章已成功导入 Obsidian: ${targetMdPath}`);
        console.log(`💡 您现在可以运行 npm run sync 来更新网站了。`);

    } catch (error) {
        console.error('❌ 导入失败:', error.message);
        process.exit(1);
    }
}

main();
