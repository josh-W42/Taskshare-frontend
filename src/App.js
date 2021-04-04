// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import io from 'socket.io-client';
import axios from "axios";

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/partials/Navbar';
import WorkSpace from './components/Workspace';
import LandingPage from './components/LandingPage';

const { REACT_APP_SERVER_URL, REACT_APP_SOCKET_URL } = process.env;

// Sockets
const socket = io(REACT_APP_SOCKET_URL, {
  autoConnect: false,
  reconnection: false,
});

// We don't want to automatically connect when
// they arrive, we want to connect when they login

// For SnackBars 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
    // Ok so basically this is saying if there is a token AKA
    // If they are logged in we route 
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>;
  }} />
};

// finds the theme preference if they set it before.
const themePreference = () => {
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'Dark' ? true : false;
  }
  return false
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(themePreference());

  // Snack Bar stuff
  const [notifications, setNotifications] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  useEffect(() => {
    if (notifications.length >= 1 && !hasNotified) {
      handleClick();
      setHasNotified(true);
    }
  }, [notifications])


  /**
    Creates A SnackBar Notification:
    @param {String} severity The type of snackbar. Options are: error, warning, info, success.
    @param {String} message The content of the snackbar
  */
  const createNotification = (severity, message) => {
    setHasNotified(false);
    setNotifications(notifications.concat([{ severity, message }]));
  }

  const onMobile = () => {
    return window.innerWidth < 1000;
  }
  const alertEl = () => {
    if (notifications.length < 1) {
      return <></>
    }
    const info = notifications[notifications.length - 1];
    const severity = info.severity;
    let vertical = 'top';
    let horizontal = 'center';

    if (onMobile()) {
      vertical = 'bottom';
      horizontal = 'center';
    }

    return (
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnackBar} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={severity}>
          {info.message}
        </Alert>
      </Snackbar>
    );
  }
 
  useEffect(() => {
    // We can check if a user is authenticated if there is a token available in localstorage
    // We do this every time the app is mounted.
    
    // Auth specific stuff
    let token;

    const localToken = localStorage.getItem('jwtToken');

    if (!localToken) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localToken);
      setAuthToken(localToken);
      setCurrentUser(token);
      if (!socket.connected) {
        socket.connect();
      }
    }
  }, []);

  useEffect(() => {
    // socket specific stuff
    socket.on('connect', () => {
      console.log('hi');
    });
    socket.on('disconnect', () => {
      console.log('bye');
      createNotification("warning", "Disconnected From Server");
    });
    socket.on('message', (data) => {
      console.log(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [])


  const nowCurrentUser = (userData) => {
    getUserData(userData);
  }

  const getUserData = async userData => {
    const url = `${REACT_APP_SERVER_URL}/users/${userData.id}/profile`;

    try {
      const response = await axios.get(url);
      let user = response.data.result;
      setCurrentUser(user);
      setIsAuthenticated(true);
      socket.userId = user._id;
      socket.connect();
    } catch (error) {
      console.log("===> Error When Getting User Data", error);
      createNotification("error", "Could Not Connect With DataBase, Safely Logging You Out.");
      handleLogout();
    }
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) { 
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
      socket.disconnect();

      createNotification("info", "Successfully Logged Out");
    }
  }

  // Themeing
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkModeEnabled ? 'dark' : 'light',
        },
      }),
    [darkModeEnabled],
  );


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          handleLogout={handleLogout}
          isAuth={isAuthenticated}
          darkModeEnabled={darkModeEnabled}
          setDarkModeEnabled={setDarkModeEnabled}
          user={currentUser}
        />
        <div className="mt-2">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route 
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  createNotification={createNotification}
                  nowCurrentUser={nowCurrentUser}
                  setIsAuthenticated={setIsAuthenticated}
                  handleLogout={handleLogout}
                  user={currentUser}
                />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  createNotification={createNotification}
                  nowCurrentUser={nowCurrentUser}
                  setIsAuthenticated={setIsAuthenticated}
                  user={currentUser}
                />
              )}
            />
            {/* <PrivateRoute
              path="/profile"
              component={Profile}
              user={currentUser}
              handleLogout={handleLogout}
            /> */}
            <Route
              path="/workspaces"
              render={(props) => {
                return (
                  <WorkSpace
                    {...props}
                    user={currentUser}
                    createNotification={createNotification}
                    darkModeEnabled={darkModeEnabled}
                    setDarkModeEnabled={setDarkModeEnabled}
                  />
                );
              }}
            />
          </Switch>
        </div>
        {alertEl()}
      </ThemeProvider>
    </div>
  );
}

export default App;
