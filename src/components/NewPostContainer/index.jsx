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
  const [petName, setPetName] = useState("");
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
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Pet name"
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
                Name: petName,
                NumberOfDays: numberOfDays,
                UserId: user.uid,
              });
              setAnimalType("");
              setBreed("");
              setCity("");
              setNumberOfDays(0);
              setPetName("");

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
    gap: 2rem;
    input {
      width: 90%;
      padding: 1.5rem;
      height: 5vh;
      font-size: 1rem;
      border: 0.2rem solid var(--orange-background-color);
      border-radius: 1rem;
    }
  }
  button {
    background-color: var(--orange-background-color);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 8%;
  }
  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    padding: 5%;
    margin-top: 10%;
    form {
      margin-top: 0;
    }
  }
`;

export default NewPostContainer;
