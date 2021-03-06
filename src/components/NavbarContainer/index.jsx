import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPaw,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../utils/context";
import { useParams } from "react-router-dom";
const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  return (
    <NavStyle>
      <ul>
        <li>
          <a href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
        <li>
          <a href="/posts">
            <FontAwesomeIcon icon={faPaw} />
          </a>
        </li>
        <li>
          {isAuthenticated && (
            <a href="/profile">
              <FontAwesomeIcon icon={faUser} />
            </a>
          )}
          {!isAuthenticated && (
            <a href="/login">
              <FontAwesomeIcon icon={faUser} />
            </a>
          )}
        </li>
        <li>
          {isAuthenticated && (
            <a href="/messages">
              <FontAwesomeIcon icon={faComments} />
            </a>
          )}
          {!isAuthenticated && (
            <a href="/login">
              <FontAwesomeIcon icon={faComments} />
            </a>
          )}
        </li>
      </ul>
    </NavStyle>
  );
};

const NavStyle = styled.nav`
  color: red;
  background-color: red;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 7%;
  margin-top: 5%;
  box-shadow: rgba(99, 99, 99, 0.4) 0rem 0.2rem 0.8rem 0rem;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    background-color: var(--orange-background-color);
    li {
      a {
        color: white;
        text-decoration: none;
        font-size: 2rem;
      }
    }
  }
  @media (min-width: 768px) {
    ul {
      li {
        a {
          font-size: 3.5rem;
        }
      }
    }
  }
`;
export default NavBar;
