import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
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
  console.log(user);

  const renderPosts = () => {
    //If there are no posts (or not loaded yet from firebase), render spinner
    return (
      <PostsStyle>
        {posts?.map((post) => {
          const p = post.data();
          const postId = post.id;
          const postOwner = p.UserId;

          return (
            <article key={uuid()}>
              <p>Animal type: {p.AnimalType}</p>
              <p>Breed: {p.Breed}</p>
              <p>Number of days: {p.NumberOfDays}</p>
              <p>City: {p.City}</p>

              <div>
                {/* Show "remove" button if it is your own post */}
                {user?.uid === postOwner ? (
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
                  <a href={`/newmessage/${postId}/${postOwner}`}>
                    Message owner
                  </a>
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

  return (
    <MainContainer>
      <h1>Available pets</h1>
      {!posts.length ? renderSpinner() : renderPosts()}
    </MainContainer>
  );
};

//STYLING FOR POSTS (INDIVIDUAL POSTS FOR SINGLE PET)

const PostsStyle = styled.section`
  padding: 5%;
  max-width: 100%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  max-height: 80%;

  //individual posts

  article {
    background-color: var(--orange-light);
    padding: 5%;
    min-height: 20%;
    border-radius: 10px;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: white;
    font-size: 1.3rem;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 4px 0px;
    a {
      color: var(--orange-background-color);
      padding: 5px;
      text-decoration: none;
      border-radius: 5px;
      margin: 0 auto;
      margin-top: 5%;
      background-color: white;
      box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 2px 0px;
    }
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

    //Message & Remove button
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
  @media (min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
    margin-top: 0;
    article {
      min-height: 350px;
      width: 300px;
    }
  }
`;

export default PostsContainer;
