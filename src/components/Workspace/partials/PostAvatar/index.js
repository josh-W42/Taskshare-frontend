import ProfileIcon from "../ProfileIcon";

const PostAvatar = (props) => {
  return (
    <>
      <ProfileIcon person={props.poster} />
    </>
  )
}

export default PostAvatar;