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

  console.log("user", user);
  return (
    <MainContainer>
      <h1>Profile</h1>
      <ProfileStyle>
        {user && (
          <div>
            {user.email}
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
  div {
    display: flex;
    flex-direction: column;
    button {
      width: 25%;
      height: 30px;
      margin: 0 auto;
      margin-top: 10%;
      background-color: var(--orange-background-color);
      color: white;
      border: none;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 5px;
    }
  }
`;

export default ProfileContainer;
