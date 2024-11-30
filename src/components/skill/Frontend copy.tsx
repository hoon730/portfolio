import React from "react";
import styled from "styled-components";
import { frontendData } from "../../utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  height: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.div`
  display: flex;
  font-weight: 900;
  font-size: 4rem;
  padding-bottom: 7px;
  letter-spacing: 7px;
  border-top: 3px solid ${(props) => props.theme.fontColor};
  border-bottom: 3px solid ${(props) => props.theme.fontColor};

  span:last-child {
    margin-top: 6px;
    font-size: 1.8rem;
  }
`;
const Stacks = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 13px;
  grid-column-gap: 8px;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ImgBox = styled.div`
  width: 79px;
  height: 79px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.fontColor};
  border-radius: 5px;
`;

const StackImg = styled.img``;

const StackName = styled.span`
  font-size: ${(props) => props.theme.fsSmall};
  font-weight: 550;
  text-align: center;
`;

const Frontend = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".frontend",
        start: "+=0",
        end: "+=0",
        pin: true,
        scrub: true,
        markers: true,
      },
    });

    tl.to(".frontend", {});
  }, []);

  return (
    <Container className="frontend">
      <Title>
        <span>FRONTEND</span>
        <span>®</span>
      </Title>
      <Stacks>
        {frontendData.map((data, idx) => (
          <Stack key={idx}>
            <ImgBox>
              <StackImg src={data.imgPath} />
            </ImgBox>
            <StackName>{data.name}</StackName>
          </Stack>
        ))}
      </Stacks>
    </Container>
  );
};

export default Frontend;
