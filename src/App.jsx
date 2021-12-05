import React from "react";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import { useState } from "react";
import { useEffect } from "react";

import { Button } from "@material-ui/core";
import SongList from "./components/SongList";

import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

Amplify.configure(awsconfig);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((sess) => {
        console.log("logged in");
        setLoggedIn(true);
      })
      .catch(() => {
        console.log("not logged in");
        setLoggedIn(false);
      });
  };
  useEffect(() => {
    assessLoggedInState();
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>
            Cloud Project
            <p style={{ fontSize: 14 }}>
              {" "}
              Made by Aniket, Swattik, Sahasrabdi, Ritu{" "}
            </p>
          </h2>
          {loggedIn ? (
            <Link to="/signin">
              <Button onClick={signOut} variant="contained" color="primary">
                Log Out
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button variant="contained" color="primary">
                Log In
              </Button>
            </Link>
          )}
        </header>
        <Route exact path="/">
          <SongList />
        </Route>
        <Route path="/signin">
          <SignIn onSignin={assessLoggedInState} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
