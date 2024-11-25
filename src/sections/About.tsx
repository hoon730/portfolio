import { useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.section``;

const Inner = styled.div`
  padding: 6% 0;
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
    color: #fff;
  }
`;

const TextBox = styled.div``;

const TextAbout = styled.div`
  overflow: hidden;
  span {
    transform: translateY(100%);
  }
`;

const TextMe = styled.div`
  overflow: hidden;
  span {
    transform: translateY(100%);
  }
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  div {
    overflow: hidden;
    p {
      font-size: ${(props) => props.theme.fsExtraLarge};
      font-family: "Archivo Narrow", sans-serif;
      text-align: justify;
      transform: translateY(100%);
    }
  }
`;

const Intro1 = styled.div``;

const Intro2 = styled.div``;

const PhotoBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.div`
  width: 433px;
  height: 500px;
  position: relative;
  display: flex;
  overflow: hidden;
  gap: 1%;
`;

const Barcode = styled.div<BarcodeProps>`
  width: ${(props) => props.width || "5%"};
  height: 100%;
  background: ${(props) => props.theme.fontColor};
  margin-right: ${(props) => props.gap || "2%"};
  background: #000;
  transform: translateY(100%);
`;

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale();
    /* background: #ffffa0; */
    border: 20px solid #fff;
  }
`;

interface BarcodeProps {
  width: string;
  gap: string;
}

const barcodes = [
  { width: "1%", gap: "1%" },
  { width: "5%", gap: "2%" },
  { width: "3%", gap: "1%" },
  { width: "2%", gap: "3%" },
  { width: "3%", gap: "2%" },
  { width: "4%", gap: "1%" },
  { width: "1%", gap: "1%" },
  { width: "2%", gap: "1%" },
  { width: "4%", gap: "2%" },
  { width: "2%", gap: "1%" },
  { width: "3%", gap: "3%" },
  { width: "1%", gap: "2%" },
  { width: "4%", gap: "1%" },
  { width: "1%", gap: "1%" },
  { width: "3%", gap: "2%" },
  { width: "3%", gap: "1%" },
  { width: "2%", gap: "3%" },
  { width: "2%", gap: "1%" },
  { width: "3%", gap: "1%" },
];

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "+=0",
        end: "+=1000",
        pin: true,
        scrub: true,
        markers: true,
      },
    });

    tl.to(".about, .me, .intro1, .intro2, .barcode", {
      y: "0",
      ease: "power3.out",
      stagger: 0.2,
    });
  }, []);

  return (
    <Container>
      <Inner ref={aboutRef} className="inner">
        {/* <Bar /> */}
        <Contents>
          <Desc>
            <TextBox>
              <TextAbout>
                <span className="about">ABOUT</span>
              </TextAbout>
              <TextMe>
                <span className="me">ME</span>
              </TextMe>
            </TextBox>
            <Introduction>
              <Intro1>
                <p className="intro1">
                  Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet
                  consectetur Mi vulputateametvulputate interdum .Bibendum a
                  imperdiet tortor purus dolor id.
                </p>
              </Intro1>
              <Intro2>
                <p className="intro2">
                  Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet
                  consectetur Mi vulputateametvulputate interdum .Bibendum a
                  imperdiet tortor purus dolor id.
                </p>
              </Intro2>
            </Introduction>
          </Desc>
          <PhotoBox>
            <Photo>
              {barcodes.map((barcode, index) => (
                <Barcode
                  className="barcode"
                  key={index}
                  width={barcode.width}
                  gap={barcode.gap}
                />
              ))}
              <ImgBox>
                <img src="/img/about/sideeyes.png" />
              </ImgBox>
            </Photo>
          </PhotoBox>
        </Contents>
        {/* <Bar /> */}
      </Inner>
    </Container>
  );
};

export default About;
