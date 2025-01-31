import styled from "styled-components";

import { IoClose } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #7a7b83;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 30px;
`;

const Nav = styled.nav`
  padding-top: 70px;
  ul {
    display: flex;
    gap: 18px;
    padding: 10px 0;

    a {
      display: inline-block;
      padding: 0 10px;
      font: bold italic 2.2rem/1 "Archivo Narrow", sans-serif;
      letter-spacing: 1px;
      background: ${(props) => props.theme.fontColor};
      color: #f0f0f0;
    }
  }
`;

const Close = styled.div`
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 20px;
  svg {
    font-size: 2.5rem;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  h3 {
    font: bold 0.9rem/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
  }
  ul {
    display: flex;
    gap: 40px;

    svg {
      color: #f0f0f0;
      font-size: 1.9rem;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px 30px;
  background: #64656b;
  color: #f0f0f0;
  text-align: right;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
  return (
    <Container>
      <Top>
        <Nav>
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
        </Nav>
        <Contact>
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
        </Contact>
      </Top>
      <Bottom>
        <h3>Fontend Developer</h3>
        <Time>
          <span>2025-01-31</span>
          <span>13:31</span>
        </Time>
      </Bottom>
      <Close>
        <IoClose />
      </Close>
    </Container>
  );
};

export default Menu;
