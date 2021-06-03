import React, { useState } from "react";
import { firebaseInstance } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";
import styled from "styled-components";

const LoginContainer = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebaseInstance.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
    history.push("/profile");
  };

  return (
    <MainContainer>
      <h1>Sign in</h1>
      <LoginStyle>
        <form>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleLoginSubmit}>
            Submit
          </button>
        </form>

        <p>
          New to GoodBois? Sign up <a href="/register">here</a>.
        </p>
        {error && <p>Error: {error}</p>}
      </LoginStyle>
    </MainContainer>
  );
};

const LoginStyle = styled.section`
  margin-top: 25%;
  form {
    margin: 0 auto;
    height: 50%;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10%;

    button,
    input {
      padding: 1.5rem;
    }

    button {
      background-color: var(--orange-background-color);
      border: none;
      color: white;
      font-size: 1.4rem;
      font-weight: bolder;
      border-radius: 0.5rem;
      margin-top: 1.5rem;
    }

    input {
      border: 0.2rem solid var(--orange-background-color);
      border-radius: 0.4rem;
      font-size: 1.5rem;
      height: 3rem;
    }
  }
  p {
    text-align: center;
    background-color: var(--orange-background-color);
    color: white;
    padding: 1rem;
    font-size: 1.6rem;
    font-weight: bolder;
    border-radius: 0.5rem;
    box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.3rem 0rem;
    a {
      color: white;
      text-underline-offset: 0.2rem;
      text-decoration-thickness: 0.2rem;
      &:hover {
        color: black;
      }
    }
  }

  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    margin-top: 10%;
  }
`;

export default LoginContainer;
