import React from "react";
import styled from "styled-components";
import { BiMenuAltLeft } from "react-icons/bi";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 70px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font: bold 32px/1 "Archivo Narrow", sans-serif;
  padding: 0 5px;
  background: ${(props) => props.theme.fontColor};
  color: #f1f1f1;
`;

const Menu = styled.button`
  svg {
    font-size: ${(props) => props.theme.fsExtraLarge};
  }
`;



const Header = () => {
  return (
    <Container>
      <Logo>YDH</Logo>
      <Menu>
        <BiMenuAltLeft />
      </Menu>
    </Container>
  );
};

export default Header;
