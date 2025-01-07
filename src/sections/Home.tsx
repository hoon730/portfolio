import styled, { keyframes } from "styled-components";
import { getFormattedDate } from "../utils";

import gsap from "gsap";
import { CSSPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const Container = styled.section`
  position: relative;
  z-index: 1;
  overflow: hidden;
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
  margin-bottom: 100px;
  overflow: hidden;

  .title {
    transform: translateY(100%);
  }

  @media (max-width: 768px) {
    margin-bottom: 70px;
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font: 500 18px/1 "PT Mono", monospace;
  letter-spacing: 1.5px;
  margin-bottom: 70px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
    font: 500 16px/1 "PT Mono", monospace;
  }

  @media (max-width: 430px) {
    font: 500 14px/1 "PT Mono", monospace;
    flex-direction: column;
  }
`;

const DateNow = styled.div`
  overflow: hidden;
  .date {
    transform: translateY(100%);
  }
`;

const Category = styled.div`
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

  @media (max-width: 1280px) {
    span {
      font: 500 19.375vw/16.4063vw "Archivo Narrow", sans-serif;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    span {
      font: 500 25.7813vw/20.8333vw "Archivo Narrow", sans-serif;
    }
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

  @media (max-width: 768px) {
    width: 100%;
    & > div:last-child {
      display: flex;
      justify-content: center;
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

  & > div:first-child span {
    position: relative;
    height: 210px;

    img {
      position: absolute;
      top: 15px;
      right: 0;
      width: 190px;
      height: 190px;
    }
  }

  span {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 1280px) {
    & > div:first-child span {
      height: 16.4063vw;

      img {
        position: absolute;
        top: 15px;
        right: 0;
        width: 14.8438vw;
        height: 14.8438vw;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column-reverse;
    & > div:first-child span {
      display: none;
    }
  }
`;

const BarBox = styled.div`
  overflow: hidden;
`;

const Bar = styled.hr`
  width: 100%;
  height: 8px;
  background: ${(props) => props.theme.fontColor};
  transform: translateY(110%);
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

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fsLarge};
    letter-spacing: 1.5px;
  }
`;

const BarcodeBox = styled.div`
  position: relative;
`;

const Barcode = styled.div`
  font-size: 150px;
  font-family: "Libre Barcode 39", system-ui;

  @media (max-width: 768px) {
    font-size: 19.5313vw;
  }
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
  /* background: rgba(255, 0, 0, 0.801); */
  background: #e55050;
  box-shadow: 0 0 14px rgba(255, 0, 0, 1);
  border-radius: 20%;
  opacity: 0;

  &.active {
    animation: ${Scanning} 1s linear both;
  }
`;

interface barcodeClickProps {
  barcodeClick: boolean;
  onClick: (state: boolean) => void;
}

const Home = ({ barcodeClick, onClick }: barcodeClickProps) => {
  const handleOnClick = () => {
    onClick(true);
  };

  useGSAP(() => {
    if (barcodeClick) {
      const tl1 = gsap.timeline();
      const targetArr = [
        ".title",
        ".date",
        ".category",
        ".yeom",
        ".dong",
        ".qrcode",
        ".hoon",
        ".bar",
      ];
      const yArr = [80, 60, 40, 20, 0];

      if (window.innerWidth > 430) {
        tl1.to(".text_box", {
          bottom: 0,
          duration: 1,
          delay: 1,
          ease: "power1.inOut",
        });
      } else {
        tl1.to(".text_box", {
          bottom: 35,
          duration: 1,
          delay: 1,
          ease: "power1.inOut",
        });
      }
      yArr.forEach((y, index) => {
        tl1.to(targetArr, {
          y,
          duration: 0.3,
          ease: "power1.inOut",
          delay: index === 0 ? 0.2 : 0,
        });
      });
    }
  }, [barcodeClick]);

  return (
    <Container>
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
            <Laser className={barcodeClick ? "active" : ""} />
          </BarcodeBox>
        </TextBox>
        <Title>
          <span className="title">FRONTEND DEVELOPER</span>
        </Title>
        <DateBox>
          <DateNow>
            <div className="date">DATE : {getFormattedDate(new Date())} </div>
          </DateNow>
          <Category>
            <div className="category">CATEGORY : PORTFOLIO</div>
          </Category>
        </DateBox>
        <Name>
          <NameLeft className="nameLeft">
            <div>
              <span className="yeom">YEOM</span>
            </div>
            <div>
              <span className="dong">DONG</span>
            </div>
          </NameLeft>
          <NameRight className="nameRight">
            <div>
              <span className="qrcode">
                <img src="/img/qr.jpeg" alt="qrcode" />
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
      </Inner>
    </Container>
  );
};

export default Home;
