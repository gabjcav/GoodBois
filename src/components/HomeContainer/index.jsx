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
      <HomeStyle>
        <h1>GoodBois</h1>
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
  gap: 10%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px;
  margin-top: 50%;
  button {
    width: 50%;
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
