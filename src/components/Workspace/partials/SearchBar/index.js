import { makeStyles, useTheme, withStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
}));

const { REACT_APP_SERVER_URL } = process.env;

const SearchBar = (props) => {
  const [rooms, setRooms] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    sortSearchable();
  }, [])

  const sortSearchable = () => { 
    const rooms = [];

    for (let key in props.workspace.rooms) {
      if (!props.workspace.rooms[key].isPrivate) {
        props.workspace.rooms[key].id = key;
        rooms.push(props.workspace.rooms[key])
      }
    }

    for (let key in props.member.rooms) {
      if (props.member.rooms[key].isPrivate) {
        props.member.rooms[key].id = key;
        rooms.push(props.member.rooms[key]);
      }
    }

    setRooms(rooms);
  }
  

  const handleAdd = async () => {
    const search = document.querySelector('#workspace-search').value;
    const found = rooms.filter((room) => room.name === search)[0];

    const url = `${REACT_APP_SERVER_URL}/rooms/${found.id}/join`;

    try {
      const response = await axios.put(url);
      props.createNotification("success", "Successfully Joined Room");
    } catch (error) {
      props.createNotification("error", "Couldn't Join Room ");
    }
  }
  
  const handleLeave = async () => {
    const search = document.querySelector('#workspace-search').value;
    const found = rooms.filter((room) => room.name === search)[0];

    const url = `${REACT_APP_SERVER_URL}/rooms/${found.id}/leave`;

    try {
      const response = await axios.put(url);
      props.createNotification("success", "Successfully Left Room");
    } catch (error) {
      props.createNotification("error", "Couldn't Leave Room ");
    } 
  }

  return (
    <>
      <div className={classes.search}>
        <Grid container justify="flex-end" alignItems="center">
          <Grid item xs>
            <Autocomplete
              id="workspace-search"
              options={rooms}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Search Workspace" variant="filled" />}
            />
          </Grid>
          <Grid item xs>
            <Button onClick={handleAdd}>
              <AddIcon /> Join A Room
            </Button>
            <Button onClick={handleLeave}>
              <ExitToAppIcon /> Leave A Room
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default SearchBar;