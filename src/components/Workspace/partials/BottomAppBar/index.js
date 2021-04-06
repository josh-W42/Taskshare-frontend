import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SendIcon from '@material-ui/icons/Send';
import Skeleton from '@material-ui/lab/Skeleton';
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  appBar: props => ({
    top: 'auto',
    bottom: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${props.xOffSet}px)`,
      marginLeft: props.xOffSet,
    },
  }),
  grow: {
    flexGrow: 1,
  },
}));

const { REACT_APP_SERVER_URL } = process.env;

const BottomAppBar = (props) => {

  const [textContent, setTextContent] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');

  const classes = useStyles(props);

  const handleChange = (e) => {
    setTextContent(e.target.value);
  }

  const resetForm = () => {
    setTextContent('');
  }

  
  if (props.isLoadingRoom) {
    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Skeleton className="w-100" variant="rect" height={100} />
        </Toolbar>
      </AppBar>
    );
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = ''
    let postData = {
      textContent
    };

    if (props.isComment) {
      url = `${REACT_APP_SERVER_URL}/comments/create`;
      postData.postId = props.post._id;
    } else {
      url = `${REACT_APP_SERVER_URL}/posts/create`;
      postData.roomId = props.room._id;
    }

    try {
      const response = await axios.post(url, postData);
      let newPost = props.isComment ? response.data.comment : response.data.post;

      // Emit to server
      props.socket.emit('new post', { newPost, isComment: props.isComment ? true : false, });
    } catch (error) {
      if (error.response.status === 403) {
        setTimeout(() => {
          props.createNotification("error", "You Do Not Have Access To That Room");
        }, 1000)
        setRedirectTo(`/workspaces/${props.room.workspaceId}`);
        setRedirect(true);
      } else if (error.response.status === 401) {
        setTimeout(() => {
          props.createNotification("error", "You Must Log In To Access Workspaces And Rooms");
        }, 1000)
        setRedirectTo('/login');
        setRedirect(true);
      } else {
        props.createNotification("error", "Could Not Post At This Time.");
      }
    }
    resetForm();
  }

  if (redirect) {
    return <Redirect to={redirectTo} />
  }

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={11}>
              <TextField
                id="filled-textarea"
                label={ props.isComment ? `Comment on post` : `Post to ${props.room.name}` }
                multiline
                fullWidth
                value={textContent}
                onChange={handleChange}
                variant="filled"
              />
            </Grid>
            <Grid item xs={1} className={"text-start"}>
              <Button type="submit">
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </form>
    </AppBar>
  )
}

export default BottomAppBar;