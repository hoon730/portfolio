import { useState, useRef, useEffect } from "react";
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
  position: relative;
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
  z-index: 1;
`;

const Project = styled.div`
  width: 2vw;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  /* background: #f0f0f0; */
  border: 2px solid ${(props) => props.theme.fontColor};
  /* background: ${(props) => props.theme.fontColor}; */
  /* transition: width 0.3s ease; */
  z-index: 1;

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
`;

const ProjectLogo = styled.div`
  height: 22.5%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* div {
    overflow: hidden;

    img {
      transform: translateY(120%);
      transition: transform 0.3s 0.3s ease;
    }
  }

  &.active img {
    transform: translateY(0);
  } */
`;
const ProjectImgBox = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dbdad9;
  overflow: hidden;

  /* img {
    transform: translateY(200%);
    transition: transform 0.6s 0.3s ease;
  }

  &.active img {
    transform: translateY(0);
  } */
`;
const ProjectImg = styled.img``;

const Barcode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22.5%;
  font-family: "Libre Barcode 128", system-ui;
  font-size: 64px;
  transform: translateY(20%);
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
  z-index: 1;
  transform: translate(-50%, -50%);

  &.active {
    animation: ${Scanning} 1s linear both;
  }
`;

const Work = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [isClick, setIsClick] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  console.log(isClick);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (idx: number) => {
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
  };

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

  return (
    <Container className="container">
      <Inner>
        <ProjectBox>
          <Cursor
            className={isClick ? "active" : ""}
            style={{
              left: `${position.x - 325}px`,
              top: `${position.y - 230}px`,
            }}
          />
          <Scanner ref={scannerRef}></Scanner>
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
                  <ProjectLogo className={selectedIdx === idx ? "active" : ""}>
                    <div>
                      <img src={project.logoPath} alt={project.name} />
                    </div>
                  </ProjectLogo>
                  <ProjectImgBox
                    className={selectedIdx === idx ? "active" : ""}
                  >
                    <ProjectImg />
                  </ProjectImgBox>
                  <Barcode
                    className={selectedIdx === idx ? "active" : ""}
                    onClick={onClick}
                  >
                    <div>
                      <span>{project.barcode}</span>
                    </div>
                  </Barcode>
                </Detail>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
      <Receipt isclick={isClick} selectedIdx={selectedIdx} />
    </Container>
  );
};

export default Work;
