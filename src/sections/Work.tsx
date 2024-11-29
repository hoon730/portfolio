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

const Container = styled.section`
  overflow: hidden;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
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
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;

  &.active {
    width: 25vw;
  }
`;

const Title = styled.div`
  width: 2vw;
  height: 100%;
  transition: width 0.3s ease;

  &.active {
    width: 0;
  }
`;

const Name = styled.h3`
  padding: 20px 10px;
  transform: rotate(90deg);
  width: 100%;
  font: bold italic 24px/1 " Libre Franklin", sans-serif;
  transition: transform 0.3s ease;

  &.active {
    transform: rotate(90deg) translateY(100%);
  }
`;

const Detail = styled.div`
  width: 100%;
  height: 100%;
`;

const Scanner = styled.div`
  position: absolute;
  top: -0.25vw;
  left: -0.5vw;
  transform: translate(-0.5vw, -0.25vw);
  width: 26vw;
  height: 26vw;
  background: url("/img/scanner.png") center/cover no-repeat;
  transition: all 0.2s ease;
  z-index: 0;

  &.active {
  }
`;

const ProjectLogo = styled.div`
  height: 22.5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectImgBox = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dbdad9;
  overflow: hidden;
`;
const ProjectImg = styled.img``;

const Barcode = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 22.5%;
  font-family: "Libre Barcode 128", system-ui;
  font-size: 64px;
  z-index: 2;

  &.active {
    z-index: -1;
  }
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
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  console.log(isClick);

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

        scanner.style.left = `${scannerX}px`;
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

      scanner.style.left = `${initialLeft}px`;
    }
  }, []);

  const onClick = () => {
    setIsClick(true);
    setIsOpen(true);
    console.log("click");
    setTimeout(() => {
      setIsClick(false);
    }, 600);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "center center",
        end: "bottom",
        pin: true,
        scrub: true,
        markers: true,
      },
    });
  }, []);

  console.log(isOpen);

  return (
    <Container
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      className={isMouseEnter ? "active container" : "container"}
    >
      <Inner className="inner">
        <ProjectBox>
          <Cursor
            className={isClick ? "active" : ""}
            style={{
              left: `${position.x - 325}px`,
              top: `${position.y - 230}px`,
            }}
          />
          <Scanner
            ref={scannerRef}
            className={isClick ? "active" : ""}
          ></Scanner>
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
                <Detail>
                  <ProjectLogo>
                    <div>
                      <img src={project.logoPath} alt={project.name} />
                    </div>
                  </ProjectLogo>
                  <ProjectImgBox>
                    <ProjectImg />
                  </ProjectImgBox>
                  <Barcode onClick={onClick}>
                    <span>{project.barcode}</span>
                  </Barcode>
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
