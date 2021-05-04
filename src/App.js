import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfileContainer from "./components/ProfileContainer";
import HomeContainer from "./components/HomeContainer";
import NavBar from "./components/NavBar";
import LoginContainer from "./components/LoginContainer";
import RegisterContainer from "./components/RegisterContainer";
import GlobalStyle from "./components/GlobalStyle";
import { AuthProvider } from "./utils/context";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <NavBar />
          <Route path="/" exact component={HomeContainer} />
          <Route path="/profile" component={ProfileContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
