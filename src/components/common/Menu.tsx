import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

const Menu = () => {
  return (
    <Container>
      <div>ABOUT</div>
      <div>SKILL</div>
      <div>WORK</div>
      <div>CONTACT</div>
    </Container>
  );
};

export default Menu;
