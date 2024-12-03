import styled from "styled-components";
import { frontendData } from "../../utils";

const Container = styled.div<{ rotate: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  transform: ${(props) => props.rotate};
  background: ${(props) => props.theme.bgColor};
  backface-visibility: hidden;
`;

const Wrapper = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export interface skillstackProps {
  imgPath: string;
  name: string;
}

const Face = ({
  rotate,
  skills,
  title,
}: {
  rotate: string;
  skills: skillstackProps[];
  title: string;
}) => {
  return (
    <Container className="face" rotate={rotate}>
      <Wrapper>
        <Title>
          <span>{title}</span>
          <span>®</span>
        </Title>
        <Stacks>
          {skills.map((skill, idx) => (
            <Stack key={idx}>
              <ImgBox>
                <StackImg src={skill.imgPath} />
              </ImgBox>
              <StackName>{skill.name}</StackName>
            </Stack>
          ))}
        </Stacks>
      </Wrapper>
    </Container>
  );
};

export default Face;
