import Avatar from '@material-ui/core/Avatar';

const ProfileIcon = (props) => {

  const displayName = () => {
    if (props.person.nickName) {
      return props.person.nickName;
    } else {
      return `${props.person.firstName} ${props.person.lastName}`;
    }
  }

  return (
    <Avatar alt={displayName()} src={props.person.imageUrl} />
  )
}

export default ProfileIcon;