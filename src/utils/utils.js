import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// https://stackoverflow.com/a/34842797
export const imageHash = s => '' + (s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0) >>> 0); //bit shift in order to get unsigned integer

// baseline source from simple accordion example: https://material-ui.com/components/accordion/
export const mapEntryToAccordion = ({ summary, details }) => {
    return (
        <Accordion key={summary}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{summary}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {details}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}