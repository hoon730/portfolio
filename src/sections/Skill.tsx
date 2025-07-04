import { useRef, useState } from "react";
import styled from "styled-components";
import {
  mainData,
  libraryData,
  deploymentData,
  utilitiesData,
} from "../utils";
import Face from "../components/skill/Face";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.section``;

const Inner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 3000px;

  .text {
    position: absolute;
    top: 50%;
    font: bold italic 36px "Archivo Narrow", sans-serif;

    &.left_text {
      left: 50%;
      transform: translate(-100%, -50%);
    }

    &.right_text {
      right: 50%;
      transform: translate(100%, -50%);
    }
  }

  @media (max-width: 768px) {
    .text {
      &.left_text {
        transform: translate(-50%, -50%);
      }

      &.right_text {
        transform: translate(50%, 50%);
      }
    }
  }
`;

const SkillBox = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transform: scale(0) rotateY(0deg);

  @media (max-width: 768px) {
    width: 65.1042vw;
    height: 65.1042vw;
  }
`;

const Skill = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [calcTranslateZ, setClacTranslateZ] = useState("");

  useGSAP(() => {
    const containerCtx = gsap.context(() => {
      if (window.innerWidth > 768) {
        gsap.to(textLeftRef.current, { left: 0, x: 0, duration: 1 });
        gsap.to(textRightRef.current, { right: 0, x: 0, duration: 1 });
      } else if (window.innerWidth > 430) {
        gsap.to(textLeftRef.current, { top: "15%", duration: 1 });
        gsap.to(textRightRef.current, { top: "85%", duration: 1 });
      } else {
        gsap.to(textLeftRef.current, { top: "20%", duration: 1 });
        gsap.to(textRightRef.current, { top: "80%", duration: 1 });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center center",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (boxRef.current) {
            if (self.progress < 0.1) {
              const scaleProgress = self.progress / 0.1;
              boxRef.current.style.transform = `scale(${scaleProgress}) rotateY(0deg)`;
            } else if (self.progress < 0.9) {
              const rotationProgress = (self.progress - 0.1) / 0.8;
              const rotationY = rotationProgress * 270;
              boxRef.current.style.transform = `scale(1) rotateY(-${rotationY}deg)`;
            } else {
              boxRef.current.style.transform = `scale(1) rotateY(-270deg)`;
            }

            const skillBoxWidth = boxRef.current.offsetWidth;
            setClacTranslateZ(String(skillBoxWidth / 2));
          }
        },
      });

      return () => containerCtx.revert();
    });
  }, []);

  return (
    <Container ref={containerRef}>
      <Inner className="inner">
        <div ref={textLeftRef} className="text left_text">
          DEVELOPER
        </div>
        <SkillBox ref={boxRef}>
          <Face
            rotate={`rotateY(0deg) translateZ(${calcTranslateZ}px)`}
            skills={mainData}
            title="MAIN"
          />
          <Face
            rotate={`rotateY(-270deg) translateZ(${calcTranslateZ}px)`}
            skills={libraryData}
            title="LIBRARY"
          />
          <Face
            rotate={`rotateY(-180deg) translateZ(${calcTranslateZ}px)`}
            skills={deploymentData}
            title="DEPLOY"
          />
          <Face
            rotate={`rotateY(-90deg) translateZ(${calcTranslateZ}px)`}
            skills={utilitiesData}
            title="UTILS"
          />
        </SkillBox>
        <div ref={textRightRef} className="text right_text">
          SKILL STACK
        </div>
      </Inner>
    </Container>
  );
};

export default Skill;
