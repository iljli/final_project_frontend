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

const FIVE_MINUTES = 300;

const Graph = props => {

    const { _id } = useParams();
    const [rawMeasurements, setRawMeasurements] = useState();
    const [graphOptions, setGraphOptions] = useState();
    const [dateRange, setDateRange] = useState(
        {
            startDate: Math.floor(Date.now() / 1000) - FIVE_MINUTES,
            endDate: Math.floor(Date.now() / 1000) - FIVE_MINUTES,
        });
    const [numberOfValuesGraph, setNumberOfValuesGraph] = useState(10);

    function extractMeasurements(objects) {
        objects.reverse();
        // console.log(objects);

        const recorded_at = objects.map(val => {
            let date_string = new Date(val.recorded_at * 1000);
            let year = date_string.getFullYear();
            let month = ("0" + (date_string.getMonth() + 1)).slice(-2);
            let day = ("0" + date_string.getDate()).slice(-2);

            const date = `${year}/${month}/${day}`
            return (date);
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


        // console.log(recorded_at);
        // console.log(temperatures);

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
                        max: 40,
                        min: 0,
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

    const dateSelected = (e) => {  // not used
        // console.log("dateSelected");
    }

    const drawDiagram = (e) => {
        getMeasurements();
    }

    const getValue = (e) => {
        // console.log(e);
        if (e.startDate && e.endDate) setDateRange(e);
    }

    const handleResulution = (e) => {
        if (!e.target.value) {
            return setNumberOfValuesGraph(10);
        }
        // console.log(e.target.value);
        setNumberOfValuesGraph(Number(e.target.value));
    }

    const errorHandler = (error) => {
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };


    const getLastMeasurements = async (event) => {
        const { REACT_APP_BACKEND_URL } = process.env;

        const apiUrl = `${REACT_APP_BACKEND_URL}/measurements/sensor/${_id}/100`; // ToDo: limit is fixed

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
                // console.log(value.measurementsData);
                setRawMeasurements(value.measurementsData);
                extractMeasurements(value.measurementsData);
            });
    }

    const getMeasurements = async (event) => {
        const { REACT_APP_BACKEND_URL } = process.env;
        const apiUrl = `${REACT_APP_BACKEND_URL}/measurements/slice/${_id}/${dateRange?.startDate}/${dateRange?.endDate}/${numberOfValuesGraph}`;

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
                // console.log(value.measurementsData);
                setRawMeasurements(value.measurementsData);
                extractMeasurements(value.measurementsData);
            });
    }



    useEffect(getLastMeasurements, []);

    return (
        <>
            <div class="graph-xy">
                Sensor id: {_id}
                {graphOptions && <ReactECharts option={graphOptions} />}
            </div>
            <div>
                <DatePicker dateSelect={dateSelected} setDatarange={getValue} />
            </div>

            <div class="row">
                <div class="input-field col s4">
                    <select class="browser-default" defaultValue="" onChange={handleResulution}>
                        <option value="10" disabled>Number of Values in Graph</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="250">250</option>
                    </select>
                </div>
                <button class="btn waves-effect waves-light col s4" onClick={drawDiagram}>Get Graph</button>
            </div>
        </ >
    )
}


export default Graph
