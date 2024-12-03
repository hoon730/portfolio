import { useRef, useEffect } from "react";
import styled from "styled-components";
import { frontendData } from "../utils";
import { backendData } from "../utils";
import { databaseData } from "../utils";
import Face from "../components/skill/Face";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.section`
  height: 150vh !important;
`;

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
    transform: translateY(-50%);
    font: bold italic 36px "Archivo Narrow", sans-serif;
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
`;

const LeftText = styled.div`
  left: 0;
`;
const RightText = styled.div`
  right: 0;
`;

const Skill = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

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
        boxRef.current.style.transform = `rotateY(${rotationY}deg)`;
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
        <LeftText className="text">SKILLSTACK</LeftText>
        <SkillBox ref={boxRef}>
          <Face
            rotate="rotateY(0deg) translateZ(250px)"
            skills={frontendData}
            title="FRONTEND"
          />
          <Face
            rotate="rotateY(90deg) translateZ(250px)"
            skills={backendData}
            title="BACKEND"
          />
          <Face
            rotate="rotateY(180deg) translateZ(250px)"
            skills={databaseData}
            title="DATABASE"
          />
          <Face
            rotate="rotateY(-90deg) translateZ(250px)"
            skills={frontendData}
            title="FRONTEND"
          />
        </SkillBox>
        <RightText className="text">FRONTEND</RightText>
      </Inner>
    </Container>
  );
};

export default Skill;
