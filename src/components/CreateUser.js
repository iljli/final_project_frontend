import { React, useState } from 'react';
import M from "materialize-css";
// import { TextInput, Button } from 'react-materialize';

/* ToDo:
    - activate button only if username and e-mail is provided
    - check if user already exist - do on backend
*/

const userDataTemplate = {
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
}

const UserManagement = props => {
    const [userData, setUserData] = useState(userDataTemplate);
    const [isDataSent, setIsDataSent] = useState(false);

    const handleInputChange = (event) => {
        // console.log(event.target.value);
        setUserData({ ...userData, [event.target.name]: event.target.value });
        // console.log(userData);
    }

    const notification = () => {
        M.toast({ html: 'New user created', classes: 'rounded' })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData);

        const { REACT_APP_BACKEND_URL } = process.env;
        const apiUrl = `${REACT_APP_BACKEND_URL}/users/create_user`;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            },
            body: JSON.stringify(userData)
        };

        fetch(apiUrl, options)
            .then((res) => {
                if (!res.ok) throw new Error("Could not create post");
                setIsDataSent(true);
                notification();
                return res.json();
            })
            .catch((err) => console.log(err));



    }

    return (
        <div>
            <div class="row">
                <form class="col s6 right-align" onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="username" type="text" class="validate"
                                onChange={handleInputChange}
                                name="username"
                                value={userData.username}
                            />
                            <label for="username">Username</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="first_name" type="text" class="validate"
                                onChange={handleInputChange}
                                name="first_name"
                                value={userData.first_name}
                            />
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate"
                                onChange={handleInputChange}
                                name="last_name"
                                value={userData.last_name}
                            />
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate"
                                onChange={handleInputChange}
                                name="password"
                                value={userData.password}
                            />
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate"
                                onChange={handleInputChange}
                                name="email"
                                value={userData.email} />
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Create User
                        <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </div>
    )
}


export default UserManagement
