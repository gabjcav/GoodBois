import React, { useState } from "react";
import { firebaseInstance } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";

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
      </form>
      <button onClick={handleLoginSubmit}>Submit</button>
      <p>
        New to GoodBois? Sign up <a href="/register">here</a>.
      </p>
      {error && <p>Error: {error}</p>}
    </MainContainer>
  );
};

export default LoginContainer;
