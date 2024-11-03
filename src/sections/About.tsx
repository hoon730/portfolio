import React from "react";
import styled from "styled-components";

const Container = styled.section``;

const Inner = styled.div`
  height: 65%;
  display: flex;
  align-items: center;
  /* border-top: 3px dashed ${(props) => props.theme.fontColor};
  border-bottom: 3px dashed ${(props) => props.theme.fontColor}; */
  /* background-image: linear-gradient(
    to right,
    black 45%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 23px 3px;
  background-repeat: repeat-x; */
`;

const Bar = styled.div`
  width: 100%;
  background-image: linear-gradient(
    to right,
    black 45%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 23px 3px;
  background-repeat: repeat-x;
`;

const Desc = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  span {
    display: inline-block;
    padding: 0 10px;
    font: bold italic 64px/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
    background: ${(props) => props.theme.fontColor};
    color: #f1f1f1;
  }
`;

const TextAbout = styled.div``;

const TextMe = styled.div`
  margin-bottom: 100px;
`;

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
      <Bar />
      <Inner className="inner">
        <Desc>
          <TextAbout>
            <span>ABOUT</span>
          </TextAbout>
          <TextMe>
            <span>ME</span>
          </TextMe>
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
      </Inner>
      <Bar />
    </Container>
  );
};

export default About;
