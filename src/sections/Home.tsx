import React, { useRef } from "react";
import styled from "styled-components";
import Header from "../components/home/Header";
import { BsQrCode } from "react-icons/bs";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Container = styled.section`
  position: relative;
  z-index: 1;
  cursor: url("/img/scanner_black2.png"), progress;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 27px 0;
  font-family: "PT Mono", monospace;
  letter-spacing: 1px;
  margin-bottom: 80px;
  overflow: hidden;
  span {
    transform: translateY(100%);
  }
`;

const DateBox = styled.div`
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

const TextBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
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

const BarcodeBox = styled.div`
  position: relative;
  overflow: hidden;
`;

const Barcode = styled.span`
  font-size: 150px;
  font-family: "Libre Barcode 39", system-ui;
`;

// 레이저 스타일
const Laser = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 7px;
  background: rgba(255, 89, 0, 0.65);
  box-shadow: 0 0 14px rgba(255, 0, 0, 1);
  display: none;
`;

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, {});
  });

  return (
    <Container>
      <Header />
      <Inner ref={containerRef} className="inner">
        <Title className="title">
          <span>FRONTEND DEVELOPER</span>
        </Title>
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
        <TextBox>
          <Text>A SELF-HELP PORTFOLIO</Text>
          <BarcodeBox>
            <Barcode>donghoon</Barcode>
            <Laser />
          </BarcodeBox>
        </TextBox>
      </Inner>
    </Container>
  );
};

export default Home;
