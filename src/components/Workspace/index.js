import ResponsiveDrawer from "../partials/Drawer"

const WorkSpace = (props) => {
  return (
    <div>
      <ResponsiveDrawer
        darkModeEnabled={props.darkModeEnabled}
        setDarkModeEnabled={props.setDarkModeEnabled}
      />
    </div>
  )
}

export default WorkSpace;