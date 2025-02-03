import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

import { IoClose } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";

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
        padding: 0 10px;
        font: bold italic 2.2rem/1 "Archivo Narrow", sans-serif;
        letter-spacing: 1px;
        background: ${(props) => props.theme.fontColor};
        color: #f0f0f0;

        &:first-child span {
          display: inline-block;
        }

        &:last-child {
          position: absolute;
          top: 100%;
          left: 0;
          span {
            transform: translateY(-100%);
            display: inline-block;
          }
        }
      }
    }
  }
`;

const Close = styled.div`
  padding-top: 15px;
  text-align: right;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  h3 {
    font: bold 0.9rem/1 "Archivo Narrow", sans-serif;
    letter-spacing: 1px;
    text-align: right;
  }
  ul {
    display: flex;
    justify-content: flex-end;
    gap: 40px;

    svg {
      color: #f0f0f0;
      font-size: 1.9rem;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px 30px;
  background: #64656b;
  color: #f0f0f0;
  text-align: right;
  font-size: 0.9rem;
  letter-spacing: 0.5px;

  h3 {
    font: normal 0.9rem/1 "Archivo Narrow", sans-serif;
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
  const navTopRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navBottomRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const NavArr = ["HOME", "ABOUT", "WORK"];

  useEffect(() => {
    NavArr.forEach((text, index) => {
      if (navTopRefs.current[index] && navBottomRefs.current[index]) {
        text.split("").forEach((char) => {
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const topSpan = e.currentTarget.querySelectorAll(".topSpan");
    const bottomSpan = e.currentTarget.querySelectorAll(".bottomSpan");
    const secondRef = navBottomRefs.current;
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

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const topSpan = e.currentTarget.querySelectorAll(".topSpan");
    const bottomSpan = e.currentTarget.querySelectorAll(".bottomSpan");
    const secondRef = navBottomRefs.current;
    gsap.to(topSpan, {
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.in",
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

  return (
    <Container className={isMenuClick ? "active" : ""}>
      <Top>
        <div>
          <Close onClick={() => setIsMenuClick(false)}>
            <IoClose />
          </Close>
          <Nav>
            <ul>
              {NavArr.map((_, idx) => (
                <li
                  key={idx}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
          <span>2025-01-31</span>
          <span>13:31</span>
        </Time>
      </Bottom>
    </Container>
  );
};

export default Menu;
