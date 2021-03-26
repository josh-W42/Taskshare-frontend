// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;

const Signup = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    // ok so in this instance, we'll do form validation when submitting
    // as opposed to when it's changed. Personally, I'd like to make checks
    // as the user so changing state, espcially for larger forms.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) return alert('Passwords don\'t match');
        if (password.length <= 8) return alert('Password has to be at least 8 characters.');

        const newUser = { name, email, password };
        try {
            const response = await axios.post(`${REACT_APP_SERVER_URL}/users/register`, newUser);
            setRedirect(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    if (redirect) return <Redirect to='/profile'/>


    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" >Name</label>
                            <input type="text" name="name" value={name} onChange={handleName} required className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} required className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} required className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} required onChange={handleConfirmPassword} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary float-right"> Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
