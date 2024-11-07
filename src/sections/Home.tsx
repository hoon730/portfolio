import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/home/Header";
import { BsQrCode } from "react-icons/bs";

import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CSSPlugin);

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

const Container = styled.section`
  position: relative;
  z-index: 1;
  overflow: hidden;
  scroll: no;
  cursor: none;
  &.active {
    animation: ${ShowingCursor} 1s linear both;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
`;

const Scanner = keyframes`
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
  width: 70px;
  height: 100px;
  background: url("/img/pjh.png") center/cover no-repeat;
  z-index: 100;
  pointer-events: none;
  transform: translate(-50%, -50%);

  &.active {
    animation: ${Scanner} 1s linear both;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 27px 0;
  font-family: "PT Mono", monospace;
  letter-spacing: 1px;
  margin-bottom: 100px;
  overflow: hidden;

  .title {
    transform: translateY(100%);
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 70px;
`;

const Date = styled.div`
  letter-spacing: 1px;
  overflow: hidden;
  .date {
    transform: translateY(100%);
  }
`;

const Category = styled.div`
  letter-spacing: 1px;
  overflow: hidden;
  .category {
    transform: translateY(100%);
  }
`;

const Name = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  span {
    display: flex;
    align-items: center;
    font: 500 248px/210px "Archivo Narrow", sans-serif;
  }
`;

const NameLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  & > div {
    overflow: hidden;
    .yeom,
    .dong {
      transform: translateY(100%);
    }
  }
`;
const NameRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  & > div {
    overflow: hidden;
    .qrcode,
    .hoon {
      transform: translateY(100%);
    }
  }

  span:first-child {
    position: relative;
    height: 210px;
    svg {
      position: absolute;
      top: 22px;
      right: 15px;
      font-size: 130px;
    }
  }

  span:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

const BarBox = styled.div`
  overflow: hidden;
`;

const Bar = styled.hr`
  width: 100%;
  height: 8px;
  background: ${(props) => props.theme.fontColor};
  transform: translateY(100%);
`;

const TextBox = styled.div`
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
`;

const Text = styled.div`
  font-family: "PT Mono", monospace;
  font-size: ${(props) => props.theme.fsExtraLarge};
  font-weight: 300;
  letter-spacing: 1px;
  overflow: hidden;
`;

const BarcodeBox = styled.div`
  position: relative;
`;

const Barcode = styled.div`
  font-size: 150px;
  font-family: "Libre Barcode 39", system-ui;
`;

const Scanning = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Laser = styled.div`
  position: absolute;
  top: 30%;
  left: -5%;
  transform: translate(2%, -50%);
  width: 105%;
  height: 4px;
  background: rgba(255, 0, 0, 0.801);
  box-shadow: 0 0 14px rgba(255, 0, 0, 1);
  border-radius: 20%;
  opacity: 0;

  &.active {
    animation: ${Scanning} 1s linear both;
  }
`;

const Home = () => {
  const [isClick, setIsClick] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleOnClick = () => {
    setIsClick(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isClick]);

  useGSAP(() => {
    if (isClick) {
      const tl1 = gsap.timeline();
      tl1
        .to(".text_box", {
          bottom: 0,
          duration: 1,
          delay: 1,
          ease: "power1.inOut",
        })
        .to(
          [
            ".title",
            ".date",
            ".category",
            ".yeom",
            ".dong",
            ".qrcode",
            ".hoon",
            ".bar",
          ],
          { y: 80, duration: 0.3, ease: "power1.inOut", delay: 0.1 }
        )
        .to(
          [
            ".title",
            ".date",
            ".category",
            ".yeom",
            ".dong",
            ".qrcode",
            ".hoon",
            ".bar",
          ],
          { y: 60, duration: 0.3, ease: "power1.inOut", delay: 0.1 }
        )
        .to(
          [
            ".title",
            ".date",
            ".category",
            ".yeom",
            ".dong",
            ".qrcode",
            ".hoon",
            ".bar",
          ],
          { y: 40, duration: 0.3, ease: "power1.inOut", delay: 0.1 }
        )
        .to(
          [
            ".title",
            ".date",
            ".category",
            ".yeom",
            ".dong",
            ".qrcode",
            ".hoon",
            ".bar",
          ],
          { y: 20, duration: 0.3, ease: "power1.inOut", delay: 0.1 }
        )
        .to(
          [
            ".title",
            ".date",
            ".category",
            ".yeom",
            ".dong",
            ".qrcode",
            ".hoon",
            ".bar",
          ],
          { y: 0, duration: 0.3, ease: "power1.inOut", delay: 0.1 }
        );
    }
  }, [isClick]);

  return (
    <Container className={isClick ? "active" : ""}>
      <Cursor
        className={isClick ? "active" : ""}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <Header isClick={isClick} />
      <Inner className="inner">
        <TextBox className="text_box">
          <Text>
            <span className="portfolio">A SELF-HELP PORTFOLIO</span>
          </Text>
          <BarcodeBox>
            <Barcode>
              <span className="barcode" onClick={handleOnClick}>
                donghoon
              </span>
            </Barcode>
            <Laser className={isClick ? "active" : ""} />
          </BarcodeBox>
        </TextBox>
        <Title>
          <span className="title">FRONTEND DEVELOPER</span>
        </Title>
        <DateBox>
          <Date>
            <div className="date">DATE : 2024-12-09</div>
          </Date>
          <Category>
            <div className="category">CATEGORY : PORTFOLIO</div>
          </Category>
        </DateBox>
        <Name>
          <NameLeft>
            <div>
              <span className="yeom">YEOM</span>
            </div>
            <div>
              <span className="dong">DONG</span>
            </div>
          </NameLeft>
          <NameRight>
            <div>
              <span className="qrcode">
                <BsQrCode />
              </span>
            </div>
            <div>
              <span className="hoon">HOON</span>
            </div>
          </NameRight>
        </Name>
        <BarBox>
          <Bar className="bar" />
        </BarBox>
        {/* <TextBox className="text_box">
          <Text>
            <span className="portfolio">A SELF-HELP PORTFOLIO</span>
          </Text>
          <BarcodeBox>
            <Barcode>
              <span className="barcode" onClick={handleOnClick}>
                donghoon
              </span>
            </Barcode>
            <Laser className={isClick ? "active" : ""} />
          </BarcodeBox>
        </TextBox> */}
      </Inner>
    </Container>
  );
};

export default Home;
