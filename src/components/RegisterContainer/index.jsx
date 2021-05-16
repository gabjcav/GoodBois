import React, { useState } from "react";
import { firebaseInstance } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";
import styled from "styled-components";

const RegisterContainer = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
    history.push("/login");
  };

  return (
    <MainContainer>
      <h1>Create account</h1>
      <RegisterStyle>
        <form onSubmit={handleLoginSubmit}>
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
          <button type="submit">Submit</button>
        </form>

        <p>
          Already have an account? Sign in <a href="/login">here</a>.
        </p>
        {error && <p>Error: {error}</p>}
      </RegisterStyle>
    </MainContainer>
  );
};

const RegisterStyle = styled.section`
  form {
    margin: 0 auto;
    height: 50%;
    gap: 10px;
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10%;

    button,
    input {
      padding: 5px;
    }

    button {
      background-color: var(--orange-background-color);
      border: none;
      color: white;
      border-radius: 5px;
    }
  }
  p {
    text-align: center;
    background-color: var(--orange-background-color);
    color: white;
    padding: 10px;
    font-weight: bolder;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 3px 0px;
    a {
      color: white;
      text-underline-offset: 2px;
      text-decoration-thickness: 2px;
      &:hover {
        color: black;
      }
    }
  }
`;

export default RegisterContainer;
