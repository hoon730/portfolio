import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  height: 510px;
  &.active {
    border: 3px solid #d5181c;
  }
`;

const Scanner = ({ isMouseEnter }: { isMouseEnter: boolean }) => {
  return <Wrapper className={isMouseEnter ? "active" : ""}></Wrapper>;
};

export default Scanner;
