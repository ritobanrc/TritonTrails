import React, {useState} from 'react';
import './Register.css';
import { createUser } from '../../utils/user-utils'

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
        displayName: displayName,
        username: username,
        password: password,
    }

    setDisplayName("");
    setUsername("");
    setPassword("");
    createUser(newUser);
    // Could add routing to login page here?
    // or automatically login user?
    // add some error handling for if username already exists
}

return (
    <div className="register-container">
            <h2 className="register">Register</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                />
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
                <button type="submit" className="button register-button">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;