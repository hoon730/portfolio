import { useState, useEffect, useRef } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  keyframes,
} from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import Header from "./components/common/Header";
import Home from "./sections/Home";
import About from "./sections/About";
import Skill from "./sections/Skill";
import Work from "./sections/Work";
import Contact from "./sections/Contact";

const GlobalsStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ul, li {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    input {
    border: none;
    transition: all 0.3s;
  }

  input::-moz-placeholder {
    opacity: 1;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  input::placeholder {
    opacity: 1;
    transition: all 0.3s;
  }

  input:focus {
    outline: none;
  }

  input:focus::-moz-placeholder {
    opacity: 0;
  }

  input:focus::placeholder {
    opacity: 0;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
  }

    body {
      /* background: ${(props) => props.theme.bgColor}; */
      background: #F0F0F0;
      font-family: "Libre Franklin", sans-serif;
      /* font-family: "Archivo Narrow", sans-serif; */
      /* font-family: "Libre Barcode 39", system-ui; */
      /* font-family: "Libre Barcode 128", system-ui; */
      /* font-family: "Libre Barcode 128 Text", system-ui;/ */
      /* font-family: "Fira Code", monospace; */
      /* font-family: "PT Mono", monospace; */
      /* font-family: "Libre Barcode 39 Text", serif; */
      &::-webkit-scrollbar {
      display: none;
      }
    }
  }
`;

const ShowingCursor = keyframes`
  0% {
    cursor: none;
  }
  95%{
    cursor: none;
  }
  100%{
    cursor: auto;
  }
`;

const Scanning = keyframes`
  0% {
    opacity: 1;
    background: url("/img/pjh2.png") center/cover no-repeat;
  }
  80%{
    opacity: 1;
  }
  100%{
    opacity: 0;
    display: none;
  }
`;

const Cursor = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: ${({ $isMobile }) =>
    $isMobile ? "transparent" : "url('/img/pjh.png') center/cover no-repeat"};
  z-index: 100;
  pointer-events: none;
  transform: translate(-50%, -50%);

  &.active {
    animation: ${Scanning} 1s linear both;
  }

  @media (max-width: 768px) {
    &.active {
      animation: none;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: none;

  &.active {
    animation: ${ShowingCursor} 1s linear both;
  }

  & section {
    width: 100%;
    height: 100vh;
    margin-bottom: 300px;

    &:nth-child(4) {
      height: auto;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .inner {
    width: 1280px;
    height: 100%;
    margin: 0 auto;

    @media (max-width: 1280px) {
      width: 100%;
      padding: 0 30px;
    }

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }
`;

const App = () => {
  const [barcodeClick, setBarcodeClick] = useState(false);
  const [projectClick, setProjectClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };

      const cursor = document.getElementById("cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (barcodeClick) {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
  }, [barcodeClick]);

  useEffect(() => {
    if (window.innerWidth < 769) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalsStyle />
        <Wrapper className={barcodeClick ? "active" : ""}>
          <Cursor
            id="cursor"
            className={barcodeClick ? "active" : ""}
            $isMobile={isMobile}
          />
          <Header isClick={barcodeClick} projectClick={projectClick} />
          <Home barcodeClick={barcodeClick} onClick={setBarcodeClick} />
          <About />
          <Skill />
          <Work
            setBarcodeClick={setBarcodeClick}
            setProjectClick={setProjectClick}
          />
          <Contact />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
