import React, {useState} from 'react';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
  const [userN, setUserN] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // add code here to allow for verifying user login
  }

  return (
    <div className="login-container">
      <h2 className="sign-in">Sign in</h2>
      <input type="text" className="input-field" placeholder="Username"/>
      <input type="password" className="input-field" placeholder="Password"/>
      <button className="button sign-in-button">Login</button>
      <div className="extra-options">
      <span>Don't have an account?</span> <a href="#">Register now</a>
      </div>
    </div>
  );
};

export default Login;