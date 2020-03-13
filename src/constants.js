import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import range from "lodash/range";

export const transparencyKeys = range(1, 10).map(n => "SET_TRANSPARENCY_" + (10 * n) + "_PCT");

export const keyMap = {
    TOGGLE_SIDEBAR_ON: "right",
    TOGGLE_SIDEBAR_OFF: "left"
};

export const theme = createMuiTheme({
    palette: {
        primary: { light: blue[300], main: "#141e3d", dark: blue[700] },
        secondary: { light: indigo[50], main: indigo[500], dark: indigo[700] },
    },
    typography: {
        fontFamily: [
            'Nunito',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    }
});