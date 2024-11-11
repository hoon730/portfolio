import { useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FaReact } from "react-icons/fa";
import { frontendData } from "../utils";

const Container = styled.section`
  overflow: hidden;
`;

const Inner = styled.div``;

const SkillBox = styled.div`
  display: flex;
  & > div {
    width: 33.33%;
  }
`;

const LeftBox = styled.div``;

const Title = styled.div`
  font-weight: 900;
  font-size: 4rem;
  padding-bottom: 7px;
  letter-spacing: 3px;
  position: relative;
  border-top: 3px solid ${(props) => props.theme.fontColor};
  border-bottom: 3px solid ${(props) => props.theme.fontColor};

  span:last-child {
    position: absolute;
    top: 10%;
    right: 0%;
    font-size: 1.9rem;
  }
`;
const Stacks = styled.div``;
const Stack = styled.div``;

const StackImg = styled.img``;
const StackName = styled.span``;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
`;
const SkillStack = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  background: ${(props) => props.theme.fontColor};
  flex-direction: column;
  justify-content: center;

  span {
    font: bold italic 36px "Archivo Narrow", sans-serif;
    text-align: center;
    color: #fff;
  }
`;

const RightBox = styled.div``;

const Skill = () => {
  return (
    <Container>
      <Inner className="inner">
        <SkillBox>
          <LeftBox>
            <Title>
              <span>FRONTEND</span>
              <span>®</span>
            </Title>
            <Stacks>
              {frontendData.map((data, idx) => (
                <Stack key={idx}>
                  <StackImg src={data.imgPath} />
                  <StackName>{data.name}</StackName>
                </Stack>
              ))}
            </Stacks>
          </LeftBox>
          <CenterBox>
            <SkillStack>
              <span>SKILL</span>
              <span>STACK</span>
            </SkillStack>
          </CenterBox>
          <RightBox></RightBox>
        </SkillBox>
      </Inner>
    </Container>
  );
};

export default Skill;
