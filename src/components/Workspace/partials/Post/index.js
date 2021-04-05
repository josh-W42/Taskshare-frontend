import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PostAvatar from '../PostAvatar';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ChatIcon from '@material-ui/icons/Chat';
import AvatarPreview from '../AvatarPreview';
import { Link } from 'react-router-dom';

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
  { icon: <ChatIcon />, name: 'Reply' },
  { icon: <InsertEmoticonIcon />, name: 'Add Reaction' },
];

const Post = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialClick = () => {
    setOpen((prev) => !prev);
  }

  const displayName = () => {
    if (props.post.poster.nickName) {
      return props.post.poster.nickName;
    } else {
      return `${props.post.poster.firstName} ${props.post.poster.lastName}`;
    }
  }

  return (
    <ListItem className={classes.listItem} alignItems="flex-start">
      <ListItemAvatar>
        <PostAvatar />
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
          <Link className="text-decoration-none" to="/workspaces/post">
            <Button>
              {
                props.post.comments.length < 1 ? (
                  'Reply'
                ) : (
                  `${props.post.comments.length} Replies`
                )
              }
            </Button>
            {/* <AvatarPreview members={props.post.comments} message={"Replies"} /> */}
          </Link>
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
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Post;