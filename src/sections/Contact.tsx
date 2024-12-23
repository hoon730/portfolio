import { useRef } from "react";
import styled from "styled-components";
import { getFormattedDate } from "../utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.section``;

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const BigBar = styled.div`
  width: 0;
  height: 5px;
  background: ${(props) => props.theme.fontColor};
  transition: width 0.5s ease-out;
`;

const SmallBar = styled.div`
  width: 0;
  height: 5px;
  background: ${(props) => props.theme.fontColor};
  transition: width 0.5s ease-out;
`;

const ContactBox = styled.div`
  display: flex;
  width: 100%;

  & > div {
    width: 50%;
  }
`;

const ContactLeft = styled.div``;
const ContactRight = styled.div``;

const Title = styled.span`
  padding: 5px 10px;
  font: 400 ${(props) => props.theme.fsLarge} "Fira Code", monospace;
  letter-spacing: 1px;
  color: #f0f0f0;
  background: ${(props) => props.theme.fontColor};
`;
const Goobyewords = styled.div`
  padding-top: 60px;
  font: bold 8rem/110px "Archivo Narrow", sans-serif;
`;
const TopWords = styled.div``;
const BottomWords = styled.div`
  display: flex;
  flex-direction: column;
`;
const Barcode = styled.div`
  padding: 60px 0;
  font: normal 5rem "Libre Barcode 128 Text", system-ui;
  cursor: pointer;
`;

const ContactMethod = styled.div`
  padding-top: 60px;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font: bold 2rem "Archivo Narrow", sans-serif;

  & > div {
    width: 66.66%;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 5px;
  }
`;
const Email = styled.div``;
const Github = styled.div``;
const Phone = styled.div``;

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);

  const ClickBarcode = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(() => {
    const smallBars = document.querySelectorAll(".smallBar");
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom",
        markers: true,
      },
    });

    contactTimeline.to(".bigBar", {
      width: "100%",
      duration: 0.3,
      ease: "power1.inOut",
    });

    smallBars.forEach((smallBar) => {
      contactTimeline.to(smallBar, {
        width: "100%",
        duration: 0.2,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <Container ref={containerRef}>
      <Inner className="inner">
        <Wrapper className="wrapper">
          <BigBar className="bigBar" />
          <ContactBox>
            <ContactLeft>
              <Title>{getFormattedDate(new Date())}</Title>
              <Goobyewords>
                <TopWords>THANK YOU</TopWords>
                <BottomWords>
                  <span>FOR</span>
                  <span>VISITING</span>
                </BottomWords>
              </Goobyewords>
              <Barcode ref={barcodeRef} onClick={ClickBarcode}>
                SCROLL TO TOP
              </Barcode>
            </ContactLeft>
            <ContactRight>
              <Title>CONTACT</Title>
              <ContactMethod>
                <Email>
                  <span>EMAIL</span>
                  <SmallBar className="smallBar" />
                </Email>
                <Github>
                  <span>GITHUB</span>
                  <SmallBar className="smallBar" />
                </Github>
                <Phone>
                  <span>PHONE</span>
                  <SmallBar className="smallBar" />
                </Phone>
              </ContactMethod>
            </ContactRight>
          </ContactBox>
          <BigBar className="bigBar" />
        </Wrapper>
      </Inner>
    </Container>
  );
};

export default Contact;
