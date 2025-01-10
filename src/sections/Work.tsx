import { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import Receipt from "../components/work/receipt";
import { projectData } from "../utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Scanning = keyframes`
  0% {
    background-image: url("/img/pjh2.png");
  }
  100%{
    background-image: url("/img/pjh.png");
  }
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const Container = styled.section`
  overflow: hidden;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectBox = styled.div`
  width: 100%;
  height: 25vw;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  z-index: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 50vw;
    height: 90%;
  }
`;

const Project = styled.div`
  width: 2vw;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.fontColor};

  &.active {
    width: 25vw;
    border: 2px solid transparent;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 4vw;

    &.active {
      width: 50vw;
      height: 50vw;
    }
  }

  @media (max-width: 430px) {
    height: 6.5vw;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;

  &.active {
    width: 25vw;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    &.active {
      width: 50vw;
      height: 50vw;
    }
  }
`;

const Title = styled.div`
  width: 2vw;
  height: 100%;
  transition: width 0.3s ease;

  &.active {
    width: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 4vw;
    transition: height 0.3s ease;

    &.active {
      height: 0;
    }
  }

  @media (max-width: 430px) {
    height: 6.5vw;
  }
`;

const Name = styled.h3`
  padding: 20px 0;
  transform: rotate(90deg);
  width: 100%;
  font: bold italic 24px/1 " Libre Franklin", sans-serif;
  transition: transform 0.3s ease;

  &.active {
    transform: rotate(90deg) translateY(100%);
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    transform: rotate(0deg);
    font: bold italic 3.125vw/1 " Libre Franklin", sans-serif;

    &.active {
      transform: rotate(0deg) translateY(-100%);
    }
  }

  @media (max-width: 430px) {
    font: bold italic 5.5814vw/1 " Libre Franklin", sans-serif;
  }
`;

interface DetailProps {
  $background: string;
}

const Detail = styled.div<DetailProps>`
  width: 100%;
  height: 0;
  position: relative;
  z-index: 2;
  background: url(${(props) => props.$background}) center/cover no-repeat;
  overflow: hidden;

  &.active {
    height: 100%;
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  @media (max-width: 430px) {
    align-items: center;
    justify-content: center;
  }
`;

const Scanner = styled.div`
  position: absolute;
  top: -1vw;
  left: 0;
  transform: translate(-1vw, 0);
  width: 27vw;
  height: 27vw;
  background: url("/img/scanner.png") center/cover no-repeat;
  transition: all 0.2s ease;
  z-index: 0;

  &.on {
    top: -0.25vw;
    transform: translate(-0.43vw, -0.16vw);
    width: 25.85vw;
    height: 25.85vw;
    animation: ${blink} 0.3s ease-in-out both;
  }

  @media (max-width: 768px) {
    width: 52.5vw;
    height: 52.5vw;
    left: 0.5vw;
    transform: translate(-1.75vw, -1.25vw);

    &.on {
      width: 51.5vw;
      height: 51.5vw;
      left: -0.7vw;
      transform: translate(0vw, -0.75vw);
    }
  }
`;

const ProjectName = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
  padding-top: 5%;
  color: #fff;
  font: normal 3.3rem "Libre Barcode 39 Text", serif;

  &.on {
    animation: ${blink} 0.3s ease-in-out both;
  }

  @media (max-width: 768px) {
    font: normal 6.875vw "Libre Barcode 39 Text", serif;
  }

  @media (max-width: 430px) {
    padding: 0;
    justify-content: center;
    font: normal 9vw "Libre Barcode 39 Text", serif;
  }
`;

const ProjectDesc = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 5%;
  padding-bottom: 5%;
  color: #fff;

  &.on {
    animation: ${blink} 0.3s ease-in-out both;
  }

  @media (max-width: 430px) {
    display: none;
  }
`;

const Box = styled.div`
  border: 2px solid #fff;
  width: 60%;
  height: 85px;
`;

const BoxTop = styled.div`
  display: flex;
  border-bottom: 2px solid #fff;
  height: 30%;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProjectNum = styled.div`
  width: 10%;
  border-right: 2px solid #fff;
`;

const ProjectLogo = styled.div`
  width: 90%;
  letter-spacing: 1px;
`;

const BoxBottom = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  gap: 5px;
`;

const Cursor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-image: url("/img/pjh.png");
  background-size: cover;
  background-position: center;
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);

  &.active {
    animation: ${Scanning} 0.6s linear both;
  }
`;

const Work = () => {
  const [isClick, setIsClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [isOn, setIsOn] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = useCallback((idx: number) => {
    setSelectedIdx(idx);

    const scanner = scannerRef.current;
    const targetProject = projectRefs.current[idx];

    if (scanner && targetProject) {
      setTimeout(() => {
        const projectBoxRect =
          targetProject.parentElement!.getBoundingClientRect();
        const projectRect = targetProject.getBoundingClientRect();

        const scannerX = projectRect.left - projectBoxRect.left;
        const scannerY = projectRect.top - projectBoxRect.top;

        if (window.innerWidth > 768) {
          scanner.style.left = `${scannerX}px`;
        } else {
          scanner.style.top = `${scannerY}px`;
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const scanner = scannerRef.current;
    const firstProject = projectRefs.current[0];

    if (scanner && firstProject) {
      const projectBoxRect =
        firstProject.parentElement!.getBoundingClientRect();
      const projectRect = firstProject.getBoundingClientRect();

      const initialLeft = projectRect.left - projectBoxRect.left;
      const initialTop = projectRect.top - projectBoxRect.top;

      if (window.innerWidth > 768) {
        scanner.style.left = `${initialLeft}px`;
      } else {
        scanner.style.top = `${initialTop}px`;
      }
    }
  }, []);

  const onClick = () => {
    setIsClick(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsClick(false);
    }, 600);
  };

  useGSAP(() => {
    const workCtx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: workRef.current,
          start: "center center",
          end: "bottom",
          pin: true,
          scrub: true,
        },
      });
    }, workRef);

    return () => workCtx.revert();
  }, []);

  return (
    <Container ref={workRef}>
      <Cursor ref={cursorRef} className={isClick ? "active" : ""} />
      <Inner className="inner">
        <ProjectBox>
          <Scanner ref={scannerRef} className={isOn ? "on" : ""} />
          {projectData.map((project, idx) => (
            <Project
              key={idx}
              ref={(el) => (projectRefs.current[idx] = el!)}
              className={selectedIdx === idx ? "active" : ""}
              onMouseEnter={() => handleMouseEnter(idx)}
            >
              <Wrapper className={selectedIdx === idx ? "active" : ""}>
                <Title className={selectedIdx === idx ? "active" : ""}>
                  <Name className={selectedIdx === idx ? "active" : ""}>
                    {project.name}
                  </Name>
                </Title>
                <Detail
                  className={selectedIdx === idx ? "active" : ""}
                  $background={project.pagePath}
                  onMouseEnter={() => setIsOn(true)}
                  onMouseLeave={() => setIsOn(false)}
                  onClick={onClick}
                >
                  <Filter>
                    <ProjectName
                      className={
                        selectedIdx === idx ? (isOn ? "on active" : "") : ""
                      }
                    >
                      {project.name}
                    </ProjectName>

                    <ProjectDesc className={isOn ? "on" : ""} onClick={onClick}>
                      <Box>
                        <BoxTop>
                          <ProjectNum>{idx + 1}</ProjectNum>
                          <ProjectLogo>{project.name}</ProjectLogo>
                        </BoxTop>
                        <BoxBottom>{project.summary}</BoxBottom>
                      </Box>
                    </ProjectDesc>
                  </Filter>
                </Detail>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
      {isOpen ? (
        <Receipt
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedIdx={selectedIdx}
        />
      ) : null}
    </Container>
  );
};

export default Work;
