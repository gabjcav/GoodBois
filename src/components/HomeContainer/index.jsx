import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/context";
import MainContainer from "../MainContainer";

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
    <MainContainer>
      <h1>GoodBois</h1>
      <HomeStyle>
        <p>The best place to find sitters for your pets!</p>
        {!isAuthenticated && (
          <button onClick={handleRedirectLogin}>Sign in</button>
        )}
        {isAuthenticated && (
          <button onClick={handleRedirectProfile}>Go to profile</button>
        )}
      </HomeStyle>
    </MainContainer>
  );
};

const HomeStyle = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20%;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 50px;
  p {
    padding: 10px;
    color: var(--orange-background-color);
    font-size: 1.5rem;
    font-family: "Patua One", sans-serif;
  }

  button {
    width: 40%;
    height: 5%;
    padding: 10px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    background-color: var(--orange-background-color);
    border-radius: 6%;
    border: none;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--orange-background-color);
      color: var(--orange-background-color);
      background-color: white;
    }
  }
`;

export default HomeContainer;
