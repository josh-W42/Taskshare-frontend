import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  appBar: props => ({
    top: 'auto',
    bottom: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${props.xOffSet}px)`,
      marginLeft: props.xOffSet,
    },
  }),
  grow: {
    flexGrow: 1,
  },
}));

const BottomAppBar = (props) => {

  const classes = useStyles(props);

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <TextField
          id="filled-textarea"
          label="Message to Room Name"
          multiline
          fullWidth
          variant="filled"
        />
        {/* <div className={classes.grow} /> */}
      </Toolbar>
    </AppBar>
  )
}

export default BottomAppBar;