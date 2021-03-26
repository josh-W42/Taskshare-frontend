// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };
        try {
            const response = await axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData);
            console.log(response);

            const { token } = response.data;
            // Take th token from the response from the backend and put it
            // The local storage of the user's browser. We do this because we 
            // want to be able to get the token when a redirect occurs.
            localStorage.setItem('jwtToken', token);

            // Ok and now we se the auth token
            setAuthToken(token);
            // decode token to get the user data..
            // So I'm guessing this is just decoding a user's session data from encryption.
            const decoded = jwt_decode(token);
            // thne set the currnet user.
            props.nowCurrentUser(decoded); // function passed down from the props.
        } catch (error) {
            console.error(error);
            alert('Either Email or Password is incorrect.  Please try again.');
        }
    }

    if (props.user) return <Redirect to="/profile" />;

    return (
        <div className="row mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={handleEmail} className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;
