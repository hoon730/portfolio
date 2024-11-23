import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { projectData } from "../utils";

const Container = styled.section`
  position: relative;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ProjectBox = styled.div`
  width: 100%;
  height: 25vw;
  display: flex;
  justify-content: space-evenly;
  background: black;
`;

const Project = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 1 5vw;
  height: 100%;
  margin: 0 5px;
  position: relative;
  overflow: hidden;
  transition: flex 0.3s ease;
  background: ${(props) => props.theme.bgColor};

  &.active {
    flex: 1 0 25vw;
  }
`;

const Wrapper = styled.div`
  width: 5vw;
  height: 100%;
  display: flex;

  &.active {
    width: 25vw;
  }
`;

const Title = styled.h3``;

const Scanner = styled.div`
  position: absolute;
  top: 0%;
  left: 0;
  width: 25vw;
  height: 25vw;
  border: 3px solid red;
  transition: all 0.5s ease; /* 부드러운 이동 */
  z-index: 10;
`;

const Work = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]); // Project DOM 참조 저장

  const handleMouseEnter = (idx: number) => {
    setSelectedIdx(idx);

    const scanner = scannerRef.current;
    const targetProject = projectRefs.current[idx];

    if (scanner && targetProject) {
      // Project가 active 상태로 전환된 후 위치 계산
      setTimeout(() => {
        const projectBoxRect =
          targetProject.parentElement!.getBoundingClientRect();
        const projectRect = targetProject.getBoundingClientRect();

        // Scanner의 위치를 active 상태의 Project 중앙으로 이동
        const scannerX = projectRect.left - projectBoxRect.left;

        // Scanner 위치 동기화 (넓이는 고정)
        scanner.style.transform = `translateX(${scannerX}px)`;
      }, 300); // Project transition 시간과 동일하게 설정
    }
  };

  useEffect(() => {
    if (selectedIdx === null) {
      const scanner = scannerRef.current;
      if (scanner) {
        // 초기 위치 설정
        scanner.style.left = "0";
      }
    }
  }, [selectedIdx]);

  return (
    <Container>
      <Inner>
        {/* Scanner 컴포넌트 */}
        <Scanner ref={scannerRef} />

        {/* Project 컴포넌트 */}
        <ProjectBox>
          {projectData.map((project, idx) => (
            <Project
              key={idx}
              ref={(el) => (projectRefs.current[idx] = el!)}
              className={selectedIdx === idx ? "active" : ""}
              onMouseEnter={() => handleMouseEnter(idx)}
            >
              <Wrapper className={selectedIdx === idx ? "active" : ""}>
                <Title>{project.name}</Title>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
