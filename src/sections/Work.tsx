import { useState, useRef } from "react";
import styled from "styled-components";
import { projectData } from "../utils";
import Scanner from "../components/work/Scanner";

const Container = styled.section``;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProjectBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;
const Project = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  margin: 0 5px;
  /* overflow: hidden; */
  position: relative;
  border-left: 10px solid ${(props) => props.theme.fontColor};
  border-right: 10px solid ${(props) => props.theme.fontColor};
  transition: flex 1s ease-out;
  &.active {
    flex: 15;
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;

const Work = () => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  // const [positionX, setPositionX] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnter = (idx: number) => {
    setIsMouseEnter(true);
    setSelectedIdx(idx);
  };

  const onMouseLeave = () => {
    setIsMouseEnter(false);
  };

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setPositionX(e.clientX);
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  // const scannerLeft = (): number => {
  //   if (!innerRef.current) return 0;

  //   const innerRect = innerRef.current.getBoundingClientRect();
  //   const scannerWidth = 510;

  //   const left = Math.max(
  //     0,
  //     Math.min(
  //       innerRect.width - scannerWidth,
  //       positionX - innerRect.left - scannerWidth / 2
  //     )
  //   );

  //   return left;
  // };

  return (
    <Container>
      <Inner ref={innerRef}>
        {/* {<Scanner style={{ left: `${scannerLeft()}px` }}></Scanner>} */}
        <ProjectBox>
          {projectData.map((project, idx) => (
            <Project
              key={idx}
              className={selectedIdx === idx ? "active" : ""}
              onMouseEnter={() => onMouseEnter(idx)}
            >
              {selectedIdx === idx ? (
                <Scanner isMouseEnter={isMouseEnter} />
              ) : null}
              <Wrapper
              // onMouseLeave={onMouseLeave}
              >
                <img src={project.imgPath} />
                <span>{project.name}</span>
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
