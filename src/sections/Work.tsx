import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { projectData } from "../utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { span } from "motion/react-client";

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
  padding: 0 5px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  /* background: black; */
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  flex: 0 1 5vw;
  height: 100%;
  margin: 0 5px;
  position: relative;
  overflow: hidden;
  transition: flex 0.3s ease;
  background: ${(props) => props.theme.bgColor};

  &.active {
    flex: 0 0 25vw;
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
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Scanner = styled.div`
  position: absolute;
  top: 0%;
  left: 0;
  width: 25vw;
  height: 25vw;
  border: 3px solid #000;
  transition: all 0.5s ease;
  z-index: 10;
`;

const TopBar = styled.div`
  position: absolute;
  top: calc((100vh - 25vw) / -2);
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: calc((100vh - 25vw) / 2);
  border-left: 3px solid #000;
  border-right: 3px solid #000;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: #f0f0f0;
  }
`;
const BottomBar = styled.div`
  position: absolute;
  bottom: calc((100vh - 25vw) / -2);
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: calc((100vh - 25vw) / 2);
  border-left: 3px solid #000;
  border-right: 3px solid #000;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: #f0f0f0;
  }
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

        scanner.style.transform = `translateX(${scannerX}px)`;
      }, 300);
    }
  };

  useEffect(() => {
    // 컴포넌트가 렌더링된 후 첫 번째 Project 위치로 Scanner를 이동
    const scanner = scannerRef.current;
    const firstProject = projectRefs.current[0];

    if (scanner && firstProject) {
      const projectBoxRect =
        firstProject.parentElement!.getBoundingClientRect();
      const projectRect = firstProject.getBoundingClientRect();

      const initialLeft = projectRect.left - projectBoxRect.left;

      // 초기 left 값을 설정 (14px로 이동)
      scanner.style.transform = `translateX(${initialLeft}px)`;
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
          <Scanner ref={scannerRef}>
            <TopBar></TopBar>
            <BottomBar></BottomBar>
          </Scanner>
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
                    {project.name.split("").map((char) => (
                      <h3>{char}</h3>
                    ))}
                  </Name>
                </Title>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
