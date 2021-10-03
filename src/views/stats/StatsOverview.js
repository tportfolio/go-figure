import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from "moment";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

import "./stats.css";

const dataProps = [
    {
        field: "timeElapsedSecs",
        color: "#75b7c7"
    },
    {
        field: "numImages",
        color: "#f0a667"
    }
];

const buttons = ["Individual", "Aggregate"];

/**
 * Creates area chart based on input data and props.
 * Baseline source: https://recharts.org/en-US/examples/SynchronizedAreaChart
 * @param {*} data - data to represent
 * @param {*} x - field for x axis
 * @param {*} y - field for y axis 
 * @param {*} color - color of stroke/fill
 * @returns containerized area chart component
 */
const createAreaChart = (data, x, y, color) => {
    return (
        // note: width at 99% is a workaround to container not resizing correctly on window resize
        // https://stackoverflow.com/a/53205850
        <ResponsiveContainer key={y} width="99%" height={300}>
            <AreaChart
                data={data}
                syncId="figureDrawing"
                margin={{ top: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={x} style={{ fill: "white" }}>
                    <Label value={x} offset={0} position="bottom" style={{ fill: "gray" }} />
                </XAxis>
                <YAxis style={{ fill: "white" }}>
                    <Label value={y} angle={-90} position="insideLeft" style={{ fill: "gray" }} />
                </YAxis>
                <Tooltip />
                <Area type="monotone" dataKey={y} stroke={color} fill={color} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

const StatsOverview = props => {
    const useStyles = makeStyles((theme) => ({
        button: {
            background: theme.palette.secondary.main
        },
        selectedButton: {
            background: theme.palette.secondary.dark
        }
    }));

    const [selectedButton, setSelectedButton] = useState("Individual");
    const { sessionHistory } = props;

    let data = sessionHistory.sessions.map(session => {
        const date = new Date(session.timeEpochMsecs);
        return {
            ...session,
            timeElapsedSecs: Math.floor(session.timeElapsedMsecs / 1000),
            date: moment(date).format("MM/DD/yyyy HH:mm:ss")
        }
    });

    if (selectedButton === "Aggregate") {
        data.reduce((acc, cur, i) => {
            const timeElapsedSecs = acc.timeElapsedSecs + cur.timeElapsedSecs;
            const numImages = acc.numImages + cur.numImages;

            const ret = { timeElapsedSecs, numImages };
            data[i] = { ...data[i], ...ret };
            return ret;
        }, { timeElapsedSecs: 0, numImages: 0 });
    }

    const classes = useStyles();

    return (
        <div id="stats-container" className="view-container" >
            <p className="view-header">Figure Drawing Statistics</p>
            <ButtonGroup variant="contained" style={{ marginBottom: "50px" }}>
                {buttons.map(button => (
                    <Button
                        className={button === selectedButton ? classes.selectedButton : classes.button}
                        key={button}
                        onClick={() => setSelectedButton(button)}
                    >
                        {button}
                    </Button>
                ))}
            </ButtonGroup>
            {dataProps.map(({ field, color }) => createAreaChart(data, "date", field, color))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sessionHistory: state.figuredrawing.sessionHistory
    }
};

export default connect(mapStateToProps)(StatsOverview);