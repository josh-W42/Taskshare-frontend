import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Post from '../Post';
import BottomAppBar from '../BottomAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: "76vh",
    maxHeight: "100vh",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "0px",
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

  const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6, 7]);

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
    <List className={classes.root}>
      {postsArray}
    </List>
  );
}


export default PostContainer;