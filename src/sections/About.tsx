import React from "react";
import styled from "styled-components";

const Container = styled.section``;

const Inner = styled.div`
  padding: 6% 0;
`;

const Bar = styled.div`
  width: 100%;
  height: 3px;
  background-image: linear-gradient(
    to right,
    black 45%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 23px 3px;
  background-repeat: repeat-x;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Desc = styled.div`
  width: 50%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    display: inline-block;
    padding: 0 10px;
    font: bold italic 64px/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
    background: ${(props) => props.theme.fontColor};
    color: #f1f1f1;
  }
`;

const TextBox = styled.div``;

const TextAbout = styled.div``;

const TextMe = styled.div``;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  p {
    font-size: ${(props) => props.theme.fsExtraLarge};
    font-family: "Archivo Narrow", sans-serif;
    text-align: justify;
  }
`;

const Photo = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  div {
    width: 433px;
    height: 500px;
    background: #fff;
  }
`;

const About = () => {
  return (
    <Container>
      <Inner className="inner">
        <Bar />
        <Contents>
          <Desc>
            <TextBox>
              <TextAbout>
                <span>ABOUT</span>
              </TextAbout>
              <TextMe>
                <span>ME</span>
              </TextMe>
            </TextBox>
            <Introduction>
              <p>
                Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet
                consectetur Mi vulputateametvulputate interdum .Bibendum a
                imperdiet tortor purus dolor id.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet
                consectetur Mi vulputateametvulputate interdum .Bibendum a
                imperdiet tortor purus dolor id.
              </p>
            </Introduction>
          </Desc>
          <Photo>
            <div></div>
          </Photo>
        </Contents>
        <Bar />
      </Inner>
    </Container>
  );
};

export default About;
