import { React, useState } from 'react';
import M from "materialize-css";
import outline from "../pictures/outline.png"
import grass from "../pictures/grass.png"
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
        // console.log(userData);

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
        <div className="container_1">
            <div className="container_2 row">
                <img className="outline" src={outline}/>
                
                
                <form className=" form_1 col s6 right-align" onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="username" type="text" class="validate"
                                onChange={handleInputChange}
                                name="username"
                                value={userData.username}
                            />
                            <label for="username #000000 black">Username</label>
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
                    <button className="my_button btn waves-effect waves-light pulse" type="submit" name="action">Create User
                        <i class="material-icons right">send</i>
                    </button>
                   
                </form>
            </div>
            <img className="grass" src="https://media1.giphy.com/media/ZZTklXupTzGtbf9kYq/giphy.gif?cid=790b7611c8ecd7acf2dd1f1828db55fd8c316910b4b0a208&rid=giphy.gif&ct=s"/>
        </div>
    )
}


export default UserManagement
