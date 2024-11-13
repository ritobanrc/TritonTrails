import React, {useState} from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { fetchUser } from "../../utils/user-utils"
import { isNullishCoalesce } from 'typescript';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const findUser = {
      username: username,
      password: password,
  }

    setUsername("");
    setPassword("");
    const ourUser = fetchUser(findUser);
  // add code here to allow for verifying user login
    // add code here to allow for verifying user login
  }

  return (
    <div className="login-container">
      <h2 className="sign-in">Sign in</h2>
      <input type="text" className="input-field" placeholder="Username"/>
      <input type="password" className="input-field" placeholder="Password"/>
      <button className="button sign-in-button">Login</button>
      <div className="extra-options">
      <span>Don't have an account?</span>
      <Link to="create-account"> Register now </Link>
      </div>
    </div>
  );
};

export default Login;