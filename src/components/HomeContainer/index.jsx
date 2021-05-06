import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/context";
const HomeContainer = () => {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();
  const handleRedirectLogin = () => {
    history.push("login");
  };
  const handleRedirectProfile = () => {
    history.push("profile");
  };
  return (
    <HomeStyle>
      <h1>GoodBois</h1>
      {!isAuthenticated && (
        <button onClick={handleRedirectLogin}>Sign in</button>
      )}
      {isAuthenticated && (
        <button onClick={handleRedirectProfile}>Profile</button>
      )}
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
