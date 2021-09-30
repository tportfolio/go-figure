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

const defaultTheme = createTheme({
    palette: {
        primary: { light: "rgb(152, 177, 217)", main: "rgb(93, 115, 150)", dark: "rgb(31, 48, 68)" },
        secondary: { light: "#f3f8ff", main: "#8696af", dark: "#315e8a" },
        background: {
            default: "rgb(55, 73, 94)"
        }
    },
    ...typography
});

const monochromeTheme = createTheme({
    palette: {
        primary: { light: "#777", main: "#444", dark: "#111" },
        secondary: { light: "#EEE", main: "#444", dark: "#000" },
        background: {
            default: "#222"
        }
    },
    ...typography
});

const CustomThemeProvider = props => {
    const theme = props.useMonochromeTheme ? monochromeTheme : defaultTheme;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* used to apply background color */}
            {props.children}
        </ThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        useMonochromeTheme: state.settings.useMonochromeTheme
    };
};

export default connect(mapStateToProps)(CustomThemeProvider);