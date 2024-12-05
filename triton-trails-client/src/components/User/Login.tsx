import React, {useState} from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { loginUser } from "../../utils/user-utils"
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {  setUser } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const findUser = {
      username: username,
      password: password,
    }

    setUsername("");
    setPassword("");

    try {
      const {user: ourUser} = await loginUser(findUser);
      setUser(ourUser);
      navigate('/profile');
    } catch(error) {
      // basic error handling for invalid username, password, or server error
      console.error((error as Error).message);
      alert((error as Error).message);
    }
  }

  return (
    <div className="login-container">
      <h2 className="sign-in">Sign in</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="button sign-in-button">Login</button>
        </form>
      <div className="extra-options">
        <span>Don't have an account?</span>
        <Link to="/create-account"> Register now </Link>
      </div>
  </div>
  );
};

export default Login;
