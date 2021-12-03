import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import DatePicker from './DatePicker';

/*
    installed packages:
    npm install --save react date-fns
    npm install --save react-date-range

*/

// ToDo: time-series must be reverted

const Graph = props => {
    const { _id } = useParams();
    const [rawMeasurements, setRawMeasurements] = useState();
    const [graphOptions, setGraphOptions] = useState();


    function extractMeasurements(objects) {
        console.log(objects);

        const recorded_at = objects.map(val => {
            return val.recorded_at;
        });
        const temperatures = objects.map(val => {
            return val.temperature;
        });
        const pressure = objects.map(val => {
            return val.pressure;
        });
        const humidity = objects.map(val => {
            return val.humidity;
        });


        console.log(recorded_at);
        console.log(temperatures);

        setGraphOptions(
            {
                // title: {
                //     text: 'Hello Echarts-for-react.',
                // },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Temperature °C', 'Humidity % rH']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    top: 30,
                    left: 50,
                    right: 70,
                    bottom: 30
                },
                xAxis:
                //  [
                {
                    type: 'category',
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    data: recorded_at,

                },
                // {
                //     type: 'category',
                //     // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                //     data: recorded_at,
                // }],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        max: 30,
                        min: 10,
                        name: 'Temperature °C',
                        // boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        max: 100,
                        min: 0,
                        name: 'Humidity % rH',
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: 'Temperature °C',
                        // data: [820, 932, 901, 934, 1290, 1330, 1320],
                        data: temperatures,
                        type: 'line',
                        smooth: true,
                        xAxisIndex: 0,
                        yAxisIndex: 0,

                    },
                    {
                        name: 'Humidity % rH',
                        // data: [820, 932, 901, 934, 1290, 1330, 1320],
                        data: humidity,
                        type: 'bar',
                        smooth: true,
                        xAxisIndex: 0,
                        yAxisIndex: 1,
                    },
                ],
                tooltip: {
                    trigger: 'axis',
                },
            });
    }

    const dateSelected = (e) => {
        console.log("Action");
    }

    const getValue = (e) => {
        console.log(e);
    }


    const errorHandler = (error) => {
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };


    const getMeasurements = async (event) => {

        const apiUrl = `http://localhost:3000/measurements/sensor/${_id}/100`; // ToDo: limit is fixed

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            },
        };

        fetch(apiUrl, options)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`An error has occured during the request. HTTP status code: ${response.status}`)
                return response.json();
            }, errorHandler)
            .then(value => {
                console.log(value.measurementsData);
                setRawMeasurements(value.measurementsData);
                extractMeasurements(value.measurementsData);
            });
    }

    useEffect(getMeasurements, []);

    return (
        <>
            <div class="graph-xy">
                Sensor id: {_id}
                {graphOptions && <ReactECharts option={graphOptions} />}
            </div>
            <div>
                <DatePicker dateSelect={dateSelected} setDatarange={getValue} />
            </div>
        </>
    )
}


export default Graph
