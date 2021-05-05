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
      <h1>GoodBois</h1>
      <button onClick={handleRedirect}>Sign in</button>
    </HomeStyle>
  );
};

const HomeStyle = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  h1 {
    font-family: "Pacifico", sans-serif;
  }
  button {
    width: 20%;
    height: 5%;
    padding: 10px;
    color: white;
    background-color: var(--orange-background-color);
    border: 2px solid var(--orange-background-color);
    border-radius: 6%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--orange-background-color);
      color: var(--orange-background-color);
      background-color: white;
    }
  }
`;

export default HomeContainer;
