import React from "react";
import styled from "styled-components";
import { projectData } from "../../utils";
import { span } from "motion/react-client";

const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 430px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #fff;
  font-size: ${(props) => props.theme.fsSmall};

  h3 {
    font-weight: bold;
  }
`;

const ProjectLogo = styled.div`
  padding: 20px 0;
`;
const Info = styled.div`
  width: 100%;
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
  width: 236.5px;
  height: 236.5px;
  background: #f0f0f0;
  margin: 30px 0;
`;
const ProjectImg = styled.img``;

const Desc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
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
  isclick,
  selectedIdx,
}: {
  isclick: boolean;
  selectedIdx: number | null;
}) => {
  return (
    <Background>
      {projectData
        .filter((project) => project.id === selectedIdx)
        .map((project) => (
          <Container key={project.id}>
            <ProjectLogo>
              <img src={project.logoPath} alt={project.name} />
            </ProjectLogo>
            <Info>
              <Article>
                <h3>CATEGORY:</h3>
                <span>TEAM PROJECT</span>
              </Article>
              <Items>
                <h3>PAGE:</h3>
                <span>PROFILE, DETAIL</span>
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
                {project.skillStack.map((skill) => (
                  <div>
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
