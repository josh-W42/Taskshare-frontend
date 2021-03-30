import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const AvatarPreview = (props) => {
  return (
    <ButtonGroup variant="text" color="default" aria-label="text primary button group">
      <Button>
        <AvatarGroup max={3}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar
            alt="Trevor Henderson"
            src="/static/images/avatar/5.jpg"
          />
        </AvatarGroup>
        {props.message}
      </Button>
    </ButtonGroup>
  )
}


export default AvatarPreview;