import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const { REACT_APP_SERVER_URL } = process.env;

const RoomDialog = (props) => {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState(props.permissions);
  const [role, setRole] = useState(props.role);


  const toggleOpen = () => {
    setOpen((prev) => !prev);
    resetDialog();
  };
  
  const handlePrivacy = () => {
    setIsPrivate((prev) => !prev);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      name,
      isPrivate,
      workspaceId: props.workspaceId,
      isAMessageRoom: false,
    };    
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/rooms/create`,
        roomData
      );      
      props.createNotification("success", "Room Created Successfully");
    } catch (error) {
      props.createNotification("error", "Couldn't Create Room.");
    }
    toggleOpen();
  };
  
  const resetDialog = () => {
    setName('');
    setIsPrivate(false);
  }

  return (
    <>
      <Button
        onClick={toggleOpen}
        className="w-100" 
        disabled={ permissions.includes('*') || permissions.includes('create-public-room') ? false : true }
      >
        <AddIcon />
        Add a Room
      </Button>
      <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Create A New Room</DialogTitle>
          <DialogContent>
            <FormControl color="secondary" fullWidth variant="filled">
              <InputLabel required htmlFor="filled-room-name">Room Name</InputLabel>
              <FilledInput
                id="filled-room-name"
                type="text"
                required
                autoFocus
                value={name}
                onChange={handleName}
              />
            </FormControl>
            <FormControl
              fullWidth
              disabled={ permissions.includes('*') || permissions.includes('create-private-room') ? false : true }
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isPrivate}
                    onChange={handlePrivacy}
                    color="secondary"
                    name="Is Private"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label={isPrivate ? "Private Group" : "Public Group"}
                labelPlacement="end"
              />
              <FormHelperText id="privacy-helper-text">Special Permissions Are Needed To Make Private Rooms.</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="default">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RoomDialog;