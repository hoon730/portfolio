import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import Menu from "./Menu";

gsap.registerPlugin(CSSPlugin, ScrollToPlugin);

const roll = keyframes`
  0% {
    height: 0;
    background: #f0f0f0;
  }
  40% {
    height: 100%;
  }
  60% {
    height: 100%;
  }
  100% {
    height: 0;
  }
`;

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
    width: 75%;
  }
`;

const ThirdBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 50%;
  }
`;

const Container = styled.header<{ $projectClick: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 70px;
  padding: 0 30px;
  display: ${({ $projectClick }) => ($projectClick ? "none" : "flex")};
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &.active {
    opacity: 0;
  }

  @media (max-width: 768px) {
    height: 57px;
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
  cursor: pointer;
  @media (max-width: 430px) {
    font: bold 28px/1 "Archivo Narrow", sans-serif;
  }
`;

const MenuIcon = styled.button`
  overflow: hidden;
`;

const BarBox = styled.div`
  width: 1.7rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
    width: 75%;
    &.active {
      animation: ${SecondBar} 0.3s ease-out both;
    }
  }
  &:nth-child(3) {
    width: 50%;
    &.active {
      animation: ${ThirdBar} 0.3s ease-out both;
    }
  }
`;

const Rolling = styled.div<{ $isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: #f0f0f0;
  pointer-events: none;
  z-index: 1000;
  animation: ${({ $isActive }) =>
    $isActive
      ? css`
          ${roll} 1.5s 0.2s ease-out both
        `
      : "none"};
`;

interface isClickProps {
  isClick: boolean;
  projectClick: boolean;
}

const Header = ({ isClick, projectClick }: isClickProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isMenuClick, setIsMenuClick] = useState(false);
  const [isLogoClick, setIsLogoClick] = useState(false);

  useEffect(() => {
    scrollValue;
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (isClick) {
      tl.to([".logo_box", ".logo", ".barBox"], {
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

  const navArr = ["HOME", "PROJECTS", "CONTACT"];

  useEffect(() => {
    const navItems = document.querySelectorAll(".navItem");

    navItems.forEach((item, index) => {
      const txt = navArr[index];

      const txtLength = txt.length;
      for (let i = 0; i < txtLength; i++) {
        const span = document.createElement("span");
        span.className = "letter";
        span.innerHTML = txt[i];
        span.setAttribute("key", String(i));
        item.appendChild(span);
      }
    });
  }, []);

  const scrollToTop = () => {
    setIsLogoClick(true);

    setTimeout(() => {
      gsap.to(window, {
        duration: 0.3,
        scrollTo: { y: 0, autoKill: false },
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            setIsLogoClick(false);
          }, 1000);
        },
      });
    }, 800);
  };

  return (
    <Container
      className={isHidden ? "active" : ""}
      $projectClick={projectClick}
    >
      <Rolling $isActive={isLogoClick} />
      <LogoBox className="logo_box">
        <Logo className="logo" onClick={scrollToTop}>
          YDH
        </Logo>
      </LogoBox>

      <MenuIcon
        onMouseEnter={() => setIsMouseOn(true)}
        onMouseLeave={() => setIsMouseOn(false)}
        onClick={() => setIsMenuClick(true)}
      >
        <BarBox className="barBox">
          <Bar className={isMouseOn ? "active" : ""} />
          <Bar className={isMouseOn ? "active" : ""} />
          <Bar className={isMouseOn ? "active" : ""} />
        </BarBox>
      </MenuIcon>
      <Menu isMenuClick={isMenuClick} setIsMenuClick={setIsMenuClick} />
    </Container>
  );
};

export default Header;
