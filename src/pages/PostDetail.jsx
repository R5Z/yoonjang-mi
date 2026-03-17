import { useState, useEffect } from 'react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from 'react-router-dom';
import { postsData } from '../data/postsData';
import Comments from '../components/Comments';
import { supabase } from '../supabaseClient';
import { Helmet } from 'react-helmet-async';

const PostDetail = () => {
  const { postId } = useParams();
  const post = postsData.find((p) => String(p.id) === String(postId));

  const [stats, setStats] = useState({ views: 0, likes: 0 });

  useEffect(() => {
    const currentPostId = post?.id;
    if (!currentPostId) return;

    let isMounted = true;

    const updateAndFetchStats = async () => {
      try {
        await supabase.rpc('increment_views', { post_id: currentPostId });
        
        const { data } = await supabase
          .from('post_stats')
          .select('views, likes')
          .eq('id', currentPostId)
          .single();
        
        if (isMounted && data) {
          setStats(data);
        }
      } catch (error) {
        console.error("Stats error:", error);
      }
    };

    updateAndFetchStats();

    return () => {
      isMounted = false;
    };
  }, [post?.id]);

  const handleLike = async () => {
    await supabase.rpc('increment_likes', { post_id: post.id });
    setStats(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  if (!post) return <div className="container">포스트를 찾을 수 없습니다.</div>;

  // 메타 설명(Description) - 본문 텍스트
  const description = post.content ? post.content.substring(0, 150).replace(/[#*`]/g, '') : "";

  return (
    <div className="container">
      {/* 브라우저 탭 이름 및 메타 태그 동적 설정 */}
      <Helmet>
        <title>{post.title} | Jangmi's Blog</title>
        <meta name="description" content={description} />
        
        {/* SNS 공유 시 표시될 정보 (Open Graph) */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        {post.imgUrl && <meta property="og:image" content={post.imgUrl} />}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* 상단 메타 정보: 날짜, 조회수, 좋아요 */}
      <div className="post-meta" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span className="date">
          {post.date}
          <span style={{ marginLeft: '10px' }}>Views {stats.views}</span>
          <span
            onClick={handleLike}
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '0.8rem' }}>· ♥ </span>
            Likes {stats.likes}
          </span>
        </span>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="category">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h1 className="page-title" style={{ marginBottom: '60px' }}>
        {post.title}
      </h1>
      
      <div className="post-content">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <Comments postId={postId} />
    </div>
  );
};

export default PostDetail;