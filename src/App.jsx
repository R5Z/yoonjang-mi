import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// 임시 페이지들
const Home = ({ posts }) => (
  <div className="container">
    {posts.map((post) => (
      <article key={post.id} className="post-row">
        <h1 className="post-title">{post.title}</h1>
        <img src={post.imgUrl} alt="" className="post-preview-img" />
        
        <div className="post-meta">
          <span className="date">{post.date}</span>
          <span className="category">{post.category}</span>
        </div>
      </article>
    ))}
  </div>
);

const About = () => (
  <div className="container">
    <h1 className="page-title">About</h1>
    <div className="page-content">
      <p>soon</p>
    </div>
  </div>
);

const Contact = () => (
<div className="container">
    <h1 className="page-title">Contact</h1>
    <div className="page-content">
      <p>hey@yoonjang.me</p>
    </div>
  </div>
);

function App() {
  const posts = [
    { id: 1, title: "블로그도 합니다.", date: "6월 28, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=1" },
    { id: 2, title: "작업기를 써볼까 합니다.", date: "6월 20, 2023", category: "dev", imgUrl: "https://picsum.photos/400/500?grayscale&random=2" },
    { id: 3, title: "테스트입니다.", date: "6월 15, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=3" },
    { id: 1, title: "블로그도 합니다.", date: "6월 28, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=1" },
    { id: 2, title: "작업기를 써볼까 합니다.", date: "6월 20, 2023", category: "dev", imgUrl: "https://picsum.photos/400/500?grayscale&random=2" },
    { id: 3, title: "테스트입니다.", date: "6월 15, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=3" },
    { id: 1, title: "블로그도 합니다.", date: "6월 28, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=1" },
    { id: 2, title: "작업기를 써볼까 합니다.", date: "6월 20, 2023", category: "dev", imgUrl: "https://picsum.photos/400/500?grayscale&random=2" },
    { id: 3, title: "테스트입니다.", date: "6월 15, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=3" },
  ];

  return (
    <Router>
      <div className="app-container">
        {/* 상단 헤더 */}
        <header className="main-header">
          <div className="header-inner">
            <Link to="/" className="logo-text">yoonjangmi</Link>
            <nav className="main-nav">
              <Link to="/about">about</Link>
              <Link to="/">post</Link>
              <Link to="/contact">contact</Link>
            </nav>
          </div>
        </header>

        {/* 중앙 콘텐츠 */}
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* 하단 푸터 */}
        <footer className="main-footer">
          <div className="footer-inner">
            <span className="copyright">2026 © Jangmi Yoon</span>
            <div className="footer-links">
              {/* 추가하고 싶은 링크가 있다면 여기에 */}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;