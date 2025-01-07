import { useRef, useEffect, useState } from "react";
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
    transform: translate(0, -50%);
    font: bold italic 36px "Archivo Narrow", sans-serif;

    &.left_text {
      left: 50%;
      transform: translateX(-100%);
    }

    &.right_text {
      right: 50%;
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    .text {
      &.left_text {
        top: -35%;
        left: 50%;
        transform: translate(-50%, 0);
      }

      &.right_text {
        top: 120%;
        right: 50%;
        transform: translate(50%, 0);
      }
    }
  }
`;

const SkillBox = styled.div`
  width: 0;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-out;
  overflow: hidden;

  /* @media (max-width: 768px) {
    width: 65.1042vw;
    height: 65.1042vw;
  } */
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
          start: "center center",
          end: "bottom",
          pin: true,
          scrub: 1.5,
          markers: true,
        },
      });

      tl.to(
        textLeftRef.current,
        {
          left: 0,
          x: 0,
        },
        0
      ).to(
        textRightRef.current,
        {
          right: 0,
          x: 0,
        },
        0
      );

      tl.to(boxRef.current, {
        overflow: "visible",
        width: window.innerWidth > 768 ? "500px" : "65.1042vw",
        height: window.innerWidth > 768 ? "500px" : "65.1042vw",
        onComplete: () => {
          // 크기 변경 후 스크롤에 따라 회전 적용
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            markers: true,
            onUpdate: (self) => {
              if (boxRef.current) {
                const rotationY = self.progress * 360; // 스크롤 진행도에 따라 회전 계산
                const skillBoxWidth = boxRef.current.offsetWidth;
                setClacTranslateZ(String(skillBoxWidth / 2));
                boxRef.current.style.transform = `rotateY(${rotationY}deg)`;
              }
            },
          });
        },
      });

      return () => containerCtx.revert();
    });
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (boxRef.current) {
  //       const scrollY = window.scrollY;
  //       const rotationY = scrollY * 0.2;
  //       const skillBoxWidth = boxRef.current.offsetWidth;
  //       boxRef.current.style.transform = `rotateY(${rotationY}deg)`;
  //       setClacTranslateZ(String(skillBoxWidth / 2));
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
