import { useRef, useState } from "react";
import styled from "styled-components";
import { frontendData } from "../utils";
import { backendData } from "../utils";
import { databaseData } from "../utils";
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
  transform: scale(0);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center ",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });

      if (window.innerWidth > 768) {
        tl.to(textLeftRef.current, { left: 0, x: 0 }, 0).to(
          textRightRef.current,
          { right: 0, x: 0 },
          0
        );
      } else if (window.innerWidth > 430) {
        tl.to(textLeftRef.current, { top: "15%" }, 0).to(
          textRightRef.current,
          { top: "85%" },
          0
        );
      } else {
        tl.to(textLeftRef.current, { top: "20%" }, 0).to(
          textRightRef.current,
          { top: "80%" },
          0
        );
      }

      tl.to(boxRef.current, {
        scale: 1,
      }).to(boxRef.current, {
        onUpdate: () => {
          if (boxRef.current) {
            const currentY = window.scrollY / 3 - window.innerHeight;
            const boxHeight = boxRef.current.offsetTop;
            const rotationY = currentY - boxHeight;
            console.log(`boxHeight: ${boxHeight}, currentY: ${currentY}`);
            const skillBoxWidth = boxRef.current.offsetWidth;
            setClacTranslateZ(String(skillBoxWidth / 2));
            boxRef.current.style.transform = `rotateY(-${rotationY}deg)`;
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
            skills={frontendData}
            title="FRONTEND"
          />
          <Face
            rotate={`rotateY(90deg)  translateZ(${calcTranslateZ}px)`}
            skills={backendData}
            title="BACKEND"
          />
          <Face
            rotate={`rotateY(180deg)  translateZ(${calcTranslateZ}px)`}
            skills={databaseData}
            title="DATABASE"
          />
          <Face
            rotate={`rotateY(-90deg)  translateZ(${calcTranslateZ}px)`}
            skills={frontendData}
            title="FRONTEND"
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
