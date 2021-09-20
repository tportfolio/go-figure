import * as React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';

// base template: https://mui.com/components/radio-buttons/#RowRadioButtonsGroup.js
const SettingsRadioButtonGroup = props => {
    const { header, options } = props;
    return (
        <div className="figure-drawing-setting">
            <FormControl component="fieldset">
                <Typography gutterBottom>
                    {header}
                </Typography>
                <RadioGroup row>
                    {options.map(v =>
                        <FormControlLabel
                            key={v}
                            value={v}
                            control={<Radio />}
                            label={<Typography>{v}</Typography>}
                        />
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default SettingsRadioButtonGroup;