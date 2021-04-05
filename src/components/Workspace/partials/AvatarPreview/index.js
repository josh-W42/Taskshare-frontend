import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const AvatarPreview = (props) => {
  const avatarArray = () => {
    const avatars = [];
    for (const memberId in props.members) {
      avatars.push(
        <Avatar key={memberId} alt={`${props.members[memberId].firstName} ${props.members[memberId].lastName}`} src={`${props.members[memberId].imageUrl}`} />
      );
    }
    return avatars;
  }

  return (
    <ButtonGroup variant="text" color="default" aria-label="text primary button group">
      <Button>
        <AvatarGroup max={3}>
          {avatarArray()}
        </AvatarGroup>
        {props.message}
      </Button>
    </ButtonGroup>
  )
}

export default AvatarPreview;