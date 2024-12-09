// import { useState, useRef } from "react";
// import styled from "styled-components";
// import { projectData } from "../utils";
// import Scanner from "../components/work/Scanner";

// const Container = styled.section``;

// const Inner = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const ProjectBox = styled.div`
//   width: 100%;
//   height: 25vw;
//   display: flex;
//   justify-content: space-between;
// `;

// const Project = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex: 1;
//   height: 100%;
//   position: relative;
//   transition: flex 1s ease-out;
//   &.active {
//     flex: 5;
//   }

//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 10px;
//     height: 100%;
//     background: ${(props) => props.theme.fontColor};
//     z-index: 0;
//   }
//   &:last-child {
//     &::after {
//       content: "";
//       position: absolute;
//       top: 0;
//       right: 0;
//       width: 10px;
//       height: 100%;
//       background: ${(props) => props.theme.fontColor};
//       z-index: 0;
//     }
//   }
// `;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Work = () => {
//   const [isMouseEnter, setIsMouseEnter] = useState(false);
//   const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
//   // const [positionX, setPositionX] = useState<number>(0);
//   const innerRef = useRef<HTMLDivElement | null>(null);

//   const onMouseEnter = (idx: number) => {
//     setIsMouseEnter(true);
//     setSelectedIdx(idx);
//   };

//   // const onMouseLeave = () => {
//   //   setIsMouseEnter(false);
//   // };

//   // useEffect(() => {
//   //   const handleMouseMove = (e: MouseEvent) => {
//   //     setPositionX(e.clientX);
//   //   };

//   //   window.addEventListener("mousemove", handleMouseMove);

//   //   return () => {
//   //     window.removeEventListener("mousemove", handleMouseMove);
//   //   };
//   // }, []);

//   // const scannerLeft = (): number => {
//   //   if (!innerRef.current) return 0;

//   //   const innerRect = innerRef.current.getBoundingClientRect();
//   //   const scannerWidth = 510;

//   //   const left = Math.max(
//   //     0,
//   //     Math.min(
//   //       innerRect.width - scannerWidth,
//   //       positionX - innerRect.left - scannerWidth / 2
//   //     )
//   //   );

//   //   return left;
//   // };

//   return (
//     <Container>
//       <Inner ref={innerRef}>
//         {/* {<Scanner style={{ left: `${scannerLeft()}px` }}></Scanner>} */}
//         <ProjectBox>
//           {projectData.map((project, idx) => (
//             <Project
//               key={idx}
//               className={selectedIdx === idx ? "active" : ""}
//               onMouseEnter={() => onMouseEnter(idx)}
//             >
//               {selectedIdx === idx ? (
//                 <Scanner isMouseEnter={isMouseEnter} />
//               ) : null}
//               <Wrapper
//               // onMouseLeave={onMouseLeave}
//               >
//                 <img src={project.imgPath} />
//                 <span>{project.name}</span>
//               </Wrapper>
//             </Project>
//           ))}
//         </ProjectBox>
//       </Inner>
//     </Container>
//   );
// };

// export default Work;

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

const Title = styled.h3``;

const Desc = styled.div`
  width: 100%;
`;

const Work = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]); // 각 Project의 DOM 저장
  const [scannerLeft, setScannerLeft] = useState<number>(0);
  const targetLeft = useRef<number>(0); // Scanner가 이동할 목표 위치
  const animationFrame = useRef<number | null>(null);

  const updateScannerPosition = () => {
    if (scannerLeft !== targetLeft.current) {
      const newLeft = scannerLeft + (targetLeft.current - scannerLeft) * 0.1; // 부드럽게 이동
      setScannerLeft(newLeft);
    }
    animationFrame.current = requestAnimationFrame(updateScannerPosition);
  };

  const onMouseEnter = (idx: number) => {
    setSelectedIdx(idx);
    if (projectRefs.current[idx] && innerRef.current) {
      const projectRect = projectRefs.current[idx].getBoundingClientRect();
      const innerRect = innerRef.current.getBoundingClientRect();
      const newLeft = projectRect.left - innerRect.left;
      targetLeft.current = newLeft; // 목표 위치 설정
    }
  };

  const onMouseLeave = () => {
    setSelectedIdx(null);
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(updateScannerPosition);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [scannerLeft]);

  return (
    <Container>
      <Inner ref={innerRef}>
        <Scanner style={{ left: `${scannerLeft}px` }} />
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
