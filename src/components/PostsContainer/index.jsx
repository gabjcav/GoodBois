import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUser,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import queryFirebase from "../../config/firebase";
import { firebaseInstance } from "../../config/firebase";
import { useAuth } from "../../utils/context";
const PostsContainer = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [fbError, setFbError] = useState(null);

  useEffect(() => {
    queryFirebase("posts")
      .then((result) => setPosts(result.docs))
      .catch((error) => setFbError(error));
  }, []);
  console.log(posts);
  return (
    <PostsStyle>
      <h1>Available pets</h1>

      {posts?.map((post) => {
        const p = post.data();
        return (
          <article key={p.id}>
            <p>Animal type: {p.AnimalType}</p>
            <p>Breed: {p.Breed}</p>
            <p>Number of days: {p.NumberOfDays}</p>
            <button>Ask to sit</button>
          </article>
        );
      })}

      <div>
        <a href="/newpost">
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>
    </PostsStyle>
  );
};

const PostsStyle = styled.main`
  div {
    background-color: var(--orange-background-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-decoration: none;
    a {
      color: white;
    }
  }
`;

export default PostsContainer;
