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

const NavBar = () => {
  const { isAuthenticated } = useAuth();

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
          <a href="/messages">
            <FontAwesomeIcon icon={faComments} />
          </a>
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
  box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
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
        font-size: 1.3rem;
      }
    }
  }
`;
export default NavBar;
