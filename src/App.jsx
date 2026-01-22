import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Logo from "./components/Logo";
import "./App.css";

// 1. 페이지 컴포넌트들
const Home = ({ posts }) => (
  <div className="container">
    {posts.map((post, index) => (
      // id가 중복될 수 있으므로 key에 index를 조합하거나 고유 ID를 사용해야 합니다.
      <article key={`${post.id}-${index}`} className="post-row">
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

// 2. 메인 App 컴포넌트 (한 번만 선언)
function App() {
  const posts = [
    { id: 1, title: "블로그도 합니다.", date: "6월 28, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=1" },
    { id: 2, title: "작업기를 써볼까 합니다.", date: "6월 20, 2023", category: "dev", imgUrl: "https://picsum.photos/400/500?grayscale&random=2" },
    { id: 3, title: "테스트입니다.", date: "6월 15, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=3" },
    { id: 4, title: "블로그도 합니다.", date: "6월 28, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=4" },
    { id: 5, title: "작업기를 써볼까 합니다.", date: "6월 20, 2023", category: "dev", imgUrl: "https://picsum.photos/400/500?grayscale&random=5" },
    { id: 6, title: "테스트입니다.", date: "6월 15, 2023", category: "blog", imgUrl: "https://picsum.photos/400/500?grayscale&random=6" },
  ];

  return (
    <Router>
      <header className="main-header">
        <div className="header-inner">
          <Logo /> 
          <nav className="main-nav">
            <Link to="/about">about</Link>
            <Link to="/">post</Link>
            <Link to="/contact">contact</Link>
          </nav>
        </div>
      </header>

      <div className="content-area">
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <footer className="main-footer">
        <div className="footer-inner">
          <span className="copyright">2026 © Jangmi Yoon</span>
        </div>
      </footer>
    </Router>
  );
}

export default App;