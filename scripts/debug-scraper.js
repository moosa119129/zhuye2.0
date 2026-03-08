const { execSync } = require('child_process');
const CONFIG = {
    scraperDir: 'D:\\MMDBB_vault\\.agent\\skills\\wechat-article-to-markdown',
    pythonExe: 'D:\\MMDBB_vault\\.agent\\skills\\wechat-article-to-markdown\\venv\\Scripts\\python.exe',
};
const url = 'https://mp.weixin.qq.com/s/Y7dyRC7CJ09miHWU6LBzBA';

try {
    console.log('--- START SCRAPER ---');
    const out = execSync(`"${CONFIG.pythonExe}" wechat_article_to_markdown.py "${url}"`, {
        cwd: CONFIG.scraperDir,
        encoding: 'utf8',
        stdio: 'pipe'
    });
    console.log('STDOUT:');
    console.log(out);
    console.log('--- END SCRAPER ---');
} catch (err) {
    console.log('--- SCRAPER FAILED ---');
    console.log('STATUS:', err.status);
    console.log('STDOUT:', err.stdout);
    console.log('STDERR:', err.stderr);
}
