import { useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Frontend from "../components/skill/Frontend";
import Backend from "../components/skill/Backend";
import Database from "../components/skill/Database";

const Container = styled.section`
  /* overflow: hidden; */
  height: 350vh !important;
  padding-top: 800px !important;
`;

const Inner = styled.div``;

const SkillBox = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  & > div {
    width: 33.33%;
  }
`;

const LeftBox = styled.div``;

const RightBox = styled.div``;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const SkillStack = styled.div`
  position: sticky;
  top: 0;
  width: 120px;
  height: 120px;
  display: flex;
  background: ${(props) => props.theme.fontColor};
  flex-direction: column;
  justify-content: center;

  span {
    font: bold italic 36px "Archivo Narrow", sans-serif;
    text-align: center;
    color: #f0f0f0;
  }
`;

const Skill = () => {
  return (
    <Container>
      <Inner className="inner">
        <SkillBox>
          <LeftBox>
            <Frontend />
            <Database />
          </LeftBox>
          <CenterBox>
            <SkillStack>
              <span>SKILL</span>
              <span>STACK</span>
            </SkillStack>
          </CenterBox>
          <RightBox>
            <Backend />
          </RightBox>
        </SkillBox>
      </Inner>
    </Container>
  );
};

export default Skill;
