import React from "react";
import styled from "styled-components";

const ProfileContainer = () => {
  return (
    <ProfileStyle>
      <h1>Profile</h1>
    </ProfileStyle>
  );
};

const ProfileStyle = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

export default ProfileContainer;
