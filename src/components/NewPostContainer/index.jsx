import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import MainContainer from "../MainContainer";

const NewPostContainer = () => {
  return (
    <MainContainer>
      <h1>New post</h1>
      <NewPostStyle>
        <form>
          <input placeholder="Animal type" type="text" />
          <input placeholder="Breed" type="text" />
          <input placeholder="City" type="text" />
          <input placeholder="Number of days" type="number" />
        </form>
        <button>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </NewPostStyle>
    </MainContainer>
  );
};

const NewPostStyle = styled.section`
  height: 70vh;
  width: 100%;
  text-align: center;
  display: flex;
  padding: 15%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
  }
`;

export default NewPostContainer;
