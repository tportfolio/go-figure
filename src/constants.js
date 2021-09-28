import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: { light: "rgb(152, 177, 217)", main: "rgb(93, 115, 150)", dark: "rgb(31, 48, 68)" },
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