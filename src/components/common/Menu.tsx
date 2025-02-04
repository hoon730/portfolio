import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { IoClose } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";
import { getFormattedDate, getFormattedTime } from "../../utils";

gsap.registerPlugin(ScrollToPlugin);

const roll = keyframes`
  0% {
    height: 0;
    background: #f0f0f0;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 0;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: none;

  &.active {
    display: block;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  width: 450px;
  display: flex;
  flex-direction: column;
  background: #7a7b83;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
  transform: translateY(-100%);
  transition: transform 0.5s ease-out;
  transition-delay: 0.1s;

  &.active {
    transform: translateY(0);
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 30px;
  margin-bottom: 20px;

  & > div {
    :first-child {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 18px;
    padding: 10px 0;

    li {
      overflow: hidden;
      position: relative;

      a {
        display: inline-block;
        font: bold italic 2.2rem/1 "Archivo Narrow", sans-serif;
        letter-spacing: 1px;
        color: #f0f0f0;
        transition: background 0.3s ease-out;

        &:first-child {
          padding: 0 10px;
          span {
            display: inline-block;
          }
        }

        &:last-child {
          position: absolute;
          top: 100%;
          left: 0;
          span {
            transform: translateY(100%);
            display: inline-block;
            background-color: ${(props) => props.theme.fontColor};

            &:first-child {
              padding-left: 10px;
            }
            &:last-child {
              padding-right: 10px;
            }
          }
        }
      }
    }
  }
`;

const Close = styled.div`
  padding-top: 15px;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    font: bold 0.9rem/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
    text-align: right;
  }
  ul {
    display: flex;
    justify-content: flex-end;
    gap: 40px;

    li {
      border-radius: 10px;
      padding: 5px;
      transition: all 0.3s ease-out;
      &:hover {
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

        svg {
          color: #eee;
        }
      }
    }

    svg {
      color: #333;
      font-size: 1.9rem;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px 30px;
  background: #64656b;
  color: #f0f0f0;
  text-align: right;
  font-size: 0.9rem;
  letter-spacing: 0.5px;

  h3 {
    font: bold 0.9rem/1 "Archivo Narrow", sans-serif;
    color: ${(props) => props.theme.fontColor};
    letter-spacing: 2px;
  }
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
`;

interface MenuProps {
  isMenuClick: boolean;
  setIsMenuClick: (value: boolean) => void;
}

const Menu = ({ isMenuClick, setIsMenuClick }: MenuProps) => {
  const [isNavClick, setIsNavClick] = useState(false);
  const navTopRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navBottomRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const navItems = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "WORK", id: "work" },
  ];

  useEffect(() => {
    navItems.forEach((text, index) => {
      if (navTopRefs.current[index] && navBottomRefs.current[index]) {
        text.name.split("").forEach((char) => {
          const topSpan = document.createElement("span");
          const bottomSpan = document.createElement("span");
          topSpan.textContent = char;
          topSpan.classList.add("topSpan");
          bottomSpan.textContent = char;
          bottomSpan.classList.add("bottomSpan");
          navTopRefs.current[index]?.appendChild(topSpan);
          navBottomRefs.current[index]?.appendChild(bottomSpan);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (isNavClick && backgroundRef.current) {
      backgroundRef.current.style.animation = `${roll} 0.5s 0.3s ease-out both`;
      setIsNavClick(false);
    }
  }, []);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLLIElement>,
    idx: number
  ) => {
    const topSpan = e.currentTarget.querySelectorAll(".topSpan");
    const bottomSpan = e.currentTarget.querySelectorAll(".bottomSpan");
    const secondRef = navBottomRefs.current[idx];
    gsap.to(topSpan, {
      y: "-100%",
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.out",
    });
    gsap.to(secondRef, {
      top: 0,
    });
    gsap.to(bottomSpan, {
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLLIElement>,
    idx: number
  ) => {
    const topSpan = e.currentTarget.querySelectorAll(".topSpan");
    const bottomSpan = e.currentTarget.querySelectorAll(".bottomSpan");
    const secondRef = navBottomRefs.current[idx];
    gsap.to(topSpan, {
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.out",
    });
    gsap.to(secondRef, {
      top: "100%",
    });
    gsap.to(bottomSpan, {
      y: "100%",
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.in",
    });
  };

  const startRotating = () => {
    gsap.to(closeRef.current, {
      rotate: 90,
      transformOrigin: "50% 50%",
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const endRotating = () => {
    gsap.to(closeRef.current, {
      rotate: -90,
      transformOrigin: "50% 50%",
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}` },
      ease: "power2.out",
    });
  };

  return (
    <>
      <Background
        ref={backgroundRef}
        className={isMenuClick ? "active" : ""}
        onClick={() => setIsMenuClick(false)}
      />
      <Container className={isMenuClick ? "active" : ""}>
        <Top>
          <div>
            <div>
              <Close
                ref={closeRef}
                onClick={() => setIsMenuClick(false)}
                onMouseEnter={startRotating}
                onMouseLeave={endRotating}
              >
                <IoClose />
              </Close>
            </div>
            <Nav>
              <ul>
                {navItems.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsNavClick(true);
                    }}
                    onMouseEnter={(e) => handleMouseEnter(e, idx)}
                    onMouseLeave={(e) => handleMouseLeave(e, idx)}
                  >
                    <a
                      href="#none"
                      ref={(el) => (navTopRefs.current[idx] = el)}
                    ></a>
                    <a
                      href="#none"
                      ref={(el) => (navBottomRefs.current[idx] = el)}
                    ></a>
                  </li>
                ))}
              </ul>
            </Nav>
          </div>
          <Contact>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="#none">
                  <CiMail />
                </a>
              </li>
              <li>
                <a href="#none">
                  <IoLogoGithub />
                </a>
              </li>
              <li>
                <a href="#none">
                  <CiMobile3 />
                </a>
              </li>
            </ul>
          </Contact>
        </Top>
        <Bottom>
          <h3>Fontend Developer</h3>
          <Time>
            <span>{getFormattedDate(new Date())}</span>
            <span>{getFormattedTime(new Date())}</span>
          </Time>
        </Bottom>
      </Container>
    </>
  );
};

export default Menu;
