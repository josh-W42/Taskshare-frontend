import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import LightDarkSwitch from '../LightDarkSwitch';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

const { REACT_APP_SERVER_URL } = process.env;

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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


const Navbar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    if (props.user) {
      getWorkspaces();
    }
  }, [props.user])

  const getWorkspaces = async (req, res) => {
    const url = `${REACT_APP_SERVER_URL}/users/${props.user._id}/allWorkspaces`;
    try {
      const response = await axios.get(url);
      const workspaces = response.data.results;
      setWorkspaces(workspaces);
    } catch (error) {
      props.createNotification("error", "Couldn't Get All Workspaces");
      setWorkspaces([]);
    }
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const workspaceArray = workspaces.map((workspace, index) => {
    if (workspace) {
      return (
        <MenuItem key={workspace._id} onClick={handleMenuClose}>
          <NavLink className={classes.link} to={`/workspaces/${workspace._id}`}>
            {workspace.name}
          </NavLink>
        </MenuItem>
      );
    } else {
      return <></>
    }
  });

  workspaceArray.push(
    <MenuItem key="add new workspace" onClick={handleMenuClose}>Make a New Workspace</MenuItem>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {workspaceArray}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    > 
      { props.isAuth ? (
        <div>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Button color="inherit">Workspaces</Button>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.link} to="/profile">
              <Button>
                User Profile
              </Button>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" onClick={props.handleLogout}>Logout</Button>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <NavLink className={classes.link} to="/signup">
              <Button>Signup</Button>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className={classes.link} to="/login">
              <Button>Login</Button>
            </NavLink>            
          </MenuItem>
        </div>
      )}
      <MenuItem>
        <LightDarkSwitch
          setDarkModeEnabled={props.setDarkModeEnabled}
          darkModeEnabled={props.darkModeEnabled}
        />
      </MenuItem>
    </Menu>
  );

  const userOptions = () => {
    return (
      <>
        <div className={classes.sectionDesktop}>
          <LightDarkSwitch
            setDarkModeEnabled={props.setDarkModeEnabled}
            darkModeEnabled={props.darkModeEnabled}
          />
          { props.isAuth ? (
            <>
              <Button
                color="inherit"
                onClick={handleProfileMenuOpen}
                aria-label="Workspace pan"
                aria-controls={menuId}
                aria-haspopup="true"
              >
                Workspaces
              </Button>
              <NavLink className={classes.link} to="/profile">
                <Button>
                  User Profile
                </Button>
              </NavLink>
              <Button color="inherit" onClick={props.handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink className={classes.link} to="/signup">
                <Button>Signup</Button>
              </NavLink>
              <NavLink className={classes.link} to="/login">
                <Button>Login</Button>
              </NavLink>            
            </>
          )}
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </>
    );
  }

  return (
    <>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <NavLink className={classes.link} to="/">
            <Typography variant="h6">
              TaskShare
            </Typography>
          </NavLink>
          <div className={classes.grow}></div>
          {userOptions()}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

export default Navbar;