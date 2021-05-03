import React, { useState } from "react";
import { firebaseInstance } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginContainer = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSubmit = () => {};
  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit()}>
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
    </>
  );
};

export default LoginContainer;
