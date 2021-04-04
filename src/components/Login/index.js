// Imports
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
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

const { REACT_APP_SERVER_URL } = process.env;

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
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/users/login`,
        userData
      );
      // Get Token
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      // Put token in axios auth header
      setAuthToken(token);
      
      // decode the token
      const decoded = jwt_decode(token);

      // set the current user
      props.nowCurrentUser(decoded);
      props.createNotification("success", "Login Successful");
    } catch (error) {
      props.createNotification("error", "Either Email or Password is Incorrect.")
    }
  };

  if (props.user) return <Redirect to="/" />;

  return (
    <Container className="text-center mt-5" maxWidth="sm">
      <Card variant="elevation" elevation={3}>
        <Typography className="mt-3" component="h2" variant="h5" gutterBottom>
          Welcome Back
        </Typography>
        <form className={classes.fillWidth} autoComplete="off" onSubmit={handleSubmit}>
          <CardContent>
            <FormControl color="secondary" className={classes.formControl} variant="filled">
              <InputLabel htmlFor="filled-email">Email</InputLabel>
              <FilledInput
                id="filled-email"
                type="email"
                required
                value={email}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl color="secondary" className={classes.formControl} variant="filled">
              <InputLabel htmlFor="filed-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filed-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
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
                  Need an account?{" "}
                  <Link className={classes.link} to="/signup">
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default Login;

