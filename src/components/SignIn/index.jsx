//@ts-check
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Signin = ({ onSignin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const signIn = async () => {
    try {
      await Auth.signIn(username, password);
      history.push("/");
      onSignin();
    } catch (error) {
      console.log("error signing in", error);
      setError(error.message);
    }
  };

  const signUp = async () => {
    try {
      await Auth.signUp(username, password);
      console.log("success");
      setShowAuthCode(true);
    } catch (error) {
      console.log("error signing up", error);
      setError(error.message);
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log("success Confirmation");
      setShowAuthCode(false);
    } catch (error) {
      console.log("error signing up", error);
      setError(error.message);
    }
  };
  return (
    <div className="login">
      <TextField
        id="username"
        label="E-mail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {!showAuthCode ? (
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      ) : (
        <TextField
          id="authcode"
          label="authcode"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
      )}

      {showAuthCode ? (
        <Button id="signinButton" color="primary" onClick={confirmSignUp}>
          Confirm Sign Up
        </Button>
      ) : (
        <div style={{ display: "contents" }}>
          <Button id="signinButton" color="primary" onClick={signIn}>
            Sign In
          </Button>
          <Button id="signinButton" color="primary" onClick={signUp}>
            Sign Up
          </Button>
        </div>
      )}
      <h4 style={{ color: "red" }}>{error}</h4>
    </div>
  );
};

export default Signin;
