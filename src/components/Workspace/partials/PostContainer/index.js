// Imports
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// Components
import Post from '../Post';
import SkeletonPost from '../SkeletonPost';
import BottomAppBar from '../BottomAppBar';
import RoomNav from '../RoomNav';

// Material-UI Components
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: `90vh`,
    maxHeight: `90vh`,
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


const { REACT_APP_SERVER_URL } = process.env;


const PostContainer = (props) => {
  
  const [room, setRoom] = useState(null);
  const [posts, setPosts, getPosts] = useState([1, 2, 3, 4, 5, 6]);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [path, setPath] = useState(props.location.pathname);
  const [lastRoom, setLastRoom] = useState(null);


  const classes = useStyles();

  // Url Parameters
  // wId - Workspace id
  // rId = room id
  const { wId, rId } = useParams();

  useEffect(() => {
    // We have to get the room
    if (!props.isLoadingData) {
      if (!room) {
        getRoom(rId);
      } else {
        getAllPosts(rId);
        const id = `${rId}-room`;
        props.socket.emit("join room", { id });
        setLastRoom(id);
      }
    }
  }, [props.isLoadingData, room])
  
  useEffect(() => {
    // If Your viewing a room and use navigation to get to another room
    // You need to get the room data again
    if (path !== props.location.pathname) {
      setIsLoadingRoom(true)
      setIsLoadingPosts(true);
      getRoom(rId);
      getAllPosts(rId);
      setPath(props.location.pathname);

      // Also, you need to leave the old posting room and join a new one
      props.socket.emit('leave room', { id: lastRoom });
      const id = `${rId}-room`;
      props.socket.emit('join room', { id });
      setLastRoom(id);

    }
  }, [props.location])

  useEffect(() => {
    // real-time get new posts
    if (!isLoadingPosts) {
      props.socket.on('newContent', (data) => {
        addToPosts(data);
      });
    }
      return () => {
        props.socket.off('newContent');
      }
    }, [isLoadingPosts])
    
    
  const addToPosts = async (data) => {
    setPosts((posts) => {
      return posts.concat([data]);
    });
  }


  const getRoom = async (id) => {
    const url = `${REACT_APP_SERVER_URL}/rooms/${rId}`;

    try {
      // Get the room data
      const response = await axios.get(url);
      const room = response.data.result;
      // And store the room, and state non-loading status
      setRoom(room);
      setIsLoadingRoom(false);
    } catch (error) {
      if (error.response.status === 403) {
        setTimeout(() => {
          props.createNotification("error", "You Do Not Have Access To That Room");
        }, 1000)
        setRedirectTo(`/workspaces/${wId}`);
      } else if (error.response.status === 401) {
        setTimeout(() => {
          props.createNotification("error", "You Must Log In To Access Workspaces And Rooms");
        }, 1000)
        setRedirectTo('/login');
      } else {
        setTimeout(() => {
          props.createNotification("error", "Room Does Not Exist.");
        }, 1000)
        setRedirectTo(`/workspaces/${wId}`);
      }
      setRedirect(true);
    }
  }

  const getAllPosts = async id => {
    const url = `${REACT_APP_SERVER_URL}/rooms/${rId}/allPosts`;

    try {
      // Get All Posts
      const response = await axios.get(url);
      const posts = response.data.results;
      // store posts
      setPosts(posts);
      // Change The a Loading State of Posts
      setIsLoadingPosts(false);
    } catch (error) {
      setTimeout(() => {
        props.createNotification("error", "Room Does Not Exist.");
      }, 1000);
      setRedirectTo(`/workspaces/${wId}`);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Redirect to={redirectTo} />
  }

  const postsArray = () => {
    const array = [];
    let lastSubheader = -1;

    for (let i = 0; i < posts.length; i++) {
      // if loading just push skeletons
      if (isLoadingPosts) {
        array.push(
          <React.Fragment key={`post-skel-${i}`}>
            <SkeletonPost />
          </React.Fragment>
        );
      } else {
        // figure out the subheaders
        const timeNow = Date.now();
        let timePosted = posts[i].createdAt;
        timePosted = new Date(timePosted);
        // 1000 milliseconds * 60 seconds * 60 minutes * 24 hours = 86400000 milliseconds to 1 Day.
        const dayDiff = Math.floor((timeNow - timePosted) / 86400000);

        if (dayDiff !== lastSubheader) {
          array.push(<ListSubheader key={`subheader-${posts[i]._id}`} className={classes.subheader}>{timePosted.toDateString()}</ListSubheader>)
          lastSubheader = dayDiff;
        }

        let twelveHourFormat = 'AM'
        let formattedHour = (timePosted.getHours() + 1);
        if (formattedHour > 12) {
          formattedHour = formattedHour - 12;
          twelveHourFormat = 'PM'
        } else if (formattedHour === 12) {
          twelveHourFormat = 'PM'
        }

        const time = `${formattedHour}:${timePosted.getMinutes()} ${twelveHourFormat}`;
      
        array.push(
          <React.Fragment key={posts[i]._id}>
            <Post time={time} post={posts[i]} />
          </React.Fragment>
        );
      }
    }

    return array;
  };

  return (
    <div className={classes.root}>
      <RoomNav
        room={room}
        isLoadingRoom={isLoadingRoom}
        xOffSet={props.xOffSet}
      />
      <List id="scrollTarget" className={classes.root}>{postsArray()}</List>
      <BottomAppBar
        room={room}
        socket={props.socket}
        isLoadingRoom={isLoadingRoom}
        xOffSet={props.xOffSet}
      />
    </div>
  );
}


export default PostContainer;