import { Link } from "react-router-dom";

const Logo = () => {
  // 첫 번째 아스키 아트 디자인 적용
  const asciiArt = `
'          '
|\\\\\\\\  ////|
|  \\\\\\V/// |
|   |===   |
|   | y |  |
|   | j |  |
|   | m | /
 \\  |===|/
  \\ --- /
  `.trim();

  return (
    <Link to="/" className="logo-container">
      <pre className="ascii-logo">
        {asciiArt}
      </pre>
    </Link>
  );
};

export default Logo;