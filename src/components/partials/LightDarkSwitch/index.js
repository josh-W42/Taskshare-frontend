import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Tooltip from '@material-ui/core/Tooltip';

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
    <Tooltip title="Toggle Theme" aria-label="Theme Toggler" arrow>
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
    </Tooltip>
  );
}

export default LightDarkSwitch;