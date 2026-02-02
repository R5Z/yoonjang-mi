import fm from "front-matter";

// content/posts의 모든 마크다운 파일 import
const postFiles = import.meta.glob('../content/posts/*.md', { 
  query: '?raw', 
  eager: true 
});

const processPost = (path, rawContent) => {
  if (!rawContent) return null;

  try {
    // 파일명 추출하여 id로
    const id = path.split('/').pop().replace('.md', '');
    const { attributes, body } = fm(rawContent);
    
    return {
      id,
      title: attributes.title,
      date: attributes.date, 
      imgUrl: attributes.imgUrl,
      // 태그가 문자열로 들어올 경우 쉼표로 분리하여 배열로
      tags: attributes.tags ? attributes.tags.split(',').map(t => t.trim()) : [],
      category: attributes.category,
      content: body,
    };
  } catch (e) {
    console.error(`Path: ${path} - 파싱 에러:`, e);
    return null;
  }
};

// 데이터를 날짜 최신순으로 정렬
export const postsData = Object.entries(postFiles)
  .map(([path, content]) => processPost(path, content.default || content))
  .filter(Boolean)
  .sort((a, b) => {
    const dateA = new Date(a.date.replace(/\. /g, '-'));
    const dateB = new Date(b.date.replace(/\. /g, '-'));
    return dateB - dateA; // 내림차순(최신순) 정렬
  });

console.log("데이터 처리 및 날짜순 정렬 완료:", postsData);