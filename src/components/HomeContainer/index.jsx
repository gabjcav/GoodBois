import React from "react";
import styled from "styled-components";

const HomeContainer = () => {
  return (
    <HomeStyle>
      <h1>Welcome to GoodBois</h1>
      <button>Register</button>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  height: 100%;
  width: 100%;
`;

export default HomeContainer;
