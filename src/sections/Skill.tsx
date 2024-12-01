import { useRef, useEffect } from "react";
import styled from "styled-components";
import { frontendData } from "../utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.section`
  height: 300vh !important;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font: bold italic 36px "Archivo Narrow", sans-serif;
  }
`;

const SkillBox = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  perspective: 8000px;
  transition: transform 0.3s ease-out;

`;

const LeftText = styled.div`
  left: 0;
`;
const RightText = styled.div`
  right: 0;
`;

const Frontend = styled.div<{ rotate: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  transform: ${(props) => props.rotate};
  background: ${(props) => props.theme.bgColor};
  backface-visibility: hidden;
`;

const Wrapper = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  font-weight: 900;
  font-size: 4rem;
  padding-bottom: 7px;
  letter-spacing: 7px;
  border-top: 3px solid ${(props) => props.theme.fontColor};
  border-bottom: 3px solid ${(props) => props.theme.fontColor};

  span:last-child {
    margin-top: 6px;
    font-size: 1.8rem;
  }
`;
const Stacks = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 13px;
  grid-column-gap: 8px;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ImgBox = styled.div`
  width: 79px;
  height: 79px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.fontColor};
  border-radius: 5px;
`;

const StackImg = styled.img``;

const StackName = styled.span`
  font-size: ${(props) => props.theme.fsSmall};
  font-weight: 550;
  text-align: center;
`;

const Skill = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skill",
        start: "center center",
        end: "bottom",
        pin: true,
        scrub: 1.5,
        markers: true,
      },
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        // 스크롤에 따라 정육면체를 부드럽게 회전
        const scrollY = window.scrollY;
        const rotationY = scrollY * 0.2; // Y축 회전 각도
        boxRef.current.style.transform = `rotateY(${rotationY}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container className="skill">
      <Inner className="inner">
        <LeftText className="text">SKILLSTACK</LeftText>
        <SkillBox ref={boxRef}>
          <Frontend rotate="rotateY(0deg) translateZ(250px)">
            <Wrapper>
              <Title>
                <span>FRONTEND</span>
                <span>®</span>
              </Title>
              <Stacks>
                {frontendData.map((data, idx) => (
                  <Stack key={idx}>
                    <ImgBox>
                      <StackImg src={data.imgPath} />
                    </ImgBox>
                    <StackName>{data.name}</StackName>
                  </Stack>
                ))}
              </Stacks>
            </Wrapper>
          </Frontend>
          <Frontend rotate="rotateY(90deg) translateZ(250px)">
            <Wrapper>
              <Title>
                <span>FRONTEND</span>
                <span>®</span>
              </Title>
              <Stacks>
                {frontendData.map((data, idx) => (
                  <Stack key={idx}>
                    <ImgBox>
                      <StackImg src={data.imgPath} />
                    </ImgBox>
                    <StackName>{data.name}</StackName>
                  </Stack>
                ))}
              </Stacks>
            </Wrapper>
          </Frontend>
          <Frontend rotate="rotateY(180deg) translateZ(250px)">
            <Wrapper>
              <Title>
                <span>FRONTEND</span>
                <span>®</span>
              </Title>
              <Stacks>
                {frontendData.map((data, idx) => (
                  <Stack key={idx}>
                    <ImgBox>
                      <StackImg src={data.imgPath} />
                    </ImgBox>
                    <StackName>{data.name}</StackName>
                  </Stack>
                ))}
              </Stacks>
            </Wrapper>
          </Frontend>
          <Frontend rotate="rotateY(-90deg) translateZ(250px)">
            <Wrapper>
              <Title>
                <span>FRONTEND</span>
                <span>®</span>
              </Title>
              <Stacks>
                {frontendData.map((data, idx) => (
                  <Stack key={idx}>
                    <ImgBox>
                      <StackImg src={data.imgPath} />
                    </ImgBox>
                    <StackName>{data.name}</StackName>
                  </Stack>
                ))}
              </Stacks>
            </Wrapper>
          </Frontend>
        </SkillBox>
        <RightText className="text">FRONTEND</RightText>
      </Inner>
    </Container>
  );
};

export default Skill;
