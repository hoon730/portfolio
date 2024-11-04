import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 60px;
`;

const Date = styled.span`
  letter-spacing: 1px;
`;

const Category = styled.span`
  letter-spacing: 1px;
`;

const DateBox = () => {
  return (
    <Container>
      <Date>DATE : 2024-12-09</Date>
      <Category>CATEGORY : PORTFOLIO</Category>
    </Container>
  );
};

export default DateBox;
