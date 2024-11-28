import React from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { projectData } from "../../utils";

import gsap from "gsap";
import { CSSPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const Background = styled.div<{ $isclick: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* background: rgba(0, 0, 0, 0.3); */
  display: ${({ $isclick }) => ($isclick ? "flex" : "none")};
  z-index: 10;
`;

const Container = styled.div`
  width: 430px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${(props) => props.theme.fsSmall};
  background: #fff;
  transform: translateY(100%);
  border-top: 1px dashed #000;

  h3 {
    font-weight: bold;
  }
`;

const ProjectLogo = styled.div`
  padding: 20px 0;
`;
const Info = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;

const Article = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;
const Items = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 2px dashed #000;
`;
const ProjectImgBox = styled.div`
  background: #f0f0f0;
  width: 16vw;
  height: 16vw;
`;
const ProjectImg = styled.img``;

const Desc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 30px 0 20px 0;
  margin-bottom: 20px;
  border-bottom: 2px dashed #000;
`;

const SkillStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 2px dashed #000;
`;

const StackBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Barcode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px 0;

  h3 {
    font-size: ${(props) => props.theme.fsLarge};
  }

  span {
    text-align: center;
    font-size: 64px;
    font-family: "Libre Barcode 128", system-ui;
  }
`;

const Receipt = ({
  isOpen,
  setIsOpen,
  selectedIdx,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedIdx: number | null;
}) => {
  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      const yArr = [80, 60, 40, 20, 0];

      yArr.forEach((y, index) => {
        tl.to(".container", {
          y,
          duration: 0.3,
          ease: "power1.inOut",
          delay: index === 0 ? 0.2 : 0,
        });
      });
    }
  }, [isOpen]);

  return (
    <Background
      $isclick={isOpen}
      onClick={() => setIsOpen(false)}
    >
      {projectData
        .filter((project) => project.id === selectedIdx)
        .map((project) => (
          <Container key={project.id} className="container">
            <ProjectLogo>
              <img src={project.logoPath} alt={project.name} />
            </ProjectLogo>
            <Info>
              <Article>
                <h3>CATEGORY:</h3>
                <span>Team Project</span>
              </Article>
              <Items>
                <h3>PAGE:</h3>
                <span>Profile, Detail</span>
              </Items>
            </Info>
            <ProjectImgBox>
              <ProjectImg />
            </ProjectImgBox>
            <Desc>
              <h3>DESCRIPTION</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Cras sed ligula
                consequat malesuada neque ut cras.
              </p>
            </Desc>
            <SkillStack>
              <h3>SKILL STACK</h3>
              <StackBox>
                {project.skillStack.map((skill, idx) => (
                  <div key={idx}>
                    <span>{skill}</span>
                    <span>x 1</span>
                  </div>
                ))}
              </StackBox>
            </SkillStack>
            <Barcode>
              <h3>** VISIT WEBSITE **</h3>
              <span>{project.barcode}</span>
            </Barcode>
          </Container>
        ))}
    </Background>
  );
};

export default Receipt;
