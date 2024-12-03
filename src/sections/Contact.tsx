import React from "react";
import styled from "styled-components";

const Container = styled.section``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GoodbyeWords = styled.div`
  font: 600 9.5rem/128px "Archivo Narrow", sans-serif;
  text-align: center;
  margin-bottom: 80px;
`;
const Barcode = styled.div`
  font: normal 5rem/1 "Libre Barcode 128 Text", system-ui;
  margin-bottom: 100px;
`;

const ContactMethod = styled.div`
  display: flex;
  justify-content: center;
  gap: 20%;
  font: 300 2rem/1 "Fira Code", monospace;
`;
const Email = styled.div``;
const Github = styled.div``;
const Phone = styled.div``;

const Contact = () => {
  return (
    <Container>
      <Inner className="inner">
        <GoodbyeWords>
          THANK YOU
          <br /> FOR VISITING
        </GoodbyeWords>
        <Barcode>YEOM DONG HOON</Barcode>
        <ContactMethod>
          <Email>EMAIL</Email>
          <Github>GITHUB</Github>
          <Phone>PHONE</Phone>
        </ContactMethod>
      </Inner>
    </Container>
  );
};

export default Contact;
