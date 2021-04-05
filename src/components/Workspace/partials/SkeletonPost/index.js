// Imports
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

// components
import AvatarPreview from '../AvatarPreview';
import PostAvatar from '../PostAvatar';

// Material-UI
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ChatIcon from '@material-ui/icons/Chat';
import Skeleton from '@material-ui/lab/Skeleton';


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
  variableWidth: {
    width: "30vw",
  },
  variableWidthName: {
    width: "20vw",
  },
  variableWidthPost: {
    width: "60vw",
  },
}));

const actions = [  
  { icon: <ChatIcon />, name: 'Reply' },
  { icon: <InsertEmoticonIcon />, name: 'Add Reaction' },
];

const SkeletonPost = (props) => {

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

  return (
    <ListItem className={classes.listItem} alignItems="flex-start">
      <ListItemAvatar>
        <Skeleton variant="circle" width={50} height={50} />
      </ListItemAvatar>
      <Grid container direction="column">
        <ListItemText
          primary={
            <>
              <p>
                <Skeleton variant="rect" className={classes.variableWidthName} height={20} />
              </p>
            </>
          }
          secondary={
            <>
              <Skeleton variant="rect" className={classes.variableWidthPost} height={50} />
            </>
          }
        />
        <Grid direction="row" container alignItems="center">
          <Skeleton variant="rect" className={classes.variableWidth} height={35} />
          <Skeleton className={classes.speedDial} variant="circle" width={70} height={70} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default SkeletonPost;