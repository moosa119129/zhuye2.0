const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 批量导入微信文章脚本
 * 从 final_migration_list.txt 读取文章信息并依次调用 import-wechat.js
 */

const LIST_FILE = path.join(__dirname, '..', 'final_migration_list.txt');
const IMPORT_SCRIPT = path.join(__dirname, 'import-wechat.js');

async function runBatch() {
    if (!fs.existsSync(LIST_FILE)) {
        console.error('❌ 找不到待处理列表 final_migration_list.txt');
        process.exit(1);
    }

    const lines = fs.readFileSync(LIST_FILE, 'utf-8').split('\n').filter(line => line.trim());
    console.log(`🚀 准备批量处理 ${lines.length} 篇文章...`);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const parts = line.split('|').map(s => s.trim());
        if (parts.length < 3) continue;

        let [title, date, url] = parts;

        // 清理前缀
        if (date.includes('publish-date:')) {
            date = date.replace('publish-date:', '').trim();
        }
        if (url.includes('source:')) {
            url = url.replace('source:', '').trim();
        }

        console.log(`\n--------------------------------------------------`);
        console.log(`📦 [${i + 1}/${lines.length}] 正在处理: ${title}`);
        console.log(`📅 日期: ${date}`);
        console.log(`🔗 链接: ${url}`);

        if (!url || !url.startsWith('http') || url.includes('example')) {
            console.error(`❌ 跳过: 无效或占位 URL`);
            continue;
        }

        try {
            // 使用 execSync 串行执行，避免 Playwright 实例开太多导致资源耗尽
            execSync(`node "${IMPORT_SCRIPT}" "${url}" "${date}"`, {
                stdio: 'inherit',
                shell: true
            });
            console.log(`✅ [${i + 1}/${lines.length}] 处理完成: ${title}`);
        } catch (error) {
            console.error(`❌ [${i + 1}/${lines.length}] 处理失败: ${title}`);
            // 继续执行后续任务
        }

        // 适当延时，模拟人类操作，减少被反爬风险
        if (i < lines.length - 1) {
            const delay = 5000 + Math.random() * 5000;
            console.log(`💤 等待 ${Math.round(delay / 1000)}s 后处理下一篇...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    console.log(`\n==================================================`);
    console.log(`🎉 批量处理任务结束！`);
    console.log(`💡 提示：现在可以运行 npm run sync 来同步到网站数据库。`);
}

runBatch();
