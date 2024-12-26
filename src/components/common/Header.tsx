import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { BiMenuAltLeft } from "react-icons/bi";

import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useGSAP } from "@gsap/react";
import Menu from "./Menu";

gsap.registerPlugin(CSSPlugin);

const FirstBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const SecondBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 70%;
  }
`;

const ThirdBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 40%;
  }
`;

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

  @media (max-width: 768px) {
    padding: 0 20px;
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

const MenuIcon = styled.button`
  overflow: hidden;
`;

const BarBox = styled.div`
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform: translateY(150%);
`;

const Bar = styled.span`
  height: 3px;
  background: ${(props) => props.theme.fontColor};

  &:nth-child(1) {
    width: 100%;
    &.active {
      animation: ${FirstBar} 0.3s ease-in-out both;
    }
  }
  &:nth-child(2) {
    width: 70%;
    &.active {
      animation: ${SecondBar} 0.3s ease-out both;
    }
  }
  &:nth-child(3) {
    width: 40%;
    &.active {
      animation: ${ThirdBar} 0.3s ease-out both;
    }
  }
`;

interface isClickProps {
  isClick: boolean;
  setMenuClick: (value: boolean) => void;
}

const Header = ({ isClick, setMenuClick }: isClickProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [isMouseOn, setIsMouseOn] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (isClick) {
      tl.to(["logo_box", ".logo", ".barBox"], {
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
      <MenuIcon
        onMouseEnter={() => setIsMouseOn(true)}
        onMouseLeave={() => setIsMouseOn(false)}
        onClick={() => setMenuClick(true)}
      >
        <BarBox className="barBox">
          <Bar className={isMouseOn ? "active" : ""} />
          <Bar className={isMouseOn ? "active" : ""} />
          <Bar className={isMouseOn ? "active" : ""} />
        </BarBox>
      </MenuIcon>
    </Container>
  );
};

export default Header;
