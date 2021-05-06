import React from "react";
import styled from "styled-components";
import { useAuth } from "../../utils/context";
import { useHistory } from "react-router-dom";

const MessagesContainer = () => {
  const { isAuthenticated, user } = useAuth();
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/login");
  };

  return (
    <>
      <h1>Messages</h1>
      {!isAuthenticated && (
        <>
          <p>Sign in to view messages</p>
          <button onClick={handleRedirect}>Sign in</button>
        </>
      )}
      {isAuthenticated && <p>{user.email}</p>}
    </>
  );
};

export default MessagesContainer;
