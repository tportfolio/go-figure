import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from 'react-redux';

const typography = {
    typography: {
        fontFamily: [
            'Nunito',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    }
};

/**
 * Blue theme used as the default setting for the app.
 */
const defaultTheme = createTheme({
    palette: {
        primary: { light: "#98b1d9", main: "#5d7396", dark: "#1f3044" },
        secondary: { light: "#f3f8ff", main: "#8696af", dark: "#315e8a" },
        background: {
            default: "#37495e"
        }
    },
    ...typography
});

/**
 * Black and white theme available as a toggle option in settings.
 */
const monochromeTheme = createTheme({
    palette: {
        primary: { light: "#777", main: "#444", dark: "#111" },
        secondary: { light: "#EEE", main: "#444", dark: "#000" },
        background: { 
            default: "#2d2d2d"
        },
        action: {
            disabledBackground: "rgba(0, 0, 0, 0.3)"
        },
    },
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                bar1Determinate: { 
                    background: "#7e7e7e" 
                },
            }
        }
    },
    ...typography
});

/**
 * Wrapper for theme provider that changes theme based on toggle option in settings.
 * @param {*} props 
 * @returns ThemeProvider
 */
const CustomThemeProvider = props => {
    const theme = props.useMonochromeTheme ? monochromeTheme : defaultTheme;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* used to apply background color */}
            {props.children}
        </ThemeProvider>
    );
}

/**
 * Tie component to Redux for getting the state of the 'useMonochromeTheme' option.
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = state => {
    return {
        useMonochromeTheme: state.settings.useMonochromeTheme
    };
};

export default connect(mapStateToProps)(CustomThemeProvider);