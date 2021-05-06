import React from "react";
import styled from "styled-components";
import { useAuth } from "../../utils/context";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";
const MessagesContainer = () => {
  const { isAuthenticated, user } = useAuth();
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/login");
  };

  return (
    <MainContainer>
      <h1>Messages</h1>
      <MessagesStyle>
        {!isAuthenticated && (
          <>
            <p>Sign in to view messages</p>
            <button onClick={handleRedirect}>Sign in</button>
          </>
        )}
        {isAuthenticated && <p>{user.email}</p>}
      </MessagesStyle>
    </MainContainer>
  );
};

const MessagesStyle = styled.section`
  margin: 0 auto;
`;

export default MessagesContainer;
