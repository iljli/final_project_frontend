import { React, useState, useEffect } from 'react';
import M from "materialize-css";
// import { TextInput, Button } from 'react-materialize';
import { useUserContext } from "../context/UserContext";
import { NavLink } from 'react-router-dom';

/* ToDo:
    - activate button only if username and e-mail is provided
    - check if user already exist - do on backend
    - not sure about the intervall of (selectedSensor.config?.measurement_intervals)
*/

const userDataTemplate = {
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
}

const userTemplate = {
    username: "tomuser"
}



const ListSensors = props => {
    const { userData: loggedInUser } = useUserContext();
    const [userData, setUserData] = useState(loggedInUser); // ToDo: prepared for global variable that contains the username
    const [listOfSensors, setListOfSensors] = useState();
    const [selectedSensor, setSelectedSensor] = useState();


    const errorHandler = (error) => {
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };

    const getListOfSensors = (event) => {

        const apiUrl = "http://localhost:3000/users/list_userdata/";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            },
            body: JSON.stringify(userData)
        };

        fetch(apiUrl, options)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`An error has occured during the request. HTTP status code: ${response.status}`)
                return response.json();
            }, errorHandler)
            .then(value => {
                setListOfSensors(value[0].sensors)
                console.log(listOfSensors)
            });
    }

    const handleSelectSensor = (data) => {
        setSelectedSensor(data.sensor);
        // console.log(data.sensor.sensors);
        console.log(selectedSensor);
    }


    useEffect(getListOfSensors, [selectedSensor, loggedInUser]);


    return (
        <div>
            <div class="row">
                <div class="collection with-header  col s6">
                    <li class="collection-header"><h4>Your Sensors</h4></li>
                    {listOfSensors && listOfSensors.map((sensor, index) =>
                        <a href="#!" class="collection-item" key={index} onClick={() => handleSelectSensor({ sensor })} >{sensor?.name} - {sensor.location?.loc_name}</a>
                    )}
                </div>

                {/* ToDo: intervall not sure */}

                <div class="col s6 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">{selectedSensor && selectedSensor?.name}</span>
                            <p>Location: {selectedSensor && selectedSensor.location?.loc_name}</p>
                            <p>Latitude: {selectedSensor && selectedSensor.location?.loc_lat} Longitude: {selectedSensor && selectedSensor.location?.loc_lng}</p>
                            <p>Measurement intervall: {selectedSensor && Math.round(selectedSensor.config?.measurement_intervals / 60000)} Minutes</p>
                            <p>Alarms:
                                {selectedSensor && selectedSensor.config?.alarms.map((alarm, index) =>
                                    <p> Treshold {index + 1}: {alarm?.operator}{alarm?.treshold} {alarm?.measurement_type} </p>)}
                            </p>
                        </div>
                        <div class="card-action">
                            <NavLink to={`/graph/${selectedSensor?._id}`}>Graph</NavLink>

                            <button>Configure Sensor</button> {/* ToDo */}
                            <button>Delete Sensor</button>    {/* ToDo */}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}


export default ListSensors
