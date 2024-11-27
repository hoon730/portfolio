import React from "react";
import styled from "styled-components";
import { projectData } from "../../utils";

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
`;

const ProjectLogo = styled.div`
  padding: 20px 0;
`;
const Desc = styled.div`
  width: 100%;
`;
const Article = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 2px dashed #000;
`;
const Items = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

`;
const ProjectImgBox = styled.div``;
const ProjectImg = styled.img``;
const SkillStack = styled.div``;
const Barcode = styled.div``;

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
            <Desc>
              <Article>
                <span>ASSINGMENT</span>
                <span>CATEGORY</span>
              </Article>
              <Items>
                <span>Profile + Detail</span>
                <span>Team Project</span>
              </Items>
            </Desc>
            <ProjectImgBox>
              <ProjectImg />
            </ProjectImgBox>
            <SkillStack></SkillStack>
            <Barcode></Barcode>
          </Container>
        ))}
    </Background>
  );
};

export default Receipt;
