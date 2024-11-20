import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { projectData } from "../utils";

const Container = styled.section``;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Scanner = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 510px;
  height: 510px;
  border: 3px solid #d5181c;
  z-index: -1;
  /* transition: all .8s ease-in-out; */
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
  overflow: hidden;
  border-left: 10px solid ${(props) => props.theme.fontColor};
  border-right: 10px solid ${(props) => props.theme.fontColor};
  transition: flex 1s ease-out;
  &:hover {
    flex: 20;
  }
`;

const TeamProject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  margin: 0 5px;
  overflow: hidden;
  border-left: 30px solid ${(props) => props.theme.fontColor};
  border-right: 30px solid ${(props) => props.theme.fontColor};
  transition: flex 1s ease-out;
  &:hover {
    flex: 20;
  }
`;

const Wrapper = styled.div`
  width: 60%;
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
  //   const scannerWidth = 510; // Scanner 크기

  //   // Scanner의 left 값을 Inner 경계 내로 제한
  //   const left = Math.max(
  //     0, // Inner의 왼쪽 경계
  //     Math.min(
  //       innerRect.width - scannerWidth, // Inner의 오른쪽 경계
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
            <Project key={idx}>
              <Wrapper ref={wrapperRef} onMouseEnter={onMouseEnter}>
                {isMouseEnter ? <Scanner /> : null}
              </Wrapper>
            </Project>
          ))}
        </ProjectBox>
      </Inner>
    </Container>
  );
};

export default Work;
