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
        summary: "What are the hot keys for the reference canvas?",
        details: (
            <span>
                <b>C</b> - toggles drawing ability on canvas<br />
                <b>CTRL + A</b> - selects all images on canvas<br />
                <b>CTRL + D</b> - deselects all images on canvas<br />
                <b>H</b> - horizontally mirrors selected image(s)<br />
                <b>V</b> - vertically mirrors selected image(s)<br />
                <b>[0-9]</b> - changes opacity of selected images(s), where 0 = 100% opacity<br />
                <b>DEL</b> - removes selected image(s)<br />
                <b>CTRL</b> - selects/deselects image on click<br />
                <b>SHIFT</b> - rotates image on click and drag<br />
            </span>
        )
    },
    {
        summary: "Where can application files be found on my machine?",
        details: <span>All files are written to <i>/path/to/home/.go-figure</i>.</span>,

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