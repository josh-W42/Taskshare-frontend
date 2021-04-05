import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";

import ResponsiveDrawer from "./partials/Drawer"

const { REACT_APP_SERVER_URL } = process.env;

const WorkSpace = (props) => {

  const [workspace, setWorkspace] = useState(null);
  const [member, setMember] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');

  const { id } = useParams();

  useEffect(() => {
    // First we have to get workspace and member data
    if (!props.isLoadingData) {
      if (!workspace) {
        getWorkspace(id);
      } else {
        getMember(id);
      }
    }
  }, [props.isLoadingData, workspace])

  // retrieves workspace data
  const getWorkspace = async id => {
    const url = `${REACT_APP_SERVER_URL}/workspaces/${id}`;

    try {
      const response = await axios.get(url);
      const result = response.data.result;
      setWorkspace(result);
    } catch (error) {
      if (error.response.status === 403) {
        setTimeout(() => {
          props.createNotification("error", "You Do Not Have Access To That Workspace");
        }, 1000)
      } else if (error.response.status === 401) {
        setTimeout(() => {
          props.createNotification("error", "You Must Log In To Access Workspaces");
        }, 1000)
        setRedirectTo('/login');
      } else {
        setTimeout(() => {
          props.createNotification("error", "Workspace Does Not Exist.");
        }, 1000)
      }
      setRedirect(true);
    }
  }

  // retrieves member data
  const getMember = async id => {
    const url = `${REACT_APP_SERVER_URL}/members/lookup/workspace/${id}`;

    try {
      // Get and store the member data
      const response = await axios.get(url);
      const result = response.data.result;
      setMember(result);

      // Connect the socket to all available rooms.
      connectToRooms();
    } catch (error) {
      setTimeout(() => {
        props.createNotification("error", "An Error Occurred When Retrieving Your Data, Please Try Again.");
      }, 1000)
      setRedirect(true);
    }
  }

  // connects the socket to all rooms originally in
  const connectToRooms = async () => {
    // First Join The workspace
    props.socket.emit("join room", { workspace: id });

    // Then Join all the rooms and Messages They had Originally Joined
    for (const key in member.rooms) {
      props.socket.emit("join room", { id: key });
    }
  }

  if (redirect) {
    return <Redirect to={redirectTo} />
  }

  return (
    <div>
      <ResponsiveDrawer
        workspace={workspace}
        member={member}
        darkModeEnabled={props.darkModeEnabled}
        setDarkModeEnabled={props.setDarkModeEnabled}
        createNotification={props.createNotification}
        user={props.user}
        isAuth={props.isAuthenticated}
        handleLogout={props.handleLogout}
      />
    </div>
  )
}

export default WorkSpace;