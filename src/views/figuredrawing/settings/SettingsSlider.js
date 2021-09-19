import React, { useState } from 'react';
import { Slider, Typography, Grid, Input } from '@mui/material';

// base example from: https://mui.com/components/slider/#InputSlider.js
const SettingsSlider = props => {
    const { minValue, maxValue, step, defaultValue, header, displayIcon, onChangeHandler } = props;
    const [value, setValue] = useState(defaultValue);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        onChangeHandler(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < minValue) {
            setValue(minValue);
        } else if (value > maxValue) {
            setValue(maxValue);
        }
    };

    return (
        <div className="figure-drawing-setting">
            <Typography gutterBottom>
                {header}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {displayIcon}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : minValue}
                        min={minValue}
                        max={maxValue}
                        step={step}
                        onChange={handleSliderChange}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            min: minValue,
                            max: maxValue,
                            type: 'number'
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default SettingsSlider;