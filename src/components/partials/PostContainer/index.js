import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useState } from 'react';
import Post from '../Post';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listSection: {
    backgroundColor: 'inherit',
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
    return <Post key={index} post={post} />;
  });

  return (
    <List className={classes.root}>
      {postsArray}
    </List>
  );
}


export default PostContainer;
