import React from 'react';
import classNames from 'classnames';
import { mapEntryToAccordion } from '../../utils/utils';

/**
 * Objects to be represented as accordion entries. 
 */
const faqEntries = [
    {
        summary: "What is Go Figure?",
        details: `Go Figure is a program intended to support artists who need a one-stop shop \
        for figure drawing and image reference organization.`
    },
    {
        summary: "What are the hot keys for the program?",
        details: (
            <span>
                DEL - removes highlighted image(s)<br />
                CTRL - selects/deselects image on click
            </span>
        )
    }
];

/**
 * Creates a list of accordion entries for the above object list.
 * @returns About component
 */
const About = () => {
    return (
        <div className={classNames("view-container", "accordion-container")}>
            <p className="view-header">Frequently Asked Questions</p>
            {faqEntries.map(entry => mapEntryToAccordion(entry))}
        </div>
    );
}

export default About;