import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../utils/context";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";
import queryFirebase, { firebaseInstance } from "../../config/firebase";
import uuid from "uuid";

const MessagesContainer = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [fbError, setFbError] = useState(null);
  const handleRedirect = () => {
    history.push("/login");
  };

  useEffect(() => {
    queryFirebase("inbox")
      .then((result) => setMessages(result.docs))
      .catch((error) => setFbError(error));
  }, []);

  const renderMessages = () => {
    return messages?.map((msg) => {
      const m = msg.data();
      const postowner = m.PostOwner;
      const messageId = msg.id;
      if (user?.uid === postowner) {
        return (
          <div key={uuid()}>
            <p>From: {m.From}</p>
            <p>Regarding: {m.PetName}</p>
            <p>Message:</p>
            <p>{m.Message}</p>
            <button
              onClick={async () =>
                await firebaseInstance
                  .firestore()
                  .collection("inbox")
                  .doc(messageId)
                  .delete()
              }
            >
              Accept
            </button>
            <button
              onClick={async () =>
                await firebaseInstance
                  .firestore()
                  .collection("inbox")
                  .doc(messageId)
                  .delete()
              }
            >
              Decline
            </button>
          </div>
        );
      }
    });
  };

  const renderEmpty = () => {
    return <p>No messages</p>;
  };

  return (
    <MainContainer>
      <h1>Messages</h1>
      <MessagesStyle>
        {messages.length === 0 ? renderEmpty() : renderMessages()}
      </MessagesStyle>
    </MainContainer>
  );
};

const MessagesStyle = styled.section`
  height: 100%;
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  div {
    background-color: var(--orange-background-color);
    color: white;
    padding: 1rem;
    min-height: 10rem;
    border-radius: 0.5rem;
    font-size: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.3rem 0rem;

    p {
      margin-bottom: 0.5rem;
      text-align: left;
      :nth-child(2) {
        margin-top: 1.5rem;
      }
      :nth-child(3) {
        margin-top: 1.5rem;
      }
      :nth-child(4) {
        background-color: white;
        color: black;
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: left;
        box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.2rem 0rem;
        margin-bottom: 1.5rem;
      }
    }
    button {
      padding: 0.5rem;
      margin-right: 0.5rem;
      background-color: white;
      border: none;
      border-radius: 0.5rem;
    }
  }

  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    padding: 5%;
    margin-top: 10%;
  }
`;

export default MessagesContainer;
