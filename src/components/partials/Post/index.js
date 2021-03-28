import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PostAvater from '../PostAvatar';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ChatIcon from '@material-ui/icons/Chat';
import AvatarPreview from '../AvatarPreview';

const useStyles = makeStyles((theme) => ({
  listItem: {
    transition: "0.5s",
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

  return (
    <ListItem className={classes.listItem} alignItems="flex-start">
      <ListItemAvatar>
        <PostAvater />
      </ListItemAvatar>
      <Grid container direction="column">
        <ListItemText
          primary={
            <>
              <span>Brunch this weekend? </span>-
              <span className="text-muted"> 4:30pm</span>
            </>
          }
          secondary={
            <>
              It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
              The point of using Lorem Ipsum is that it has a more-or-less
              normal distribution of letters, as opposed to using 'Content
              here, content here', making it look like readable English. Many
              desktop publishing packages and web page editors now use Lorem
              Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </>
          }
        />
        <Grid direction="row" container alignItems="center">
          <AvatarPreview message={"Replies"} />
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