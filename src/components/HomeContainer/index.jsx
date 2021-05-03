import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const HomeContainer = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("login");
  };
  return (
    <HomeStyle>
      <h1>Welcome to GoodBois</h1>
      <button onClick={handleRedirect}>Sign in</button>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  height: 100%;
  width: 100%;
`;

export default HomeContainer;
