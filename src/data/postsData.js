import fm from "front-matter";

// posts의 모든 마크다운 불러오기
const postFiles = import.meta.glob('../content/posts/*.md', { 
  query: '?raw', 
  eager: true 
});

const processPost = (path, rawContent) => {
  if (!rawContent) return null;

  try {
    // 파일 경로에서 파일명만 추출하여 ID로
    const id = path.split('/').pop().replace('.md', '');
    const parsed = fm(rawContent);
    
    return {
      id,
      ...parsed.attributes,
      content: parsed.body,
    };
  } catch (e) {
    console.error(`Path: ${path} - 파싱 에러:`, e);
    return null;
  }
};

export const postsData = Object.entries(postFiles)
  .map(([path, content]) => processPost(path, content.default || content))
  .filter(Boolean)
  .sort((a, b) => {
    // b(다음 아이템)의 날짜에서 a(현재 아이템)의 날짜를 빼서 내림차순(최신순) 정렬
    return new Date(b.date.replace(/\. /g, '-')) - new Date(a.date.replace(/\. /g, '-'));
  });

console.log("날짜순 정렬 완료:", postsData);