import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextFieldModifier from '../TextFieldModifier';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SendIcon from '@material-ui/icons/Send';
import Skeleton from '@material-ui/lab/Skeleton';

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

  if (props.isLoadingRoom) {
    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="column"
          >
            <Grid item xs>
              <Skeleton variant="rect" height={50} />
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs>
                <Skeleton variant="rect" height={50} width={100} />
              </Grid>
              <Grid item xs className={"text-end"}>
                <ToggleButtonGroup aria-label="text formatting">
                  <Skeleton variant="rect" height={50} width={100} />
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          direction="column"
        >
          <Grid item xs>
            <TextField
              id="filled-textarea"
              label={`Post to ${props.room.name}`}
              multiline
              fullWidth
              variant="filled"
            />
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs>
              <TextFieldModifier />
            </Grid>
            <Grid item xs className={"text-end"}>
              <ToggleButtonGroup aria-label="text formatting">
                <ToggleButton value="send" aria-label="send" disabled>
                  <SendIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default BottomAppBar;