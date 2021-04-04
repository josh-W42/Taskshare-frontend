import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LightDarkSwitch from '../LightDarkSwitch';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));


const Navbar = (props) => {
  const classes = useStyles();

  const userOptions = () => {
    if (props.isAuth) {
      return (
        <>
          <Button color="inherit">Workspaces</Button>
          <NavLink className={classes.link} to="/profile">
            <Button>User Profile</Button>
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink className={classes.link} to="/signup">
            <Button>Signup</Button>
          </NavLink>
          <NavLink className={classes.link} to="/login">
            <Button>Login</Button>
          </NavLink>
        </>
      );
    }
  }

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <NavLink className={classes.link} to="/">
          <Typography variant="h6">
            TaskShare
          </Typography>
        </NavLink>
        <div className={classes.grow}></div>
        <LightDarkSwitch
          setDarkModeEnabled={props.setDarkModeEnabled}
          darkModeEnabled={props.darkModeEnabled}
        />
        {userOptions()}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;




