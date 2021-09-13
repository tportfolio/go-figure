import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// baseline source from simple accordion example: https://material-ui.com/components/accordion/
const About = () => {
    return (
        <div id="faq-container">
            <p id="faq-header">Frequently Asked Questions</p>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>What is Go Figure?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Go Figure is a program intended to support artists who need a one-stop shop
                        for figure drawing and image reference organization.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>What are the hot keys for the program?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        DEL - removes highlighted image(s)<br />
                        CTRL - selects/deselects image
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default About;