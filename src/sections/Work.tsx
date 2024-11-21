import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { projectData } from "../utils";
import { motion } from "framer-motion";

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

// const Scanner = styled(motion.div)`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   width: 510px;
//   height: 510px;
//   z-index: -1;
//   border: 3px solid #d5181c;
// `;

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
  border-left: 10px solid ${(props) => props.theme.fontColor};
  border-right: 10px solid ${(props) => props.theme.fontColor};
  transition: flex 1s ease-out;
  &:hover {
    flex: 15;
  }
`;

const Wrapper = styled(motion.div)`
  height: 100%;
  position: relative;
`;

const Work = () => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [positionX, setPositionX] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const onMouseLeave = () => {
    setIsMouseEnter(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPositionX(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scannerLeft = (): number => {
    if (!innerRef.current) return 0;

    const innerRect = innerRef.current.getBoundingClientRect();
    const scannerWidth = 510;

    const left = Math.max(
      0,
      Math.min(
        innerRect.width - scannerWidth,
        positionX - innerRect.left - scannerWidth / 2
      )
    );

    return left;
  };

  return (
    <Container>
      <Inner ref={innerRef}>
        {/* {<Scanner style={{ left: `${scannerLeft()}px` }}></Scanner>} */}
        <ProjectBox>
          {projectData.map((project, idx) => (
            <Project key={idx}>
              <Wrapper
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                layoutId={`scanner`}
              >
                <img src={project.imgPath} />
                <span>{project.name}</span>
                {isMouseEnter ? <Scanner isMouseEnter={isMouseEnter} /> : null}
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
