import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import queryFirebase from "../../config/firebase";
import { useAuth } from "../../utils/context";
import { useHistory } from "react-router-dom";
import MainContainer from "../MainContainer";
import LoaderContainer from "../LoaderContainer";
import { firebaseInstance } from "../../config/firebase";
import uuid from "uuid";
import Loader from "react-loader-spinner";

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

  const handleRedirectNewPost = () => {
    history.push("/newpost");
  };
  const handleRedirectMessage = () => {
    history.push("/newpost");
  };

  const renderPosts = () => {
    return (
      <PostsStyle>
        {posts?.map((post) => {
          const p = post.data();
          const postId = post.id;

          return (
            <article key={uuid()}>
              <p>Animal type: {p.AnimalType}</p>
              <p>Breed: {p.Breed}</p>
              <p>Number of days: {p.NumberOfDays}</p>
              <p>City: {p.City}</p>
              <div>
                <button onClick={handleRedirectMessage}>Message</button>

                {user?.uid === p.UserId ? (
                  <button type="button" onClick={() => console.log(postId)}>
                    Remove
                  </button>
                ) : (
                  ""
                )}
              </div>
            </article>
          );
        })}
        <button onClick={handleRedirectNewPost}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </PostsStyle>
    );
  };

  const renderSkeleton = () => {
    return (
      <LoaderContainer>
        <Loader
          type="TailSpin"
          color="var(--orange-background-color)"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </LoaderContainer>
    );
  };

  return (
    <MainContainer>
      <h1>Available pets</h1>
      {posts.length === 0 ? renderSkeleton() : renderPosts()}
    </MainContainer>
  );
};

const PostsStyle = styled.section`
  padding: 10%;
  display: flex;
  flex-direction: column;
  max-height: 80%;

  article {
    background-color: var(--orange-light);
    padding: 5%;
    height: 20%;
    border-radius: 10px;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: white;
    border: 2px solid var(--orange-background-color);
    font-size: 1.3rem;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
    z-index: -1;
    div {
      display: flex;
      flex-direction: row;
    }
    p {
      background-color: var(--orange-background-color);
      padding: 5px;
      border-radius: 5px;
      margin-bottom: 2%;
      text-align: center;
      box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 4px 0px;
    }
    button {
      border-radius: 5px;
      background-color: var(--orange-background-color);
      color: white;
      font-weight: bolder;
      width: 80px;
      margin-top: 8%;
      margin-bottom: 5%;
      cursor: pointer !important;
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
    margin: 30px auto;
    text-decoration: none;

    a {
      color: white;
    }
  }
`;

export default PostsContainer;
