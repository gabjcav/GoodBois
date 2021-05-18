import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import MainContainer from "../MainContainer";
import { firebaseInstance } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/context";

const NewPostContainer = () => {
  const history = useHistory();
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const { isAuthenticated, user } = useAuth();

  return (
    <MainContainer>
      <h1>Find sitter</h1>
      <NewPostStyle>
        <form>
          <input
            required
            onChange={(e) => setAnimalType(e.target.value)}
            placeholder="Animal type"
            type="text"
          />
          <input
            required
            onChange={(e) => setBreed(e.target.value)}
            placeholder="Breed"
            type="text"
          />
          <input
            required
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            type="text"
          />
          <input
            required
            onChange={(e) => setNumberOfDays(e.target.value)}
            placeholder="Number of days"
            type="number"
          />
        </form>
        <button
          onClick={async () => {
            if (!isAuthenticated) {
              alert("Sign in to complete");
            } else {
              await firebaseInstance.firestore().collection("posts").doc().set({
                AnimalType: animalType,
                Breed: breed,
                City: city,
                NumberOfDays: numberOfDays,
                UserId: user.uid,
              });
              setAnimalType("");
              setBreed("");
              setCity("");
              setNumberOfDays(0);

              history.push("/posts");
            }
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </NewPostStyle>
    </MainContainer>
  );
};

const NewPostStyle = styled.section`
  max-height: 70%;
  width: 100%;
  text-align: center;
  display: flex;
  padding: 15%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
  form {
    margin-top: 10%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    input {
      width: 60vw;
      padding: 15px;
      height: 5vh;
      font-size: 1rem;
      border: 2px solid var(--orange-background-color);
      border-radius: 10px;
    }
  }
  button {
    background-color: var(--orange-background-color);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 8%;
  }
`;

export default NewPostContainer;
