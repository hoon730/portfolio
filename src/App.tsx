import React, { useState, useEffect, useRef } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  keyframes,
} from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import Home from "./sections/Home";
import About from "./sections/About";
import Skill from "./sections/Skill";
import Work from "./sections/Work";
import Contact from "./sections/Contact";

const GlobalsStyle = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ul, li {
      list-style: none;
    }

    a {
      text-decoration: none;
    }

    input {
    border: none;
    /* padding-left: 10px; */
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
      background: ${(props) => props.theme.bgColor};
      /* background: #F0F0F0; */
      font-family: "Libre Franklin", sans-serif;
      /* font-family: "Archivo Narrow", sans-serif; */
      /* font-family: "Libre Barcode 39", system-ui; */
      /* font-family: "Libre Barcode 128", system-ui; */
      /* font-family: "Fira Code", monospace; */
      /* font-family: "PT Mono", monospace; */
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

const Cursor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: url("/img/pjh.png") center/cover no-repeat;
  z-index: 100;
  pointer-events: none;
  transform: translate(-50%, -50%);

  &.active {
    animation: ${Scanning} 1s linear both;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* cursor: none;

  &.active {
    animation: ${ShowingCursor} 1s linear both;
  } */

  & section {
    width: 100%;
    height: 100vh;
    margin-bottom: 500px;
  }

  .inner {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
  }
`;

// const Receipt = styled.div`
//   width: 1280px;
//   height: 100%;
//   margin: 0 auto;
// `;

const App = () => {
  const [barcodeClick, setBarcodeClick] = useState(false);
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

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalsStyle />
        <Wrapper className={barcodeClick ? "active" : ""}>
          <Cursor id="cursor" />
          <Home barcodeClick={barcodeClick} onClick={setBarcodeClick} />
          <About />
          <Skill />
          <Work />
          <Contact />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
