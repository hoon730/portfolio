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
  background: #f0f0f0;
  /* border: 1px solid ${(props) => props.theme.fontColor}; */
  background: ${(props) => props.theme.fontColor};
  transition: width 0.3s ease;

  &.active {
    width: 25vw;
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
`;

const Name = styled.div`
  padding: 20px 10px;
  transform: rotate(90deg);
  width: 100%;

  h3 {
    color: #fff;
    font: bold italic 24px/1 " Libre Franklin", sans-serif;
  }
`;

const Detail = styled.div`
  height: 100%;
  /* border-left: 1px solid ${(props) => props.theme.fontColor}; */
  border-left: 1px solid #fff;
`;

const Scanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 25vw;
  height: 25vw;
  background: url("/img/scanner_white.png") center/cover no-repeat;
  transition: all 0.3s ease;
  z-index: 10;
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
      }, 300);
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
                <Title>
                  <Name>
                    {/* {project.name.split("").map((char) => (
                      <h3>{char}</h3>
                    ))} */}
                    <h3>{project.name}</h3>
                  </Name>
                </Title>
                <Detail></Detail>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
