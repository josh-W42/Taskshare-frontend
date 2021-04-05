import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Post from '../Post';
import BottomAppBar from '../BottomAppBar';
import RoomNav from '../RoomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: `80vh`,
    marginTop: "20px",
    marginBottom: "5vh",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "0px",
    [theme.breakpoints.up("xxl")]: {
      marginBottom: 0,
    },
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    zIndex: 10,
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));


const PostContainer = (props) => {

  const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

  const classes = useStyles();

  const postsArray = posts.map((post, index) => {
    return (
      <React.Fragment key={index}>
        {index === 0 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
        {index === 3 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
        <Post post={post} />
      </React.Fragment>
    );
  });

  return (
    <div className={classes.root}>
      <RoomNav xOffSet={props.xOffSet} />
      <List className={classes.root}>
        {postsArray}
      </List>
      <BottomAppBar xOffSet={props.xOffSet} />
    </div>
  );
}


export default PostContainer;