import { useState } from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';


const TextFieldModifier = (props) => {
  const [formats, setFormats] = useState([]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
      <ToggleButton value="bold" aria-label="bold">
        <Tooltip title="Bold" placement="top" arrow>
          <FormatBoldIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <Tooltip title="Italic" placement="top" arrow>
          <FormatItalicIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <Tooltip title="Underline" placement="top" arrow>
          <FormatUnderlinedIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TextFieldModifier;
