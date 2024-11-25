import React, {useState} from 'react';
import './Register.css';
import { createUser, loginUser } from '../../utils/user-utils'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Register = () => {
    const { user, setUser } = useAppContext();
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser = {
            displayName: displayName,
            username: username,
            password: password,
        }

        setDisplayName("");
        setUsername("");
        setPassword("");

        
        // Could add routing to login page here?
        // or automatically login user?
        // add some error handling for if username already exists
        try {
            await createUser(newUser);

            const {user: ourUser} = await loginUser(newUser);
            setUser(ourUser);
            navigate('/profile');
        } catch(error) {
            // basic error handling for invalid username, password, or server error
            console.error((error as Error).message);
            alert((error as Error).message);
        }
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