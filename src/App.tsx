import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
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
      /* font-family: "Fira Code", monospace; */
      /* font-family: "PT Mono", monospace; */
    }
  }

`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & section {
    width: 100%;
    height: 100vh;
    margin-bottom: 500px;
  }

  .inner {
    width: 100%;
    height: 100%;
  }
`;

const Receipt = styled.div`
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  background: #fff;
`;

const App = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalsStyle />
        <Wrapper>
          <Receipt>
            <Home />
            <About />
            <Skill />
            <Work />
            <Contact />
          </Receipt>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
