import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

const Navbar = (props) => {

    const toggleDarkMode = (e) => {
        props.setDarkModeEnabled((prev) => !prev);
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MERN Auth
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample07"
            aria-controls="#navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {
                // Now we'll add in the part of the navbar for when a user is vs isn't logged in.
                props.isAuth ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <span
                        className="nav-link logut-link"
                        onClick={props.handleLogout}
                      >
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/signup">
                        Signup
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                )
              }
              <li>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.darkModeEnabled}
                        onChange={toggleDarkMode}
                      />
                    }
                    label="Normal"
                  />
                </FormGroup>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
