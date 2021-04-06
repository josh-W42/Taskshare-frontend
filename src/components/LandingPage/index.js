import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from "@material-ui/core"
import Wave from 'react-wavify';
import { NavLink } from 'react-router-dom';


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

const LandingPage = (props) => {
  const classes = useStyles();

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
                  <NavLink className={classes.link} to="/demo">
                    <Button size="large">Demo</Button>
                  </NavLink>
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