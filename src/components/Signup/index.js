// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import Grid from "@material-ui/core/Grid";
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  fillWidth: {
    width: "100%"
  },
  formControl: {
    width: "100%",
    margin: theme.spacing(1),
  },
  link: {
    color: "inherit",
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  },
}));

const { REACT_APP_SERVER_URL } = process.env;

const Signup = (props) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    passwordError: false,
    passwordHelperText: 'Passwords Must Contain 8 Characters',
  });

  const classes = useStyles();

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (values.password !== values.confirmPassword) {
        props.createNotification("error", "Passwords Don't Match!");
        setValues({ ...values, passwordError: true, passwordHelperText: "Passwords Don't Match" });
        return
      } else {
        setValues({ ...values, passwordError: false, passwordHelperText: "Passwords Must Contain 8 Characters" });
      }
      if (values.password.length <= 8) {
        props.createNotification("error", "Password has to be at least 8 characters.");
        setValues({ ...values, passwordError: true, passwordHelperText: "Password has to be at least 8 characters." });
        return
      } else {
        setValues({ ...values, passwordError: false, passwordHelperText: "Passwords Must Contain 8 Characters" });
      }

      const newUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      try {
          const response = await axios.post(`${REACT_APP_SERVER_URL}/users/register`, newUser);

          // Get Token
          const { token } = response.data;
          localStorage.setItem("jwtToken", token);
          // Put token in axios auth header
          setAuthToken(token);
          
          // decode the token
          const decoded = jwt_decode(token);

          // set the current user
          props.nowCurrentUser(decoded);
          props.createNotification("success", "Sign Up and Login Successful.");
      } catch (error) {
        props.createNotification("error", "An Error Occurred At Signup. Please Try Again");
      }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (props.user) return <Redirect to='/'/>


  return (
    <Container className="text-center mt-5" maxWidth="sm">
      <Card variant="outlined">
        <Typography className="mt-3" component="h2" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form
          className={classes.fillWidth}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CardContent>
            <FormControl color="secondary" className={classes.formControl} variant="filled">
              <InputLabel required htmlFor="filled-email">Email</InputLabel>
              <FilledInput
                id="filled-email"
                type="email"
                required
                value={values.email}
                onChange={handleChange('email')}
              />
            </FormControl>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item className={classes.grid} sm={12} md={5}>
                <FormControl color="secondary" className={classes.formControl} variant="filled">
                  <InputLabel required htmlFor="filled-first-name">First Name</InputLabel>
                  <FilledInput
                    id="filled-first-name"
                    type="text"
                    required
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.grid} sm={12} md={5}>
                <FormControl color="secondary" className={classes.formControl} variant="filled">
                  <InputLabel htmlFor="filled-last-name">Last Name</InputLabel>
                  <FilledInput
                    id="filled-last-name"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl error={values.passwordError} color="secondary" className={classes.formControl} variant="filled">
              <InputLabel required htmlFor="filed-adornment-password">Password</InputLabel>
              <FilledInput
                id="filed-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                required
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{values.passwordHelperText}</FormHelperText>
            </FormControl>
            <FormControl error={values.passwordError} color="secondary" className={classes.formControl} variant="filled">
              <InputLabel required htmlFor="filed-adornment-confirmed-password">
                Confirm Password
              </InputLabel>
              <FilledInput
                id="filed-adornment-confirmed-password"
                type={values.showPassword ? "text" : "password"}
                value={values.confirmPassword}
                required
                onChange={handleChange('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{values.passwordHelperText}</FormHelperText>
            </FormControl>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography component="p">
                  Already Have An Account?{" "}
                  <Link className={classes.link} to="/login">
                    Login
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}

export default Signup;

