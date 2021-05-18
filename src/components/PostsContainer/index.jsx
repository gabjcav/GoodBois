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
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    queryFirebase("posts")
      .then((result) => setPosts(result.docs))
      .catch((error) => setFbError(error));
  }, []);

  const handleRedirectNewPost = () => {
    history.push("/newpost");
  };

  const renderPosts = () => {
    const renderSpinner = () => {
      return (
        <LoaderContainer>
          <Loader
            type="TailSpin"
            color="var(--orange-background-color)"
            height={100}
            width={100}
            timeout={3000}
          />
        </LoaderContainer>
      );
    };

    //If there are no posts (or not loaded yet from firebase), render spinner
    return !posts.length ? (
      renderSpinner()
    ) : (
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
                <button
                  onClick={() => {
                    setShowMessage(true);
                  }}
                >
                  Message
                </button>

                {user?.uid === p.UserId ? (
                  <button
                    type="button"
                    onClick={() =>
                      firebaseInstance
                        .firestore()
                        .collection("posts")
                        .doc(postId)
                        .delete()
                    }
                  >
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

  const renderMessage = () => {
    return (
      <div>
        <h2 style={{ marginTop: "20%" }}>hello</h2>
        <button
          onClick={() => {
            setShowMessage(false);
          }}
        >
          Go back
        </button>
      </div>
    );
  };

  return (
    <MainContainer>
      <h1>Available pets</h1>
      {!showMessage ? renderPosts() : renderMessage()}
    </MainContainer>
  );
};

const PostsStyle = styled.section`
  padding: 5%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  max-height: 80%;
  //individual posts

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
    font-size: 1.3rem;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 4px 0px;
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
      box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 2px 0px;
    }

    //Message / Remove buttons
    button {
      border-radius: 5px;
      color: white;
      font-weight: bolder;
      width: 80px;
      margin-top: 8%;
      margin-bottom: 5%;
      cursor: pointer !important;
    }
  }

  // "+" button

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
