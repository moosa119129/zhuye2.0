/**
 * 微信公众号历史封面应用脚本
 * 
 * 功能：
 * 读取由 `wechat-console-script.js` 提取的 `wechat-covers.json` 文件，
 * 匹配 Obsidian 公众号文章库中的 Markdown 文件，
 * 如果匹配成功且原有文件没有 `cover_image`，则将封面图链接写入 YAML frontmatter。
 * 
 * 用法：
 *   node scripts/apply-wechat-covers.js [vault-path]
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONFIG = {
    // Obsidian 文章库相对于 vault 根目录的路径
    articlesPath: '20 Areas/Education/公众号文章库',
    // 封面 JSON 文件路径
    coversJsonPath: 'wechat-covers.json'
};

/**
 * 简单的清理比较函数
 */
function normalizeTitle(title) {
    if (!title) return '';
    return title.toLowerCase()
        .replace(/\s+/g, '') // Remove all whitespaces including newlines \n
        .replace(/[^\w\u4e00-\u9fa5]/g, '')
        .replace(/原创/g, ''); // Also remove the '原创' tag which might interfere
}

/**
 * Find the longest common substring between two strings.
 * Returns the length of that common substring.
 */
function longestCommonSubstringLength(s1, s2) {
    let maxLen = 0;
    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s2.length; j++) {
            let len = 0;
            while (i + len < s1.length && j + len < s2.length && s1[i + len] === s2[j + len]) {
                len++;
            }
            if (len > maxLen) maxLen = len;
        }
    }
    return maxLen;
}

/**
 * Check if two titles are likely the same article.
 * Uses a combination of substring and longest-common-substring logic.
 */
function isTitleMatch(norm1, norm2) {
    if (!norm1 || !norm2) return false;
    // Direct include check first (fast path)
    if (norm1.includes(norm2) || norm2.includes(norm1)) return true;
    // Fuzzy: longest common substring should be at least 8 chars
    // and cover at least 50% of the shorter string
    const shorter = norm1.length < norm2.length ? norm1 : norm2;
    const lcsLen = longestCommonSubstringLength(norm1, norm2);
    return lcsLen >= 8 && lcsLen / shorter.length >= 0.4;
}

async function main() {
    const vaultPath = process.argv[2] || 'D:\\MMDBB_vault';
    const articlesDir = path.join(vaultPath, CONFIG.articlesPath);
    const coversJsonFile = path.resolve(CONFIG.coversJsonPath);

    console.log('🚀 微信历史封面应用脚本');

    if (!fs.existsSync(coversJsonFile)) {
        console.error(`❌ 找不到封面数据文件: ${coversJsonFile}`);
        console.log(`请先在 Chrome 登录公众号后台执行 wechat-console-script.js 提取数据并保存。`);
        process.exit(1);
    }

    if (!fs.existsSync(articlesDir)) {
        console.error(`❌ 文章目录不存在: ${articlesDir}`);
        process.exit(1);
    }

    // 读取封面数据
    const rawData = fs.readFileSync(coversJsonFile, 'utf-8');
    const coversData = JSON.parse(rawData);
    console.log(`✅ 已加载 ${coversData.length} 条封面记录`);

    const files = fs.readdirSync(articlesDir)
        .filter(f => f.endsWith('.md') && !f.startsWith('.'));

    let matchedCount = 0;
    let updatedCount = 0;

    for (const file of files) {
        const filePath = path.join(articlesDir, file);
        const fileNameWithoutExt = file.replace('.md', '');

        let fileContent;
        try {
            const buf = fs.readFileSync(filePath);
            // Detect UTF-16 LE BOM (FF FE) or UTF-16 BE BOM (FE FF)
            if (buf[0] === 0xFF && buf[1] === 0xFE) {
                fileContent = buf.toString('utf16le');
            } else if (buf[0] === 0xFE && buf[1] === 0xFF) {
                // UTF-16 BE, swap bytes and read
                fileContent = buf.swap16().toString('utf16le');
            } else {
                fileContent = buf.toString('utf-8');
            }
        } catch (e) {
            console.log(`  ❌ 文件读取失败，跳过: ${file}`);
            continue;
        }

        let parsed;
        try {
            parsed = matter(fileContent);
        } catch (e) {
            console.log(`  里 YAML 解析失败，跳过: ${file}`);
            continue;
        }

        const data = parsed.data;
        // Strip out date prefixes like 2025-12-30_
        const cleanFileName = fileNameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}_/, '');
        const normFileName = normalizeTitle(cleanFileName);
        const normTitle = data.title ? normalizeTitle(data.title) : normFileName;

        // 在 JSON 中寻找匹配项
        const match = coversData.find(c => {
            const normC = normalizeTitle(c.title);
            const isMatch = isTitleMatch(normC, normFileName) || isTitleMatch(normC, normTitle);
            if (isMatch) {
                console.log(`\n✅ FOUND MATCH:\n  MD File: ${normFileName}\n  JSON Title: ${normC}`);
            }
            return isMatch;
        });

        if (match) {
            matchedCount++;

            // 如果已有 cover_image，判断是否需要覆盖
            if (!data.cover_image) {
                // 读取原始文件，手动修改 frontmatter 以保留 Obsidian 的特殊语法
                const fmMatch = fileContent.match(/^(---[\s\S]*?\r?\n)---/);
                if (fmMatch) {
                    const originalFm = fmMatch[1];
                    const newFm = originalFm + `cover_image: "${match.coverUrl}"\n`;
                    const newContent = fileContent.replace(fmMatch[1], newFm);

                    fs.writeFileSync(filePath, newContent, 'utf-8');
                    updatedCount++;
                    console.log(`  🖼️  已更新封面: ${file}`);
                }
            } else {
                console.log(`  ⏭️  已有封面，跳过: ${file}`);
            }
        }
    }

    console.log(`\n📊 统计摘要：`);
    console.log(`   - 扫描文章总数: ${files.length}`);
    console.log(`   - 成功匹配封面: ${matchedCount}`);
    console.log(`   - 实际写入更新: ${updatedCount}`);

    if (updatedCount > 0) {
        console.log(`\n🎉 更新完成！请运行 \`node scripts/sync-articles.js\` 重新同步数据以获取封面图片。`);
    } else {
        console.log(`\n👍 没有需要更新的文件。`);
    }
}

main().catch(console.error);
