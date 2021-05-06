import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import queryFirebase from "../../config/firebase";
import { useAuth } from "../../utils/context";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";

const PostsContainer = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [fbError, setFbError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    queryFirebase("posts")
      .then((result) => setPosts(result.docs))
      .catch((error) => setFbError(error));
  }, []);

  const handleRedirect = () => {
    history.push("/newpost");
  };

  return (
    <MainContainer>
      <PostsStyle>
        <h1>Available pets</h1>

        {posts?.map((post) => {
          const p = post.data();
          console.log(p);
          return (
            <article key={p.id}>
              <p>Animal type: {p.AnimalType}</p>
              <p>Breed: {p.Breed}</p>
              <p>Number of days: {p.NumberOfDays}</p>
              <p>City: {p.City}</p>
              <button>Ask to sit</button>
            </article>
          );
        })}

        <button onClick={handleRedirect}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </PostsStyle>
    </MainContainer>
  );
};

const PostsStyle = styled.section`
  padding: 10%;
  display: flex;
  flex-direction: column;
  height: 90vh;

  article {
    background-color: var(--orange-background-color);
    padding: 5%;
    height: 30%;
    border-radius: 10px;
    margin-top: 10%;
    margin-bottom: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: white;
    font-size: 1.3rem;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
    button {
      border-radius: 5px;
      background-color: white;
      color: black;
      width: 80px;
      margin-top: 8%;
    }
  }

  button {
    background-color: var(--orange-background-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 auto;
    text-decoration: none;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
    a {
      color: white;
    }
  }
`;

export default PostsContainer;
