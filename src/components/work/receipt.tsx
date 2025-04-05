import { Dispatch, SetStateAction, useEffect, useRef } from "react";
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
  40% {
    height: 100%;
  }
  60% {
    height: 100%;
  }
  100% {
    height: 0;
  }
`;

const show = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
    padding: var(--animation-padding);
  }
`;

const Background = styled.div<{ $isclick: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  display: flex;
  background: #f0f0f0;
  overflow: hidden;
  z-index: 10;
  cursor: auto;

  &.active {
    animation: ${roll} 1.5s 0.2s ease-out both;
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
  border-radius: 50%;

  svg {
    font-size: 2.5rem;
  }

  &:hover {
  }
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
  }
  @media (max-width: 430px) {
    svg {
      font-size: 2.2rem;
    }
  }
`;

const Container = styled.div`
  --animation-padding: 11vh 50px;

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0%;
  display: flex;
  justify-content: space-between;
  z-index: 9;
  background: #f0f0f0;
  cursor: auto;

  &.active {
    animation: ${show} 0.3s 0.8s ease-out both;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    --animation-padding: 8vh 50px;
  }
  @media (max-width: 430px) {
    gap: 60px;
    --animation-padding: 7vh 20px;
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
    justify-content: center;
    font-size: 6.3333vw;
    padding-bottom: 5px;
    margin-bottom: 20px;
    letter-spacing: 5px;

    span:last-child {
      margin-top: 0.5813vw;
      font-size: 2.6458vw;
    }
  }

  @media (max-width: 430px) {
    font-size: 8.3333vw;
    padding-bottom: 2px;
    margin: 15px;
    span:last-child {
      margin-top: 0.7813vw;
      font-size: 3vw;
    }
  }
`;
const VisitBtn = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  a {
    padding: 0 5px;
    font-size: 22px;
    font-weight: bold;
    border: 2px solid ${(props) => props.theme.fontColor};
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: 3px 3px;
    }
  }
  @media (max-width: 430px) {
  }
`;

const MobileVisitBtn = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
  a {
    padding: 5px 10px;
    font-size: ${(props) => props.theme.fsLarge};
    font-weight: bold;
    border: 2px solid ${(props) => props.theme.fontColor};
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: 3px 3px;
    }
  }
  @media (max-width: 430px) {
    a {
      font-size: ${(props) => props.theme.fsMedium};
    }
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
    align-items: center;
  }

  span {
    width: 200px;
    font-size: ${(props) => props.theme.fsRegular};
    letter-spacing: 1px;
    &:first-child {
      width: 100px;
      font-weight: bold;
      font-size: ${(props) => props.theme.fsMedium};
      letter-spacing: normal;
    }
  }

  @media (max-width: 768px) {
    gap: 5px;
    margin-bottom: 25px;
  }

  @media (max-width: 430px) {
    & > div {
      justify-content: space-between;

      span {
        width: auto;
        font-size: ${(props) => props.theme.fsRegular};
        &:last-child {
          width: auto;
          font-size: ${(props) => props.theme.fsSmall};
        }
      }
    }
  }
`;

const Date = styled.div``;
const Platform = styled.div``;
const Assignment = styled.div``;

const SkillStack = styled.div`
  h3 {
    font-size: ${(props) => props.theme.fsMedium};
    font-weight: bold;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: ${(props) => props.theme.fsRegular};
      margin-bottom: 20px;
    }
  }
  @media (max-width: 430px) {
    font-size: ${(props) => props.theme.fsSmall};
  }
`;

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  span {
    font-weight: bold;
    background: #333;
    color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
    span {
      padding: 5px 10px;
    }
  }
`;

const RightBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Summary = styled.p`
  font: 300 19px / 1.3 "Pretendard-Regular";

  @media (max-width: 768px) {
    font: 300 ${(props) => props.theme.fsMedium} / normal "Pretendard-Regular";
  }

  @media (max-width: 430px) {
    font: 300 ${(props) => props.theme.fsSmall} / normal "Pretendard-Regular";
  }
`;
const ProjectVideoBox = styled.div`
  width: 100%;
`;
const ProjectVideo = styled.video`
  width: 100%;
`;

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const visitRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const playVideo = () => {
      if (isOpen) {
        setTimeout(() => {
          videoRef.current?.play();
        }, 1500);
      } else {
        videoRef.current?.pause();
      }
    };
    playVideo();
  }, [isOpen]);

  useEffect(() => {
    if (window.innerWidth < 769 && visitRef.current && mobileRef.current) {
      visitRef.current.style.display = "none";
      mobileRef.current.style.display = "flex";
    }
  }, []);

  return (
    <>
      <Background
        $isclick={isOpen}
        className={isOpen ? "active" : ""}
      ></Background>
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
                <VisitBtn ref={visitRef}>
                  <a href={project.urlPath} target="_blank">
                    Visit Website
                  </a>
                </VisitBtn>
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
                    {project.skillStack.map((skill, idx) => (
                      <div key={idx}>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </Skills>
                </SkillStack>
              </Contents>
            </LeftBox>
            <RightBox>
              <ProjectVideoBox>
                <ProjectVideo
                  ref={videoRef}
                  src={project.videoPath}
                  muted
                  loop
                  playsInline
                />
              </ProjectVideoBox>
              <Summary>{project.summary}</Summary>
              <MobileVisitBtn ref={mobileRef}>
                <a href={project.urlPath} target="_blank">
                  Visit Website
                </a>
              </MobileVisitBtn>
            </RightBox>
            <Close
              ref={closeRef}
              onMouseEnter={startRotating}
              onMouseLeave={endRotating}
              onClick={() => {
                setIsOpen(false);
                setBarcodeClick(true);
                setProjectClick(false);
              }}
            >
              <IoClose />
            </Close>
          </Container>
        ))}
    </>
  );
};

export default Receipt;
