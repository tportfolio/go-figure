import * as React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';

// base template: https://mui.com/components/radio-buttons/#RowRadioButtonsGroup.js
const SettingsRadioButtonGroup = props => {
    const { header, options, selected, onChangeHandler } = props;
    return (
        <div className="figure-drawing-setting">
            <FormControl component="fieldset">
                <Typography gutterBottom>
                    {header}
                </Typography>
                <RadioGroup row>
                    {Object.keys(options).map(k =>
                        <FormControlLabel
                            key={options[k].name}
                            value={options[k].name}
                            control={<Radio />}
                            label={<Typography>{options[k].name}</Typography>}
                            checked={selected.name === options[k].name}
                            onClick={() => onChangeHandler(options[k])}
                        />
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default SettingsRadioButtonGroup;