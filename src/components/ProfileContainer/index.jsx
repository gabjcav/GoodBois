import React from "react";
import styled from "styled-components";
import { firebaseInstance } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/context";
import MainContainer from "../MainContainer";
const ProfileContainer = () => {
  const history = useHistory();
  const { user } = useAuth();

  const handleSignout = async () => {
    await firebaseInstance.auth().signOut();
    history.push("/");
  };

  const handleRedirectLogin = () => {
    history.push("login");
  };
  const handleRedirectMessages = () => {
    history.push("messages");
  };

  return (
    <MainContainer>
      <h1>Profile</h1>
      <ProfileStyle>
        {user && (
          <div>
            <h2>Welcome back,</h2>
            <p>{user.email}</p>
            <button onClick={handleRedirectMessages}>Messages</button>
            <button onClick={handleSignout}>Sign Out</button>
          </div>
        )}
        {!user && (
          <div>
            <p>You are not signed in!</p>
            <button onClick={handleRedirectLogin}>Sign in</button>
          </div>
        )}
      </ProfileStyle>
    </MainContainer>
  );
};

const ProfileStyle = styled.section`
  height: 100%;
  width: 100%;
  text-align: center;
  margin-top: 25%;
  div {
    display: flex;
    flex-direction: column;
    h2 {
      padding: 1rem;
      color: var(--orange-background-color);
      font-size: 3rem;
      font-family: "Patua One", sans-serif;
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.2rem;
      padding: 1rem;
      width: 50%;
      margin: 0 auto;
      color: var(--gray);
      font-weight: bolder;
      border-radius: 0.5rem;
      letter-spacing: 0.1rem;
      background-color: var(--orange-light);
      box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.1rem 0.2rem 0rem;
    }
    button {
      width: 25%;
      height: 3rem;
      margin: 0 auto;
      margin-top: 10%;
      background-color: var(--orange-background-color);
      color: white;
      border: none;
      font-size: 1.5rem;
      font-weight: bold;
      border-radius: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    margin-top: 10%;
  }
`;

export default ProfileContainer;
