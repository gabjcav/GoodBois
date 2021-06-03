import React, { useState } from "react";
import MainContainer from "../MainContainer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { firebaseInstance } from "../../config/firebase";
import { useAuth } from "../../utils/context";
import { useHistory } from "react-router-dom";

const SendMessageContainer = () => {
  const [message, setMessage] = useState("");
  const { isAuthenticated, user } = useAuth();
  const { id, postOwner, petName } = useParams();
  const history = useHistory();

  const handleRedirectHome = () => {
    history.push("/");
  };

  return (
    <MainContainer>
      <h1>Send Message</h1>
      <SendMessageStyle>
        <h2>Regarding: {petName}</h2>
        <form>
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Write about yourself"
            type="text"
          />
          <button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              if (!isAuthenticated) {
                alert("Sign in");
              } else {
                await firebaseInstance
                  .firestore()
                  .collection("inbox")
                  .doc()
                  .set({
                    Message: message,
                    From: user.email,
                    PostOwner: postOwner,
                    PetName: petName,
                  });
                setMessage("");
                alert("Message has been sent");
                handleRedirectHome();
              }
            }}
          >
            Send
          </button>
        </form>
      </SendMessageStyle>
    </MainContainer>
  );
};

//STYLING FOR SENDING MESSAGE SCREEN

const SendMessageStyle = styled.section`
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    textarea {
      margin-top: 10%;
      min-height: 30vh;
      min-width: 40vw;
      max-width: 70vw;
      max-height: 70vh;
      padding: 10px;
      font-size: 1.5rem;
      border: 2px solid var(--orange-background-color);
      border-radius: 15px;
    }

    button {
      border-radius: 5px;
      color: black;
      border: none;
      font-weight: bolder;
      max-width: 40%;
      margin-top: 8%;
      height: 20px;
      margin-bottom: 5%;
      cursor: pointer !important;
    }
  }

  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    padding: 5%;
    margin-top: 0%;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export default SendMessageContainer;
