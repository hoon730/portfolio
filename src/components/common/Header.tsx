import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiMenuAltLeft } from "react-icons/bi";

import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CSSPlugin);

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 70px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &.active {
    opacity: 0;
  }
`;

const LogoBox = styled.div`
  overflow: hidden;
`;

const Logo = styled.div`
  font: bold 32px/1 "Archivo Narrow", sans-serif;
  padding: 0 5px;
  background: ${(props) => props.theme.fontColor};
  color: #f1f1f1;
  transform: translateY(150%);
`;

const Menu = styled.button`
  overflow: hidden;
  svg {
    transform: translateY(150%);
    /* font-size: ${(props) => props.theme.fsExtraLarge}; */
    font-size: 32px;
  }
`;

interface isClickProps {
  isClick: boolean;
}

const Header = ({ isClick }: isClickProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (isClick) {
      tl.to(["logo_box", ".logo", ".menu"], {
        y: 0,
        duration: 0.9,
        delay: 2,
        ease: "power1.inOut",
      });
    }
  }, [isClick]);

  useEffect(() => {
    let lastScrollY = 0;

    const updateScrollValue = () => {
      const currentScrollY = window.scrollY;
      setScrollValue(currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollValue);

    return () => {
      window.removeEventListener("scroll", updateScrollValue);
    };
  }, []);

  return (
    <Container className={isHidden ? "active" : ""}>
      <LogoBox className="logo_box">
        <Logo className="logo">YDH</Logo>
      </LogoBox>
      <Menu>
        <BiMenuAltLeft className="menu" />
      </Menu>
    </Container>
  );
};

export default Header;
