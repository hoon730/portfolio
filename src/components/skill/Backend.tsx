import React from "react";
import styled from "styled-components";
import { backendData } from "../../utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Container = styled.div`
  height: 66.66%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  & > div {
    width: 84%;
    display: flex;
    flex-direction: column;
    align-items: end;
  }
`;

const Title = styled.div`
  display: flex;
  font-weight: 900;
  font-size: 4rem;
  padding-bottom: 7px;
  letter-spacing: 4px;
  position: relative;
  border-top: 3px solid ${(props) => props.theme.fontColor};
  border-bottom: 3px solid ${(props) => props.theme.fontColor};

  span:last-child {
    margin-top: 6px;
    font-size: 1.8rem;
  }
`;
const Stacks = styled.div`
  padding-top: 20px;
  /* display: flex; */
  /* justify-content: flex-end; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;
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

const Backend = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".backend",
        start: "+=0",
        end: "+=200",
        pin: true,
        scrub: true,
        markers: true,
      },
    });

    tl.to(".frontend", {});
  }, []);

  return (
    <Container className="backend">
      <div>
        <Title>
          <span>BACKEND</span>
          <span>®</span>
        </Title>
        <Stacks>
          {backendData.map((data, idx) => (
            <Stack key={idx}>
              <ImgBox>
                <StackImg src={data.imgPath} />
              </ImgBox>
              <StackName>{data.name}</StackName>
            </Stack>
          ))}
        </Stacks>
      </div>
    </Container>
  );
};

export default Backend;
