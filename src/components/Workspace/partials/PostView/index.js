import { makeStyles } from "@material-ui/core";
import Post from "../Post"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: `100vh`,
    marginTop: "65px",
    marginBottom: "105px",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "0px",
    [theme.breakpoints.up("xxl")]: {
      marginBottom: 0,
    },
  },
}));

const PostView = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Post post={props.post} />
    </div>
  )
}

export default PostView;