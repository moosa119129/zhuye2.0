/**
 * 微信公众号后台历史封面提取脚本 (运行在 Chrome 开发者工具 Console 中)
 * 
 * 使用方法：
 * 1. 在电脑端 Chrome 浏览器登录微信公众号后台 (mp.weixin.qq.com)。
 * 2. 在左侧菜单点击“内容分享” -> “发表记录” (或者“图文素材”)，进入已发表文章列表。
 * 3. 一直向下滚动页面，让尽可能多的历史文章加载出来。
 * 4. 按 F12 打开开发者工具，切换到 Console (控制台) 面板。
 * 5. 复制并粘贴以下所有代码，按回车执行。
 * 6. 执行后，会在页面上弹出一个包含 JSON 数据的文本框，复制里面的所有内容，
 *    保存到项目根目录下的 `wechat-covers.json` 文件中。
 */

(function () {
    console.log("开始提取文章封面...");

    // 获取所有的文章卡片
    // 注意：微信后台的 DOM 结构可能会变，这里使用的是常见的类名
    const articles = [];
    // 选择尽可能广的可能包含封面的容器元素
    const items = document.querySelectorAll('.weui-desktop-mass-appmsg, .weui-desktop-appmsg, .appmsg_item');

    items.forEach(item => {
        // 尝试获取标题
        const titleEl = item.querySelector('.weui-desktop-mass-appmsg__title, .weui-desktop-appmsg__title, .appmsg_title a');
        if (!titleEl) return;
        const title = titleEl.innerText.trim();

        // 尝试获取封面图片
        const coverEl = item.querySelector('.weui-desktop-mass-appmsg__thumb, .weui-desktop-mass-appmsg__cover, .weui-desktop-appmsg__cover, .appmsg_thumb');
        let coverUrl = '';

        if (coverEl) {
            // 很多时候封面是内联的 background-image格式： url("https://...")
            const bgImage = window.getComputedStyle(coverEl).backgroundImage;
            if (bgImage && bgImage !== 'none') {
                const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
                if (match && match[1]) {
                    coverUrl = match[1];
                }
            } else if (coverEl.tagName && coverEl.tagName.toLowerCase() === 'img') {
                coverUrl = coverEl.src;
            }
        }

        if (title && coverUrl) {
            articles.push({ title, coverUrl });
        }
    });

    // 去重
    const uniqueMap = new Map();
    articles.forEach(a => uniqueMap.set(a.title, a.coverUrl));

    const result = Array.from(uniqueMap.entries()).map(([title, coverUrl]) => ({ title, coverUrl }));

    console.log(`✅ 成功提取了 ${result.length} 篇文章的封面！`);

    const jsonStr = JSON.stringify(result, null, 2);

    // 创建一个悬浮层显示结果以便用户复制
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '10%';
    overlay.style.left = '10%';
    overlay.style.width = '80%';
    overlay.style.height = '80%';
    overlay.style.backgroundColor = 'white';
    overlay.style.zIndex = '999999';
    overlay.style.padding = '20px';
    overlay.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';

    const header = document.createElement('h2');
    header.innerHTML = `提取成功！共 ${result.length} 条。<br>请全选并复制以下内容到 <b><code>wechat-covers.json</code></b> 中`;
    overlay.appendChild(header);

    const textarea = document.createElement('textarea');
    textarea.value = jsonStr;
    textarea.style.flex = '1';
    textarea.style.width = '100%';
    textarea.style.marginTop = '10px';
    textarea.style.fontFamily = 'monospace';
    overlay.appendChild(textarea);

    const btnContainer = document.createElement('div');
    btnContainer.style.marginTop = '10px';
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '10px';

    const copyBtn = document.createElement('button');
    copyBtn.innerText = '一键复制 JSON';
    copyBtn.style.padding = '10px';
    copyBtn.style.cursor = 'pointer';
    copyBtn.onclick = () => {
        textarea.select();
        document.execCommand('copy');
        alert("已复制到剪贴板！");
    };
    btnContainer.appendChild(copyBtn);

    const closeBtn = document.createElement('button');
    closeBtn.innerText = '关闭弹窗';
    closeBtn.style.padding = '10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => document.body.removeChild(overlay);
    btnContainer.appendChild(closeBtn);

    overlay.appendChild(btnContainer);

    document.body.appendChild(overlay);

    try {
        textarea.select();
        document.execCommand('copy');
        console.log("JSON 已自动复制到剪贴板！您可以新建并粘贴到 wechat-covers.json。");
    } catch (err) {
        console.log("自动复制失败，请点击弹窗上的复制按钮。");
    }
})();
