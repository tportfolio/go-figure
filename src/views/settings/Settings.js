import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Switch } from '@mui/material';

import { mapEntryToAccordion } from '../../utils/utils';
import { toggleSaveSessionData, toggleUseMonochromeTheme } from '../../store/SettingsReducer';
import { channels } from '../../channels';

/**
 * Switch that sits on top of accordion panel summary.
 * @param {*} props 
 * @returns SettingSwitch component
 */
const SettingSwitch = props => {
    const onClick = e => {
        e.stopPropagation(); // avoid opening panel at same time
        props.onClickHandler();
    };

    return (
        <Switch onClick={onClick} checked={props.checked} />
    );
};

/**
 * Push updated setting to Electron to save to file.
 * @param {*} onClickHandler 
 * @param {*} data 
 * @returns None
 */
const saveSetting = (onClickHandler, data) => () => {
    onClickHandler();
    window.api.send(channels.SETTINGS_SAVE_TO_FILE, data);
}

/**
 * Renders app-wide settings to be viewed/changed.
 * @param {*} props 
 * @returns Settings component
 */
const Settings = props => {
    const { saveSessionData, useMonochromeTheme, toggleSaveSessionData, toggleUseMonochromeTheme } = props;

    const settingEntries = [
        {
            summary: "Save figure drawing session statistics to file",
            details: <span>If enabled, saves figure drawing session statistics in <i>/path/to/home/.go-figure/stats.json</i>.</span>,
            component: (
                <SettingSwitch
                    onClickHandler={saveSetting(toggleSaveSessionData, { saveSessionData: !saveSessionData })}
                    checked={saveSessionData}
                />
            )
        },
        {
            summary: "Enable monochrome theme",
            details: "If enabled, uses monochrome theme instead of default theme.",
            component: (
                <SettingSwitch
                    onClickHandler={saveSetting(toggleUseMonochromeTheme, { useMonochromeTheme: !useMonochromeTheme })}
                    checked={useMonochromeTheme}
                />
            )
        }
    ];

    return (
        <div className={classNames("view-container", "accordion-container")}>
            <p className="view-header">Settings</p>
            {settingEntries.map(entry => mapEntryToAccordion(entry))}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        saveSessionData: state.settings.saveSessionData,
        useMonochromeTheme: state.settings.useMonochromeTheme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleSaveSessionData: () => dispatch(toggleSaveSessionData()),
        toggleUseMonochromeTheme: () => dispatch(toggleUseMonochromeTheme())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);