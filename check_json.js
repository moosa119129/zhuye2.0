const fs = require('fs');
try {
    const data = JSON.parse(fs.readFileSync('H:/antigravity/my_web_2.0/lib/articles-data.json', 'utf8'));
    const withCover = data.filter(d => Boolean(d.coverImage));
    console.log(`Total: ${data.length}, With Cover: ${withCover.length}`);
    if (withCover.length > 0) {
        console.log('Sample covers:', withCover.slice(0, 5).map(d => ({ title: d.title, cover: d.coverImage })));
    }
} catch (e) {
    console.error(e);
}
