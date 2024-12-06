import React from "react";
import styled from "styled-components";
import { getFormattedDate } from "../utils";

const Container = styled.section``;

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ContactBox = styled.div`
  display: flex;
  width: 100%;
  border-top: 5px solid ${(props) => props.theme.fontColor};
  border-bottom: 5px solid ${(props) => props.theme.fontColor};

  & > div {
    width: 50%;
  }
`;

const ContactLeft = styled.div``;
const ContactRight = styled.div``;

const Title = styled.span`
  padding: 5px 10px;
  font: 400 ${(props) => props.theme.fsLarge} "Fira Code", monospace;
  letter-spacing: 1px;
  color: #f0f0f0;
  background: ${(props) => props.theme.fontColor};
`;
const Goobyewords = styled.div`
  padding-top: 60px;
  font: bold 8rem/110px "Archivo Narrow", sans-serif;
`;
const TopWords = styled.div``;
const BottomWords = styled.div`
  display: flex;
  flex-direction: column;
`;
const Barcode = styled.div`
  padding: 60px 0;
  font: normal 5rem "Libre Barcode 128 Text", system-ui;
`;

const ContactMethod = styled.div`
  padding-top: 60px;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font: bold 2rem "Archivo Narrow", sans-serif;

  & > div {
    width: 66.66%;
    height: 110px;
    display: flex;
    align-items: flex-end;
    padding-bottom: 5px;
    border-bottom: 5px solid ${(props) => props.theme.fontColor};
  }
`;
const Email = styled.div``;
const Github = styled.div``;
const Phone = styled.div``;

const Contact = () => {
  return (
    <Container>
      <Inner className="inner">
        <Wrapper>
          <ContactBox>
            <ContactLeft>
              <Title>{getFormattedDate(new Date())}</Title>
              <Goobyewords>
                <TopWords>THANK YOU</TopWords>
                <BottomWords>
                  <span>FOR</span>
                  <span>VISITING</span>
                </BottomWords>
              </Goobyewords>
              <Barcode>SCROLL TO TOP</Barcode>
            </ContactLeft>
            <ContactRight>
              <Title>CONTACT</Title>
              <ContactMethod>
                <Email>
                  <span>EMAIL</span>
                </Email>
                <Github>
                  <span>GITHUB</span>
                </Github>
                <Phone>
                  <span>PHONE</span>
                </Phone>
              </ContactMethod>
            </ContactRight>
          </ContactBox>
        </Wrapper>
      </Inner>
    </Container>
  );
};

export default Contact;
