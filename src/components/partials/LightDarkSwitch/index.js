import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

const LightDarkSwitch = (props) => {

  const toggleDarkMode = (e) => {
    try {
      const themeValue = props.darkModeEnabled ? 'Light' : 'Dark';
      localStorage.setItem('theme', themeValue);
    } catch (error) {
      console.log("Could Not Store Theme Preference");
    }
    props.setDarkModeEnabled((prev) => !prev);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={props.darkModeEnabled}
            onChange={toggleDarkMode}
          />
        }
        label={props.darkModeEnabled ? "Dark" : "Light"}
      />
    </FormGroup>
  );
}

export default LightDarkSwitch;