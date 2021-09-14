import React from 'react';
import classNames from 'classnames';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <ResponsiveContainer width="99%" height={300}>
            <AreaChart
                data={data}
                syncId="anyId"
                margin={{top: 20}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={x} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={y} stroke={color} fill={color} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

const dataProps = [
    {
        field: "duration",
        color: "#75b7c7"
    },
    {
        field: "images",
        color: "#f0a667"
    }
];

const StatsOverview = () => {
    // TODO: replace placeholder
    const data = [
        {
            date: '8/18/21',
            duration: 10,
            images: 20
        },
        {
            date: '8/19/21',
            duration: 50,
            images: 40
        },
        {
            date: '8/20/21',
            duration: 50,
            images: 30
        },
        {
            date: '8/21/21',
            duration: 30,
            images: 10
        },
        {
            date: '8/22/21',
            duration: 20,
            images: 50
        }
    ];
    return (
        <div className={classNames("view-container", "stats-container")}>
            <p className="view-header">App Statistics</p>
            {dataProps.map(({field, color}) => createAreaChart(data, "date", field, color))}
        </div>
    )
}

export default StatsOverview;