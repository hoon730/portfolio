import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: -100%;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 15;

  transition: top 0.5s ease-in-out;

  &.active {
    top: 0;
  }
`;

const Item = styled.div`
  & div {
    font-size: 4rem;
    font-weight: bold;
    padding: 0.5rem;
    letter-spacing: 1.5px;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 1.8rem;
  height: 1.8rem;
  z-index: 16;
  cursor: pointer;
`;

const Bar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 4px;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.fontColor};

  &:first-child {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:last-child {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

interface menuProps {
  menuClick: boolean;
  setMenuClick: (value: boolean) => void;
}

const Menu = ({ menuClick, setMenuClick }: menuProps) => {
  return (
    <Container className={menuClick ? "active" : ""}>
      <Item>
        <div>ABOUT</div>
      </Item>
      <Item>
        <div>SKILL</div>
      </Item>
      <Item>
        <div>WORK</div>
      </Item>
      <Item>
        <div>CONTACT</div>
      </Item>
      <Close onClick={() => setMenuClick(false)}>
        <Bar />
        <Bar />
      </Close>
    </Container>
  );
};

export default Menu;
