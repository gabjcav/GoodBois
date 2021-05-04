import React from "react";
import styled from "styled-components";
const NavBar = () => {
  return (
    <NavStyle>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/newpost">New post</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
      </ul>
    </NavStyle>
  );
};

const NavStyle = styled.nav`
  color: red;
  background-color: red;
  width: 100vw;
  display: grid;
  grid-template-columns: 1;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7%;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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
