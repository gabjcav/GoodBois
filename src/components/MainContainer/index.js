import styled from "styled-components";

const MainContainer = styled.main`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5%;
  min-height: 80%;
  button {
    box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.3rem 0rem;
    cursor: pointer;
  }
  h1 {
    background-color: var(--orange-background-color);
    text-align: center;
    font-size: 4.5rem;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    padding: 1rem;
    margin-bottom: 10%;
    box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.3rem 0rem;
    font-family: "Patua One", sans-serif;
    letter-spacing: 0.2rem;
    color: white;
  }
`;

export default MainContainer;
