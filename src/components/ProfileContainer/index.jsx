import React from "react";
import styled from "styled-components";
import { firebaseInstance } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/context";

const ProfileContainer = () => {
  const history = useHistory();
  const { user } = useAuth();

  const handleSignout = async () => {
    await firebaseInstance.auth().signOut();
    history.push("/");
  };

  const handleRedirect = () => {
    history.push("login");
  };
  console.log("user", user);
  return (
    <ProfileStyle>
      <h1>Profile</h1>
      {user && (
        <>
          {user.email}
          <button onClick={handleSignout}>Sign Out</button>
        </>
      )}
      {!user && (
        <>
          <p>You are not signed in!</p>
          <button onClick={handleRedirect}>Sign in</button>
        </>
      )}
    </ProfileStyle>
  );
};

const ProfileStyle = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

export default ProfileContainer;
