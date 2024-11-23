import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { projectData } from "../utils";
import Scanner from "../components/work/Scanner";

const Container = styled.section``;

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
  transition: flex 1s cubic-bezier(0.075, 0.82, 0.165, 1);
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

const Title = styled.h3`
`;
const Desc = styled.div`
  width: 100%;
`;

const Work = () => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [positionX, setPositionX] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]); // 각 Project의 DOM 저장
  const [scannerPosition, setScannerPosition] = useState<number>(0);

  const onMouseEnter = (idx: number) => {
    setIsMouseEnter(true);
    setSelectedIdx(idx);

    // `active` 클래스 적용 후 Scanner 위치 계산
    setTimeout(() => {
      if (projectRefs.current[idx]) {
        const projectRect = projectRefs.current[idx].getBoundingClientRect();
        const innerRect = innerRef.current?.getBoundingClientRect();
        if (innerRect) {
          const newLeft = projectRect.left - innerRect.left;
          setScannerPosition(newLeft);
        }
      }
    }, 500); // CSS transition이 반영될 시간을 고려
  };

  const onMouseLeave = () => {
    setIsMouseEnter(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseEnter) {
        setPositionX(e.clientX);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseEnter]);

  const scannerLeft = (): number => {
    if (!innerRef.current || selectedIdx === null) return 0;

    const innerRect = innerRef.current.getBoundingClientRect();
    const projectRect =
      projectRefs.current[selectedIdx].getBoundingClientRect();
    const scannerWidth = projectRect.width;

    if (isMouseEnter) {
      // Return the pre-calculated position when inside the Project
      return scannerPosition;
    }

    // Default behavior when outside Project
    const left = Math.max(
      projectRect.left - innerRect.left,
      Math.min(
        projectRect.right - innerRect.left - scannerWidth,
        positionX - innerRect.left - scannerWidth / 2
      )
    );

    return left;
  };

  return (
    <Container>
      <Inner ref={innerRef}>
        {<Scanner style={{ left: `${scannerLeft()}px` }} />}
        <ProjectBox>
          {projectData.map((project, idx) => (
            <Project
              key={idx}
              ref={(el) => (projectRefs.current[idx] = el!)}
              className={selectedIdx === idx ? "active" : ""}
              onMouseEnter={() => onMouseEnter(idx)}
              onMouseLeave={onMouseLeave}
            >
              <Wrapper className={selectedIdx === idx ? "active" : ""}>
                <Title>{project.name}</Title>
                <Desc></Desc>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
