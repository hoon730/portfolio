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
      left: 0;
    }

    &.right_text {
      right: 0;
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
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-out;

  @media (max-width: 768px) {
    width: 65.1042vw;
    height: 65.1042vw;
  }
`;

const Skill = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [calcTranslateZ, setClacTranslateZ] = useState("");

  useGSAP(() => {
    const containerCtx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom",
          pin: true,
          scrub: 1.5,
          markers: true,
        },
      });
    }, containerRef);
    return () => containerCtx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        const scrollY = window.scrollY;
        const rotationY = scrollY * 0.2;
        const skillBoxWidth = boxRef.current.offsetWidth;
        boxRef.current.style.transform = `rotateY(${rotationY}deg)`;
        setClacTranslateZ(String(skillBoxWidth / 2));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <Inner className="inner">
        <div className="text left_text">DEVELOPER</div>
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
        <div className="text right_text">SKILL STACK</div>
      </Inner>
    </Container>
  );
};

export default Skill;
