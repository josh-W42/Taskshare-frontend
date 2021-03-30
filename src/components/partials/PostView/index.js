import Post from "../Post"

const PostView = (props) => {
  return (
    <div>
      <Post post={props.post} />
    </div>
  )
}

export default PostView;