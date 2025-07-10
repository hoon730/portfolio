import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import styled, { keyframes, css } from "styled-components";
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
    transform: translateY(100vh);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const Background = styled.div<{ $isMenuClick: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  transition: transform 0.5s ease-out;

  &.active {
    transform: translateY(0);
  }
`;

const Rolling = styled.div<{ $isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
  pointer-events: none;
  transform: translateY(100vh);
  z-index: 999;
  animation: ${({ $isActive }) =>
    $isActive
      ? css`
          ${roll} 2.5s 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) both
        `
      : "none"};
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

  @media (max-width: 430px) {
    width: 100%;
    height: 100vh;
    justify-content: space-between;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px 30px;
  @media (max-width: 430px) {
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
      cursor: pointer;

      div {
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

  @media (max-width: 430px) {
    ul {
      flex-direction: column;
      align-items: center;
      gap: 45px;
      padding: 50px 0;

      li {
        div {
          font: bold italic 3.5rem/1 "Archivo Narrow", sans-serif;
        }
      }
    }
  }
`;

const CloseBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Close = styled.div`
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease-out;
  margin-bottom: 10px;

  svg {
    transition: all 0.3s ease-out;
    font-size: 2.5rem;
    color: #eee;
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

      svg {
        color: #333;
        font-size: 1.9rem;
        transition: all 0.3s ease-out;
      }
    }
  }

  @media (max-width: 430px) {
    gap: 20px;

    h3 {
      font: bold 1rem/1 "Archivo Narrow", sans-serif;
      text-align: center;
    }

    ul {
      justify-content: center;

      li {
        svg {
          font-size: 2.2rem;
        }
      }
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
    span {
      padding: 0 5px;
      background: #333;
      font: bold italic 0.9rem/1 "Archivo Narrow", sans-serif;
      color: #f0f0f0;
      letter-spacing: 2px;
    }
  }

  @media (max-width: 430px) {
    padding: 40px 30px;
    text-align: center;
    h3 {
      span {
        font: bold italic 1rem/1 "Archivo Narrow", sans-serif;
      }
    }
  }
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 430px) {
    gap: 5px;
    span {
      font-size: 1rem;
    }
  }
`;

interface MenuProps {
  isMenuClick: boolean;
  setIsMenuClick: (value: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ isMenuClick, setIsMenuClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [isNavClick, setIsNavClick] = useState(false);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const navTopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navBottomRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 성능 최적화: navItems를 useMemo로 메모이제이션
  const navItems = useMemo(
    () => [
      { name: "HOME", id: "home" },
      { name: "ABOUT", id: "about" },
      { name: "WORK", id: "work" },
    ],
    []
  );

  // 성능 최적화: DOM 조작 최적화
  useEffect(() => {
    navItems.forEach((item, index) => {
      const topRef = navTopRefs.current[index];
      const bottomRef = navBottomRefs.current[index];

      if (topRef && bottomRef && !topRef.hasChildNodes()) {
        const topFragment = document.createDocumentFragment();
        const bottomFragment = document.createDocumentFragment();

        item.name.split("").forEach((char) => {
          const topSpan = document.createElement("span");
          const bottomSpan = document.createElement("span");

          topSpan.textContent = char;
          topSpan.classList.add("topSpan");
          bottomSpan.textContent = char;
          bottomSpan.classList.add("bottomSpan");

          topFragment.appendChild(topSpan);
          bottomFragment.appendChild(bottomSpan);
        });

        topRef.appendChild(topFragment);
        bottomRef.appendChild(bottomFragment);
      }
    });
  }, [navItems]);

  useEffect(() => {
    if (isNavClick) {
      const timer = setTimeout(() => {
        setIsNavClick(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isNavClick]);

  // 성능 최적화: useCallback으로 이벤트 핸들러 최적화
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
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
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
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
    },
    []
  );

  const startRotating = useCallback(() => {
    if (closeRef.current) {
      gsap.to(closeRef.current, {
        rotate: 90,
        transformOrigin: "50% 50%",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, []);

  const endRotating = useCallback(() => {
    if (closeRef.current) {
      gsap.to(closeRef.current, {
        rotate: -90,
        transformOrigin: "50% 50%",
        duration: 0.5,
        ease: "power1.out",
      });
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    gsap.set(window, { scrollTo: { y: `#${id}` } });
  }, []);

  const handleNavClick = useCallback(
    (id: string) => {
      if (window.innerWidth > 430) {
        // 1. Container 먼저 올라가기 시작
        setIsMenuClick(false);

        // 2. Container가 완전히 올라간 후 Rolling 애니메이션 시작
        setTimeout(() => {
          setIsActive(true);
        }, 500); // Container transition 시간(0.5s) 후

        // 3. Rolling 애니메이션 40%~60% 구간(화면이 완전히 가려진 상태)에서 스크롤 이동
        setTimeout(() => {
          scrollToSection(id);
        }, 1500); // Container(0.5s) + Rolling delay(0.2s) + Rolling 50% 지점(0.8s)

        // 4. Rolling 애니메이션 완료 후 상태 초기화
        setTimeout(() => {
          setIsActive(false);
        }, 3700); // Container(0.5s) + Rolling 전체 시간(3.2s)
      } else {
        setTimeout(() => {
          scrollToSection(id);
          setIsMenuClick(false);
        }, 500);
      }
    },
    [scrollToSection, setIsMenuClick]
  );

  const handleBackgroundClick = useCallback(() => {
    setIsMenuClick(false);
  }, [setIsMenuClick]);

  const handleCloseClick = useCallback(() => {
    setIsMenuClick(false);
  }, [setIsMenuClick]);

  return (
    <>
      <Background
        ref={backgroundRef}
        $isMenuClick={isMenuClick}
        className={isMenuClick ? "active" : ""}
        onClick={handleBackgroundClick}
      />
      <Rolling $isActive={isActive} />
      <Container className={isMenuClick ? "active" : ""}>
        <Top>
          <div>
            <CloseBox>
              <Close
                ref={closeRef}
                onClick={handleCloseClick}
                onMouseEnter={startRotating}
                onMouseLeave={endRotating}
              >
                <IoClose />
              </Close>
            </CloseBox>
            <Nav>
              <ul>
                {navItems.map((item, idx) => (
                  <li
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, idx)}
                    onMouseLeave={(e) => handleMouseLeave(e, idx)}
                  >
                    <div
                      ref={(el) => el && (navTopRefs.current[idx] = el)}
                    ></div>
                    <div
                      ref={(el) => el && (navBottomRefs.current[idx] = el)}
                    ></div>
                  </li>
                ))}
              </ul>
            </Nav>
          </div>
          <Contact>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:ehdgns730@gmail.com">
                  <CiMail />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hoon730"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoGithub />
                </a>
              </li>
              <li>
                <a href="tel:01043487148">
                  <CiMobile3 />
                </a>
              </li>
            </ul>
          </Contact>
        </Top>
        <Bottom>
          <h3>
            <span>FRONTEND DEVELOPER</span>
          </h3>
          <Time>
            <span>{getFormattedDate(new Date())}</span>
            <span>{getFormattedTime(new Date())}</span>
          </Time>
        </Bottom>
      </Container>
    </>
  );
};

export default React.memo(Menu);
