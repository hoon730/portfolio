import styled from "styled-components";

const Container = styled.div<{ rotate: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #000;
  transform: ${(props) => props.rotate};
  background: ${(props) => props.theme.bgColor};
  backface-visibility: hidden;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 35px;
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

  @media (max-width: 768px) {
    font-size: 8.3333vw;
    span:last-child {
      margin-top: 0.7813vw;
      font-size: 3.6458vw;
    }
  }

  @media (max-width: 430px) {
    letter-spacing: 5px;
    padding-bottom: 5px;
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

  @media (max-width: 768px) {
    width: 10.2865vw;
    height: 10.2865vw;
  }
`;

const StackImg = styled.img`
  @media (max-width: 768px) {
    width: 7.8125vw;
    height: 7.8125vw;
  }
`;

const StackName = styled.span`
  font-size: ${(props) => props.theme.fsSmall};
  font-weight: 550;
  text-align: center;

  @media (max-width: 768px) {
    /* display: none; */
    font-size: 1.8229vw;
  }
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
