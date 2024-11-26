import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { projectData } from "../utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  /* border-left: 1px solid #fff; */
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
  z-index: 10;
`;

const ProjectLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22.5%;
`;
const ProjectImgBox = styled.div`
  width: 100%;
  height: 55%;
  background: #dbdad9;
`;
const ProjectImg = styled.img``;
const Barcode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22.5%;
  font-family: "Libre Barcode 128", system-ui;
  font-size: 64px;
`;

const Work = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

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
                  <ProjectLogo>
                    <img src={project.logoPath} alt="" />
                  </ProjectLogo>
                  <ProjectImgBox>
                    <ProjectImg />
                  </ProjectImgBox>
                  <Barcode>{project.name}</Barcode>
                </Detail>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
