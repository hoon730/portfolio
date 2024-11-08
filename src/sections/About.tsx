import styled from "styled-components";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, CSSPlugin);

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
  div {
    display: inline-block;
    padding: 0 10px;
    font: bold italic 64px/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
    background: ${(props) => props.theme.fontColor};
    color: #f1f1f1;
  }
`;

const TextBox = styled.div``;

const TextAbout = styled.div`
  overflow: hidden;
  div {
    transform: translateY(100%);
  }
`;

const TextMe = styled.div`
  overflow: hidden;
  div {
    transform: translateY(100%);
  }
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  div {
    overflow: hidden;
    div {
      font-size: ${(props) => props.theme.fsExtraLarge};
      font-family: "Archivo Narrow", sans-serif;
      text-align: justify;
    }
  }
`;

const Intro1 = styled.div`
  p {
    transform: translateY(100%);
  }
`;

const Intro2 = styled.div`
  p {
    transform: translateY(100%);
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
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        markers: true,
        trigger: ".inner",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });

    tl.to([".about", ".me", ".intro1", ".intro2"], {
      y: "0",
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    });
  }, []);

  return (
    <Container>
      <Inner className="inner">
        <Bar />
        <Contents>
          <Desc>
            <TextBox>
              <TextAbout>
                <div className="about">ABOUT</div>
              </TextAbout>
              <TextMe>
                <div className="me">ME</div>
              </TextMe>
            </TextBox>
            <Introduction>
              <Intro1>
                <div className="intro1">
                  Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet
                  consectetur Mi vulputateametvulputate interdum .Bibendum a
                  imperdiet tortor purus dolor id.
                </div>
              </Intro1>
              <Intro2>
                <div className="intro2">
                  Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet
                  consectetur Mi vulputateametvulputate interdum .Bibendum a
                  imperdiet tortor purus dolor id.
                </div>
              </Intro2>
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
