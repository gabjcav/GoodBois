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
    padding: 40px;
    button {
      padding: 20px;
      font-size: 1rem;
    }
  }

  //individual posts
  .post-div {
    background-color: #fff;
    padding: 15px;
    display: block;
    article {
      background-color: #fff;
      padding: 5%;
      min-height: 20%;
      border-radius: 5px;
      margin-top: 10%;
      display: flex;
      gap: 10px;
      border: 2px solid var(--orange-background-color);
      flex-direction: column;
      justify-content: space-around;
      color: var(--orange-background-color);
      font-size: 1.3rem;
      box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 4px 0px;
      .pet-info {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
      }
      a {
        color: #fff;
        padding: 10px;
        text-decoration: none;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 5%;
        background-color: var(--orange-background-color);
        box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 2px 0px;
      }
      .button-div {
        display: flex;
        flex-direction: row;
        button {
          background-color: var(--orange-background-color);
          color: #fff;
          border-radius: 5px;
          font-weight: bolder;
          width: 80px;
          margin-top: 8%;
          margin-bottom: 5%;
          cursor: pointer !important;
        }
      }
      p {
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 2%;
        text-align: center;
        font-size: 1.6rem;
        letter-spacing: 5px;
        font-family: "Patua One", sans-serif;
      }
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
