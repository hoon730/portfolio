import React from "react";
import styled from "styled-components";
import { databaseData } from "../../utils";

const Container = styled.div`
  height: 66.66%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  & > div {
    width: 84%;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const Title = styled.div`
  display: flex;
  font-weight: 900;
  font-size: 4rem;
  padding-bottom: 7px;
  letter-spacing: 5px;
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
  display: flex;
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
  return (
    <Container>
      <div>
        <Title>
          <span>UTILITIES</span>
          <span>®</span>
        </Title>
        <Stacks>
          {databaseData.map((data, idx) => (
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
