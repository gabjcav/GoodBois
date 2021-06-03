import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/context";
import MainContainer from "../MainContainer";
import { Link } from "react-router-dom";
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
        <h2>The best place to find sitters for your pets!</h2>
        {!isAuthenticated && (
          <button onClick={handleRedirectLogin}>Sign in</button>
        )}
        {isAuthenticated && (
          <button onClick={handleRedirectProfile}>Go to profile</button>
        )}

        <button>
          <Link to={"/posts"}>See available pets</Link>
        </button>
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
  max-width: 100%;
  padding: 3rem;

  h2 {
    padding: 1rem;
    color: var(--orange-background-color);
    font-size: 3rem;
    font-family: "Patua One", sans-serif;
    margin-top: 20%;
    text-align: left;
    letter-spacing: 0.15rem;
    border: 1;
  }

  button {
    width: 60%;
    height: 5%;
    padding: 1rem;
    color: white;
    font-weight: bold;
    margin-top: 20%;
    font-size: 1.5rem;
    background-color: var(--orange-background-color);
    border-radius: 0.5rem;
    border: 0.2rem solid var(--orange-background-color);
    cursor: pointer;
    a {
      text-decoration: none;
      color: #fff;
    }
  }

  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    padding: 5%;
    margin-top: 0%;
    h2 {
      font-size: 2.2rem;
    }
  }
`;

export default HomeContainer;
