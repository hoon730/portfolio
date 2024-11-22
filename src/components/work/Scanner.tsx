import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 510px;
  height: 510px;
  border: 3px solid #d5181c;
`;

const Scanner = ({ isMouseEnter }: { isMouseEnter: boolean }) => {
  return (
    <Wrapper
      layoutId={"wrapper"}
      className={isMouseEnter ? "active" : ""}
    ></Wrapper>
  );
};

export default Scanner;
