import React from "react";
import { Dispatch, SetStateAction } from "react";
import styled, { keyframes } from "styled-components";
import { projectData } from "../../utils";

import gsap from "gsap";
import { CSSPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const roll = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const Background = styled.div<{ $isclick: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  display: flex;
  align-items: center;
  background: #f0f0f0;
  transform-origin: top top;
  z-index: 10;

  &.active {
    animation: ${roll} 0.5s 0.3s ease-out both;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 0;
  padding: 12vh 50px;
  display: flex;
  justify-content: space-between;
  transform-origin: top top;
  
  &.active {
    animation: ${roll} 0.5s 0.8s ease-out both;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div``;

const ProjectName = styled.div`
  display: flex;
  font-weight: 900;
  font-size: 4rem;
  padding-bottom: 7px;
  letter-spacing: 7px;
  border-top: 3px solid ${(props) => props.theme.fontColor};
  border-bottom: 3px solid ${(props) => props.theme.fontColor};
  margin-bottom: 45px;

  span:last-child {
    margin-top: 6px;
    font-size: 1.8rem;
  }
`;
const Category = styled.div`
  font-size: ${(props) => props.theme.fsExtraLarge};
  font-weight: bold;
`;

const Contents = styled.div``;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 65px;

  span {
    font-weight: bold;
  }
`;

const Date = styled.div``;
const Platform = styled.div``;
const Assignment = styled.div``;

const SkillStack = styled.div`
  h3 {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RightBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Summary = styled.div`
  font-size: ${(props) => props.theme.fsExtraLarge};
`;
const ProjectImgBox = styled.div`
  width: 100%;
  height: 70%;
  background: #fff;
`;
const ProjectImg = styled.img``;

const Barcode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px 0;

  h3 {
    font-size: ${(props) => props.theme.fsLarge};
  }

  span {
    text-align: center;
    font-size: 64px;
    font-family: "Libre Barcode 128", system-ui;
  }
`;

const Receipt = ({
  isOpen,
  setIsOpen,
  selectedIdx,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedIdx: number | null;
}) => {
  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      const yArr = [80, 60, 40, 20, 0];

      yArr.forEach((y, index) => {
        tl.to(".wrapper", {
          y,
          duration: 0.3,
          ease: "power1.inOut",
          delay: index === 0 ? 0.2 : 0,
        });
      });
    }
  }, [isOpen]);

  return (
    <Background
      $isclick={isOpen}
      onClick={() => setIsOpen(false)}
      className={isOpen ? "active" : ""}
    >
      {projectData
        .filter((project) => project.id === selectedIdx)
        .map((project) => (
          <Container key={project.id} className={isOpen ? "active" : ""}>
            <LeftBox>
              <Title>
                <ProjectName>
                  <span>{project.name}</span>
                  <span>®</span>
                </ProjectName>
                <Category>{project.category}</Category>
              </Title>
              <Contents>
                <Desc>
                  <Date>
                    <span>기간: </span>
                    {project.date}
                  </Date>
                  <Platform>
                    <span>유형: </span>
                    {project.platform}
                  </Platform>
                  <Assignment>
                    <span>담당 페이지: </span>
                    {project.assignment}
                  </Assignment>
                </Desc>
                <SkillStack>
                  <h3>SKILL STACK</h3>
                  <Skills>
                    {project.skillStack.map((skill) => (
                      <span>{skill}</span>
                    ))}
                  </Skills>
                </SkillStack>
              </Contents>
            </LeftBox>
            <RightBox>
              <Summary>{project.summary}</Summary>
              <ProjectImgBox>
                <ProjectImg />
              </ProjectImgBox>
            </RightBox>
          </Container>
        ))}
    </Background>
  );
};

export default Receipt;