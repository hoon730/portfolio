import styled from "styled-components";

import { IoCloseCircleOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 300px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #64656b;
  /* background: #383941; */
  /* background: ${(props) => props.theme.bgColor}; */
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Top = styled.div`
  padding-top: 80px;
  ul {
    display: flex;
    gap: 15px;
    a {
      display: inline-block;
      padding: 0 10px;
      font: bold italic 2.3rem/1 "Archivo Narrow", sans-serif;
      letter-spacing: 1px;
      background: ${(props) => props.theme.fontColor};
      color: #f0f0f0;
    }
  }
`;

const Close = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  svg {
    font-size: 2.5rem;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h3 {
    font: bold 1rem/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
    color: #888;
  }
  ul {
    display: flex;
    gap: 20px;

    svg {
      font-size: 2rem;
    }
  }
`;

const Menu = () => {
  return (
    <Container>
      <Top>
        <ul>
          <li>
            <a href="#none">HOME</a>
          </li>
          <li>
            <a href="#none">ABOUT</a>
          </li>
          <li>
            <a href="#none">WORK</a>
          </li>
        </ul>
      </Top>
      <Bottom>
        <h3>Contact</h3>
        <ul>
          <li>
            <a href="#none">
              <CiMail />
            </a>
          </li>
          <li>
            <a href="#none">
              <IoLogoGithub />
            </a>
          </li>
          <li>
            <a href="#none">
              <CiMobile3 />
            </a>
          </li>
        </ul>
      </Bottom>
      <Close>
        <IoCloseCircleOutline />
      </Close>
    </Container>
  );
};

export default Menu;
