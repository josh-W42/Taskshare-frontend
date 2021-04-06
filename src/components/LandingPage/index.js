import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from "@material-ui/core"
import Wave from 'react-wavify';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";





const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 36,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
  },
});

const { REACT_APP_SERVER_URL, REACT_APP_DEMO_ID } = process.env;

const LandingPage = (props) => {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');
  
  const handleDemo = async () => {
    const registerUrl = `${REACT_APP_SERVER_URL}/users/register`;
    
    if (props.isAuth) {
      try {
        const addWorkspaceUrl = `${REACT_APP_SERVER_URL}/users/${props.user._id}/addWorkSpace/${REACT_APP_DEMO_ID}`;
        const resWorkspace = await axios.put(addWorkspaceUrl);
      } catch (error) {
        console.log("Connecting to demo");
      } 
      setRedirectTo(`/workspaces/${REACT_APP_DEMO_ID}`);
      setRedirect(true);
    } else {

      const randomizer = Math.floor(Math.random() * 60000) + 1;
      
      const guestData = {
        firstName: `Guest-${randomizer}`,
        lastName: '',
        email: `Guest${randomizer}@guest.com`,
        password: 'password',
        isGuest: true,
      }
      
      try {
        const resRegister = await axios.post(registerUrl, guestData);
        
        // Get Token
        const { token, data } = resRegister.data;
        localStorage.setItem("jwtToken", token);
        // Put token in axios auth header
        setAuthToken(token);
        // decode the token
        const decoded = jwt_decode(token);
        // set the current user
        props.nowCurrentUser(decoded);
        props.createNotification("success", "Guest Account Made, Connecting To Workspace.");
        
        const addWorkspaceUrl = `${REACT_APP_SERVER_URL}/users/${data.id}/addWorkSpace/${REACT_APP_DEMO_ID}`;
        const resWorkspace = await axios.put(addWorkspaceUrl);
  
        setRedirectTo(`/workspaces/${REACT_APP_DEMO_ID}`);
        setRedirect(true);
        
      } catch (error) {
        props.createNotification("error", "An Error Occurred, Please Try Again.");
      }
    }
  }

  if (redirect) {
    return <Redirect to={redirectTo} />
  }
  
  return (
    <div className="mt-5">
      <Grid container justify="center" alignItems="center">
        <Grid className="mt-5" item xs={12} md={4}>
          <Container className="text-center mt-5">
            <Card className={classes.root} elevation={3} variant="elevation">
              <CardContent>
                <Typography
                  className={classes.title}
                  variant="h5"
                  color="textPrimary"
                  gutterBottom
                >
                  TaskShare
                </Typography>
                <Typography variant="h5" color="textSecondary" component="h2">
                  A Productivity Tool
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container justify="space-between">
                  <NavLink className={classes.link} to="/login">
                    <Button size="large">Login</Button>
                  </NavLink>
                  <NavLink className={classes.link} to="/signup">
                    <Button size="large">Sign Up</Button>
                  </NavLink>
                  <Button onClick={handleDemo} size="large">Demo</Button>
                </Grid>
              </CardActions>
            </Card>
          </Container>
        </Grid>
      </Grid>
      <Wave
        mask="url(#mask)"
        fill="#1277b0"
        options={{
          height: 10,
          amplitude: 50,
          speed: 0.15,
          points: 4,
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="300" fill="url(#gradient)" />
          </mask>
        </defs>
      </Wave>
    </div>
  );
}

export default LandingPage;