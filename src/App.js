import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfileContainer from "./components/ProfileContainer";
import HomeContainer from "./components/HomeContainer";
import NavBar from "./components/NavBar";
import LoginContainer from "./components/LoginContainer";
import GlobalStyle from "./components/GlobalStyle";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/login" component={LoginContainer} />
      </Router>
    </>
  );
}

export default App;
