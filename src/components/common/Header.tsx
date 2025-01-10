import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { useGSAP } from "@gsap/react";

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

const RisingLetter = keyframes`
  0% {
    transform: translateY(20px);
  }
  50%{
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
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

  @media (max-width: 430px) {
    display: none;
  }
`;

const Nav = styled.nav`
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px dashed ${(props) => props.theme.fontColor};
  border-radius: 15px;
  ul {
    display: flex;
    gap: 17px;

    li a {
      font: 500 17px/1 "Fira Code", monospace;
      letter-spacing: -0.2px;
      overflow: hidden;
      display: flex;

      span.letter.active {
        display: block;
        animation: ${RisingLetter} 0.3s ease-out both;
      }
    }
  }
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

  @media (max-width: 430px) {
    display: none;
  }
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
}

const Header = ({ isClick }: isClickProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [isMouseOn, setIsMouseOn] = useState(false);

  useEffect(() => {
    scrollValue;
  }, []);

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

  const showLetters = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget.querySelectorAll<HTMLSpanElement>(".letter");

    target.forEach((letter, i) => {
      setTimeout(() => {
        letter.classList.add("active");
      }, 60 * (i + 1));
    });
  };

  return (
    <Container className={isHidden ? "active" : ""}>
      <LogoBox className="logo_box">
        <Logo className="logo">YDH</Logo>
      </LogoBox>
      <Nav>
        <ul>
          {navArr.map((_, idx) => (
            <li key={idx} onMouseEnter={showLetters} onMouseLeave={showLetters}>
              <a className="navItem" href="#none"></a>
            </li>
          ))}
        </ul>
      </Nav>
      <MenuIcon
        onMouseEnter={() => setIsMouseOn(true)}
        onMouseLeave={() => setIsMouseOn(false)}
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
