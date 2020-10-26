import React from "react";
import styled from "@emotion/styled";


const LogoText = styled.h1`
  font-family: "IMFell", "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 10rem;
  color: #722F37;
  margin: 0;
  text-align: center;
`;

const Logo = () => {
    return <LogoText>WineRate</LogoText>;
};

export default Logo;