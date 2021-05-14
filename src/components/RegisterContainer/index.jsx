import React, { useState } from "react";
import { firebaseInstance } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";
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
        Already have an account? Sign in <a href="/login">here</a>
      </p>
      {error && <p>Error: {error}</p>}
    </MainContainer>
  );
};

export default RegisterContainer;
