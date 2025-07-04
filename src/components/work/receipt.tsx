import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useCallback,
} from "react";
import styled, { keyframes } from "styled-components";
import { projectData } from "../../utils";

import gsap from "gsap";
import { CSSPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { IoClose } from "react-icons/io5";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const roll = keyframes`
  0% {
    transform: translateY(100vh);
  }
  30% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const show = keyframes`
  0% {
    transform: translateY(100vh);
    padding: var(--animation-padding);
  }
  100% {
    transform: translateY(0);
    padding: var(--animation-padding);
  }
`;

const Background = styled.div<{ $isclick: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f0f0f0;
  overflow: hidden;
  z-index: 999;
  cursor: auto;
  transform: translateY(100vh);

  &.active {
    animation: ${roll} 3.5s 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) both;
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

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  z-index: 998;
  background: #f0f0f0;
  cursor: auto;
  transform: translateY(100vh);

  &.active {
    animation: ${show} 0.8s 1.2s ease-out both;
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
`;

const Contents = styled.div`
  @media (max-width: 768px) {
    display: flex;
    gap: 30px;
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 35px;

  & > div {
    display: flex;
    justify-content: space-between;
    font-size: ${(props) => props.theme.fsMedium};
    font-weight: bold;
    letter-spacing: 1px;

    span:first-child {
      color: ${(props) => props.theme.fontColor};
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Date = styled.div``;
const Platform = styled.div``;
const Assignment = styled.div``;

const SkillStack = styled.div`
  h3 {
    color: ${(props) => props.theme.fontColor};
    font-size: ${(props) => props.theme.fsMedium};
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 15px;
  }
`;

const Skills = styled.div`
  display: flex;
  gap: 10px;

  div {
    span {
      background: ${(props) => props.theme.fontColor};
      color: #f1f1f1;
      font-size: ${(props) => props.theme.fsSmall};
      font-weight: bold;
      padding: 3px 7px;
      border-radius: 3px;
    }
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

const Receipt: React.FC<ReceiptProps> = ({
  isOpen,
  setIsOpen,
  selectedIdx,
  setBarcodeClick,
  setProjectClick,
}) => {
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

  const startRotating = useCallback(() => {
    if (closeRef.current) {
      gsap.to(closeRef.current, {
        rotate: 90,
        transformOrigin: "50% 50%",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, []);

  const endRotating = useCallback(() => {
    if (closeRef.current) {
      gsap.to(closeRef.current, {
        rotate: -90,
        transformOrigin: "50% 50%",
        duration: 0.5,
        ease: "power1.out",
      });
    }
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsOpen(false);
    setBarcodeClick(true);
    setProjectClick(false);
  }, [setIsOpen, setBarcodeClick, setProjectClick]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      const timer = setTimeout(() => {
        video.play().catch(console.error);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 769;

      if (visitRef.current && mobileRef.current) {
        if (isMobile) {
          visitRef.current.style.display = "none";
          mobileRef.current.style.display = "flex";
        } else {
          visitRef.current.style.display = "block";
          mobileRef.current.style.display = "none";
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (selectedIdx === null || !projectData[selectedIdx]) {
    return null;
  }

  const project = projectData[selectedIdx];

  return (
    <>
      <Background $isclick={isOpen} className={isOpen ? "active" : ""} />
      <Container className={isOpen ? "active" : ""}>
        <LeftBox>
          <Title>
            <ProjectName>
              <span>{project.name}</span>
              <span>®</span>
            </ProjectName>
            <VisitBtn ref={visitRef}>
              <a
                href={project.urlPath}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                  <div key={`${project.id}-${skill}-${idx}`}>
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
              preload="metadata"
            />
          </ProjectVideoBox>
          <Summary>{project.summary}</Summary>
          <MobileVisitBtn ref={mobileRef}>
            <a href={project.urlPath} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </MobileVisitBtn>
        </RightBox>
        <Close
          ref={closeRef}
          onMouseEnter={startRotating}
          onMouseLeave={endRotating}
          onClick={handleCloseClick}
        >
          <IoClose />
        </Close>
      </Container>
    </>
  );
};

export default React.memo(Receipt);
