const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://yoonjang.me'; 

// 고정 페이지 (홈, 포스트 목록 등)
const staticPages = ['', 'posts', 'about'];

// 동적 포스트 페이지 추출
const postDirectory = path.join(__dirname, '../content/posts');
const postFiles = fs.readdirSync(postDirectory);

const postPages = postFiles.map(fileName => {
  const content = fs.readFileSync(path.join(postDirectory, fileName), 'utf8');
  const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
  return slugMatch ? `post/${slugMatch[1]}` : `post/${fileName.replace('.md', '')}`;
});

const allPages = [...staticPages, ...postPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => `
    <url>
      <loc>${BASE_URL}/${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    </url>`)
    .join('')}
</urlset>`;

// public 폴더에 sitemap.xml 저장
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);

console.log('✅ sitemap.xml이 성공적으로 생성되었습니다!');