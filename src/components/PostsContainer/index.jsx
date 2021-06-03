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
import { useHistory, Link } from "react-router-dom";
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

  const renderPosts = () => {
    return (
      <PostsStyle>
        <div className="post-div">
          {posts?.map((post) => {
            const p = post.data();
            const postId = post.id;
            const postOwner = p.UserId;
            const petName = p.Name;
            console.log(p);
            return (
              <article key={uuid()}>
                <p>"{p.Name}"</p>
                <div className="pet-info">
                  <p>{p.AnimalType} -</p>
                  <p>{p.Breed}</p>
                </div>
                <p>{p.NumberOfDays} days</p>
                <p>{p.City}</p>

                <div className="button-div">
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
                    <Link to={`/newmessage/${postId}/${postOwner}/${petName}`}>
                      Ask to sit
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
          <button onClick={handleRedirectNewPost}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
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
  max-width: 100%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  max-height: 80%;

  .city-filter {
    display: flex;
    flex-direction: row;
    padding: 4rem;
    button {
      padding: 2rem;
      font-size: 1rem;
    }
  }

  //individual posts
  .post-div {
    background-color: #fff;
    padding: 1.5rem;
    display: block;
    article {
      background-color: #fff;
      padding: 5%;
      min-height: 20%;
      border-radius: 0.5rem;
      margin-top: 10%;
      display: flex;
      gap: 1rem;
      border: 0.2rem solid var(--orange-background-color);
      flex-direction: column;
      justify-content: space-around;
      color: var(--orange-background-color);
      box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.4rem 0rem;
      .pet-info {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
      }
      a {
        color: #fff;
        padding: 1rem;
        text-decoration: none;
        border-radius: 0.5rem;
        margin: 0 auto;
        margin-top: 5%;
        font-size: 1.5rem;
        background-color: var(--orange-background-color);
        box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.2rem 0rem;
      }
      .button-div {
        display: flex;
        flex-direction: row;
        button {
          background-color: var(--orange-background-color);
          color: #fff;
          border-radius: 0.5rem;
          font-weight: bolder;
          width: 8rem;
          margin-top: 8%;
          margin-bottom: 5%;
          cursor: pointer !important;
        }
      }
      p {
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-bottom: 2%;
        text-align: center;
        font-size: 2.4rem;
        letter-spacing: 0.5rem;
        font-family: "Patua One", sans-serif;
      }
    }
  }

  // "+" button

  button {
    background-color: var(--orange-background-color);
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 3rem auto;
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
      min-height: 35rem;
      width: 30rem;
    }
  }
`;

export default PostsContainer;
