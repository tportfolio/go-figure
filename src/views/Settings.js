import React from 'react';
import classNames from 'classnames';
import { mapEntryToAccordion } from '../utils/utils';

const settingEntries = [
    {
        summary: "Setting 1",
        details: "Setting details"
    },
    {
        summary: "Setting 2",
        details: "Setting details"
    }
];

const Settings = () => {
    return (
        <div className={classNames("accordion-container", "view-container")}>
            <p className="view-header">Settings</p>
            {settingEntries.map(entry => mapEntryToAccordion(entry))}
        </div>
    );
}

export default Settings;