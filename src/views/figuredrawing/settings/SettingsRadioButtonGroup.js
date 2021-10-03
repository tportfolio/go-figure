import * as React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';

/**
 * Creates a grouping of radio buttons, from which one option at a time is selected.
 * base template: https://mui.com/components/radio-buttons/#RowRadioButtonsGroup.js
 * @param {*} props 
 * @returns SettingsRadioButtonGroup component
 */
const SettingsRadioButtonGroup = props => {
    const { header, options, selected, onChangeHandler } = props;
    return (
        <div className="figure-drawing-display-panel-row">
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