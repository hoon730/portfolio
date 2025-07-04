import { useState, useEffect, useCallback, useMemo } from "react";
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

interface HeaderProps {
  isClick: boolean;
  projectClick: boolean;
}

const Header = ({ isClick, projectClick }: HeaderProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isMenuClick, setIsMenuClick] = useState(false);
  const [isLogoClick, setIsLogoClick] = useState(false);

  const navArr = useMemo(() => ["HOME", "PROJECTS", "CONTACT"], []);

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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY && currentScrollY > 70) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 성능 최적화: DOM 조작 최적화
  useEffect(() => {
    const navItems = document.querySelectorAll(".navItem");

    if (navItems.length === 0) return;

    navItems.forEach((item, index) => {
      const txt = navArr[index];
      if (!txt) return;

      // 기존 내용 정리
      item.innerHTML = "";

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < txt.length; i++) {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = txt[i];
        span.setAttribute("key", String(i));
        fragment.appendChild(span);
      }
      item.appendChild(fragment);
    });
  }, [navArr]);

  const scrollToTop = useCallback(() => {
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
  }, []);

  const handleMenuClick = useCallback(() => {
    setIsMenuClick(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsMouseOn(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOn(false);
  }, []);

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMenuClick}
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
