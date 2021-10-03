import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as logger from 'loglevel';

// https://stackoverflow.com/a/34842797
export const imageHash = s => '' + (s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0) >>> 0); //bit shift in order to get unsigned integer

// baseline source from simple accordion example: https://material-ui.com/components/accordion/
export const mapEntryToAccordion = ({ summary, details, component }) => {
    return (
        <Accordion key={summary}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    {summary}
                </Typography>
                {component}
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {details}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export const requestImages = channel => event => {
    const { files } = event.target; // this is a FileList; convert to array for ease
    if (files.length > 0) {
        const fileArray = Array.from(files).map(f => f.path);
        logger.debug(`Requesting the following files on channel ${channel}: ${JSON.stringify(fileArray)}`);
        window.api.send(channel, fileArray);
    }
}