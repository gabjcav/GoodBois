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
  const { id, postOwner } = useParams();
  const history = useHistory();

  const handleRedirectHome = () => {
    history.push("/");
  };

  return (
    <MainContainer>
      <h1>Send Message</h1>
      <SendMessageStyle>
        <h2>Regarding (Pet-id): {id}</h2>
        <form>
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
              console.log(e);
            }}
            placeholder="Write about yourself"
            type="text"
          />
          <button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              if (!isAuthenticated) {
                alert("Sign in to complete");
              } else {
                await firebaseInstance
                  .firestore()
                  .collection("inbox")
                  .doc()
                  .set({
                    Message: message,
                    From: user.uid,
                    PostOwner: postOwner,
                    Regarding: id,
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
      margin-top: 5%;
      min-width: 50%;
      min-height: 20vh;
      max-width: 90%;
      max-height: 50vh;
      padding: 10px;
      font-size: 1.5rem;
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