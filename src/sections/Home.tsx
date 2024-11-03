import React from "react";
import styled from "styled-components";
import Header from "../components/home/Header";

import { BsQrCode } from "react-icons/bs";

const Container = styled.section`
  position: relative;
  z-index: 1;
`;

const Inner = styled.div``;

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-family: "PT Mono", monospace;
  letter-spacing: 1px;
  margin-bottom: 110px;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 70px;
`;

const Date = styled.span`
  letter-spacing: 1px;
`;

const Category = styled.span`
  letter-spacing: 1px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 80px;

  &::before {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${(props) => props.theme.fontColor};
  }

  span {
    display: flex;
    align-items: center;
    font: 500 248px/210px "Archivo Narrow", sans-serif;
  }
`;

const NameLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameRight = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    position: relative;
    height: 210px;
    svg {
      position: absolute;
      top: 22px;
      right: 0;
      font-size: 130px;
    }
  }
`;

const BarcodeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
`;

const Text = styled.span`
  font-family: "PT Mono", monospace;
  font-size: ${(props) => props.theme.fsExtraLarge};
  font-weight: 300;
  letter-spacing: 1px;
`;
const Barcode = styled.span`
  font-size: 150px;
  font-family: "Libre Barcode 39", system-ui;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <Inner className="inner">
        <Title>FRONTEND DEVELOPER</Title>
        <DateBox>
          <Date>DATE : 2024-12-09</Date>
          <Category>CATEGORY : PORTFOLIO</Category>
        </DateBox>
        <Name>
          <NameLeft>
            <span>YEOM</span>
            <span>DONG</span>
          </NameLeft>
          <NameRight>
            <span>
              <BsQrCode />
            </span>
            <span>HOON</span>
          </NameRight>
        </Name>
        <BarcodeBox>
          <Text>A SELF-HELP PORTFOLIO</Text>
          <Barcode>donghoon</Barcode>
        </BarcodeBox>
      </Inner>
    </Container>
  );
};

export default Home;
