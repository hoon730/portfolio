import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 26vw;
  height: 26vw;
  z-index: 10;
  border: 3px solid red;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

interface StyleProps {
  left: string;
}

const Scanner = ({ style }: { style: StyleProps }) => {
  return <Wrapper style={style} layoutId={"wrapper"}></Wrapper>;
};

export default Scanner;
