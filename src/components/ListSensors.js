import { React, useState, useEffect } from "react";
import M from "materialize-css";
// import { TextInput, Button } from 'react-materialize';
import { useUserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { nanoid } from 'nanoid';
// import { useHistory } from "react-router-dom";

/* ToDo:
    - activate button only if username and e-mail is provided
    - check if user already exist - do on backend
    - not sure about the intervall of (selectedSensor.config?.measurement_intervals)
*/




const ListSensors = (props) => {
    const { userData: loggedInUser } = useUserContext();
    const [userData, setUserData] = useState(loggedInUser);
    const [listOfSensors, setListOfSensors] = useState();
    const [selectedSensor, setSelectedSensor] = useState();


    // const history = useHistory();

    const errorHandler = (error) => {
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };

    const getListOfSensors = (event) => {
        if (!loggedInUser) {
            // history.push('/login');
            throw new Error('User is not logged in')
        };

        const { REACT_APP_BACKEND_URL } = process.env;
        const apiUrl = `${REACT_APP_BACKEND_URL}/users/list_userdata/`;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include",
            },
            body: JSON.stringify(userData),
        };

        fetch(apiUrl, options)
            .then((response) => {
                if (!response.ok)
                    throw new Error(
                        `An error has occured during the request. HTTP status code: ${response.status}`
                    );
                return response.json();
            }, errorHandler)
            .then((value) => {
                setListOfSensors(value[0].sensors);
                // console.log(listOfSensors);
            });
    };

    const handleSelectSensor = (data) => {
        // console.log({ selectedSensor: data.sensor });
        setSelectedSensor(data.sensor);
        // console.log(data.sensor.sensors);
        // console.log(selectedSensor);
    };

    useEffect(getListOfSensors, [selectedSensor, loggedInUser]);

    return (
        <div className="container4">
            <div className=" row">
                <h4>Your Sensors</h4>
                <div class="collection with-header  col s4">
                    {listOfSensors &&
                        listOfSensors.map((sensor, index) => (
                            <a

                                href="#!"
                                className=" link_1 collection-item"
                                key={index}
                                onClick={() => handleSelectSensor({ sensor })}
                            >
                                {sensor?.name} - {sensor.location?.loc_name}
                            </a>
                        ))}
                </div>

                {/* ToDo: intervall not sure */}

                <div class="col s6 m6">
                    <div class="card #00bcd4 cyan">
                        <div class="card-content white-text">
                            <span class="card-title">
                                {selectedSensor && selectedSensor?.name}
                            </span>
                            <p>
                                Location: {selectedSensor && selectedSensor.location?.loc_name}
                            </p>
                            <p>
                                Latitude: {selectedSensor && selectedSensor.location?.loc_lat}{" "}
                                Longitude: {selectedSensor && selectedSensor.location?.loc_lng}
                            </p>
                            <p>
                                Measurement intervall:{" "}
                                {selectedSensor &&
                                    Math.round(
                                        selectedSensor.config?.measurement_intervals / 60000
                                    )}{" "}
                                Minutes
                            </p>
                            <p>
                                Alarms:
                                {selectedSensor &&
                                    selectedSensor.config?.alarms.map((alarm, index) => (
                                        <p>
                                            {" "}
                                            Treshold {index + 1}: {alarm?.operator}
                                            {alarm?.treshold} {alarm?.measurement_type}{" "}
                                        </p>
                                    ))}
                            </p>
                        </div>
                        <div className=" container5 card-action">
                            <NavLink to={`/graph/${selectedSensor?._id}`}>
                                <a class="waves-effect waves-light btn-small">Graph</a>
                            </NavLink>

                            <a class="waves-effect waves-light btn-small">
                                Configure a sensor
                            </a>
                            {/* ToDo */}
                            <NavLink to={`/createSensor`}>
                                <a class="waves-effect waves-light btn-small">
                                    Create new Sensor
                                </a>
                            </NavLink>

                            <a class="waves-effect waves-light btn-small">Delete a Sensor</a>
                            {/* ToDo */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListSensors;
