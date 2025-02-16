import { Dispatch, SetStateAction, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { projectData } from "../../utils";

import gsap from "gsap";
import { CSSPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { IoClose } from "react-icons/io5";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const roll = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const show = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
`;

const Background = styled.div<{ $isclick: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  display: flex;
  background: #f0f0f0;

  &.active {
    animation: ${roll} 0.5s 0.3s ease-out both;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease-out;
  margin-bottom: 10px;

  svg {
    font-size: 2.5rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 0%;
  padding: 12vh 50px;
  display: flex;
  justify-content: space-between;
  transform-origin: top top;

  &.active {
    animation: ${show} 0.5s 1s ease-out both;
  }

  @media (max-width: 768px) {
    padding: 10vh 20px;
    flex-direction: column;
    gap: 30px;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 20px;
  }
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
  margin-bottom: 35px;

  span:last-child {
    margin-top: 6px;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 8.3333vw;
    padding-bottom: 5px;
    letter-spacing: 5px;

    span:last-child {
      margin-top: 0.7813vw;
      font-size: 3.6458vw;
    }
  }
`;
const Category = styled.div`
  span {
    padding: 0 5px;
    font-size: ${(props) => props.theme.fsExtraLarge};
    font-weight: bold;
    border: 2px solid ${(props) => props.theme.fontColor};
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 3px 3px;
    }
  }

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fsMedium};
  }
`;

const Contents = styled.div``;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 65px;

  & > div {
    display: flex;
  }

  span {
    width: 200px;
    &:first-child {
      width: 100px;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    gap: 5px;
    margin-bottom: 40px;
  }
`;

const Date = styled.div``;
const Platform = styled.div``;
const Assignment = styled.div``;

const SkillStack = styled.div`
  font-size: ${(props) => props.theme.fsMedium};
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

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const Summary = styled.p`
  font: 300 ${(props) => props.theme.fsMedium} / normal "Pretendard-Regular";

  @media (max-width: 768px) {
    font: 300 ${(props) => props.theme.fsMedium} / normal "Pretendard-Regular";
  }

  @media (max-width: 430px) {
    font: 300 ${(props) => props.theme.fsRegular} / normal "Pretendard-Regular";
  }
`;
const ProjectImgBox = styled.div`
  width: 100%;
  height: 70%;
  background: #fff;
`;
const ProjectImg = styled.img``;

interface ReceiptProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedIdx: number | null;
  setBarcodeClick: (value: boolean) => void;
  setProjectClick: (value: boolean) => void;
}

const Receipt = ({
  isOpen,
  setIsOpen,
  selectedIdx,
  setBarcodeClick,
  setProjectClick,
}: ReceiptProps) => {
  const closeRef = useRef<HTMLDivElement>(null);

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

  const startRotating = () => {
    gsap.to(closeRef.current, {
      rotate: 90,
      transformOrigin: "50% 50%",
      duration: 0.5,
      ease: "power4.out",
    });
  };

  const endRotating = () => {
    gsap.to(closeRef.current, {
      rotate: -90,
      transformOrigin: "50% 50%",
      duration: 0.5,
      ease: "power1.out",
    });
  };

  return (
    <Background
      $isclick={isOpen}
      className={isOpen ? "active" : ""}
      onClick={() => setBarcodeClick(true)}
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
                <Category>
                  <span>Visist Website</span>
                </Category>
              </Title>
              <Contents>
                <Desc>
                  <Date>
                    <span>Date </span>
                    <span>{project.date}</span>
                  </Date>
                  <Platform>
                    <span>Category </span>
                    <span>{project.platform}</span>
                  </Platform>
                  <Assignment>
                    <span>Part </span>
                    <span>{project.assignment}</span>
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
              <ProjectImgBox>
                <ProjectImg />
              </ProjectImgBox>
              <Summary>{project.summary}</Summary>
            </RightBox>
          </Container>
        ))}
      <Close
        ref={closeRef}
        onMouseEnter={startRotating}
        onMouseLeave={endRotating}
        onClick={() => {
          setIsOpen(false);
          setBarcodeClick(false);
          setProjectClick(false);
        }}
      >
        <IoClose />
      </Close>
    </Background>
  );
};

export default Receipt;
