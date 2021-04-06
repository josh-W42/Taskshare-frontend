// Imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

// components
import PostAvatar from '../PostAvatar';
import AvatarPreview from '../AvatarPreview';

// material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';




const useStyles = makeStyles((theme) => ({
  listItem: {
    transition: "0.5s",
    textDecoration: "none",
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [  
  { icon: <DeleteForeverIcon />, name: 'Delete' },
  { icon: <EditIcon />, name: 'Edit' },
  { icon: <InsertEmoticonIcon />, name: 'Add Reaction' },
];

const { REACT_APP_SERVER_URL } = process.env;

const Post = (props) => {

  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/");
  
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialClick = () => {
    setOpen((prev) => !prev);
  }

  const deletePost = async () => {
    const url = `${REACT_APP_SERVER_URL}/posts/${props.post._id}/delete`;

    try {
      const response = await axios.delete(url);
      props.createNotification("success", "Post Deleted");

      // Emit to server
      props.socket.emit('delete post', props.post);
    } catch (error) {
      if (error.response.status === 403) {
        props.createNotification("error", "Invalid Permissions");
      } else if (error.response.status === 401) {
        setTimeout(() => {
          props.createNotification("error", "You Must Log In To Do That");
        }, 1000)
        setRedirectTo('/login');
        setRedirect(true);
      } else {
        props.createNotification("error", "An Error Occurred.");
      }
    }
  }

  const deleteComment = async () => {
    const url = `${REACT_APP_SERVER_URL}/comments/${props.post._id}/delete`;

    try {
      const response = await axios.delete(url);
      props.createNotification("success", "Comment Deleted");

      // Emit to server
      props.socket.emit('delete post', props.post);
    } catch (error) {
      if (error.response.status === 403) {
        props.createNotification("error", "Invalid Permissions");
      } else if (error.response.status === 401) {
        setTimeout(() => {
          props.createNotification("error", "You Must Log In To Do That");
        }, 1000)
        setRedirectTo('/login');
        setRedirect(true);
      } else {
        props.createNotification("error", "An Error Occurred.");
      }
    }
  }

  const handleAction = (option) => {
    switch (option) {
      case 'Reply':
        props.createNotification("warning", "Not Implemented Yet!");
        break;
      case 'Edit':
        props.createNotification("warning", "Not Implemented Yet!");
        break;
      case 'Delete':
        if (props.isComment) {
          if (props.member._id === props.post.posterId || props.member.role.includes('admin')) {
            deleteComment();
          } else {
            props.createNotification("error", "You Can Only Delete Comments You Make!");
          }
        } else {
          if (props.member._id === props.post.posterId || props.member.role.includes('admin')) {
            deletePost();
          } else {
            props.createNotification("error", "You Can Only Delete Posts You Make!");
          }
        }
        break;
      case 'Add Reaction':
        props.createNotification("warning", "Not Implemented Yet!");
        break;
      default:
        break;
    }
    handleClose();
  }

  const displayName = () => {
    if (props.post.poster.nickName) {
      return props.post.poster.nickName;
    } else {
      return `${props.post.poster.firstName} ${props.post.poster.lastName}`;
    }
  }

  return (
    <ListItem className={props.topMargin} alignItems="flex-start">
      <ListItemAvatar>
        <PostAvatar poster={props.post.poster} />
      </ListItemAvatar>
      <Grid container direction="column">
        <ListItemText
          primary={
            <>
              <span className="text-capitalize m-1">
                {displayName()}
              </span>-
              <span className=""> {props.time} </span>
            </>
          }
          secondary={
            <>
              {props.post.content.textContent}
            </>
          }
        />
        <Grid direction="row" container alignItems="center">
          {
            props.isComment ? (
              <></>
            ) : (
              <Link className="text-decoration-none" to={`/workspaces/${props.post.workspaceId}/rooms/${props.post.roomId}/posts/${props.post._id}`}>
                <Button>
                  Replies
                </Button>
                {/* <AvatarPreview members={props.post.comments} message={"Replies"} /> */}
              </Link>
            )
          }
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            className={classes.speedDial}
            hidden={false}
            onClick={handleDialClick}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="left"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement="bottom"
                onClick={() => handleAction(action.name)}
              />
            ))}
          </SpeedDial>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Post;