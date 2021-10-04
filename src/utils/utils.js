import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as logger from 'loglevel';

/**
 * Creates accordion component from JSON object.
 * Baseline source from: https://material-ui.com/components/accordion/
 * @param {*} (object with summary, details, and component type [optional] provided) 
 * @returns accordion component
 */
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

/**
 * Request files to loaded on a certain data channel.
 * @param {*} channel - requesting channel
 * @returns none
 */
export const requestImages = channel => event => {
    const { files } = event.target; // this is a FileList; convert to array for ease
    if (files.length > 0) {
        const fileArray = Array.from(files).map(f => f.path);
        logger.debug(`Requesting the following files on channel ${channel}: ${JSON.stringify(fileArray)}`);
        window.api.send(channel, fileArray);
    }
}