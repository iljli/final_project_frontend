 import {useState, React, useEffect} from 'react';
 import { useUserContext } from "../context/UserContext";
import M from "materialize-css";
import man from "../pictures/700.png"


const Update_user = () => {

const [userData, setUserData] = useState();
const {userData: loggedInUser} = useUserContext();

console.log(loggedInUser);


  const handleChange = (e) => {
      // setUserData({...userData, [e.target.name]: e.target.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  const handleInputChange = () => {};

 const userInfo = {
    "username": "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  };

  useEffect(() =>{
    M.updateTextFields(); // to shift the labels up
  }, [])
  
  return (
    <div className="container6">
      <img className="man"src={man}/>
      <div class="row" className="container7">
        <form class="col s6 right-align" onSubmit={handleSubmit}>
          <div class="row">
            <div class=" input-field col s12">
              <input
                id="username"
                type="text"
                class="validate"
                onChange={handleInputChange}
                name="username"
                value={loggedInUser?.username}
              />
              <label >Username</label>
            </div>
            <div class="input-field col s6">
              <input
                id="first_name"
                type="text"
                class="validate"
                onChange={handleInputChange}
                name="first_name"
                value={loggedInUser?.first_name}
              />
              <label >First Name</label>
            </div>
            <div class="input-field col s6">
              <input
                id="last_name"
                type="text"
                class="validate"
                onChange={handleInputChange}
                name="last_name"
                value={loggedInUser?.last_name}
              />
              <label >Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                onChange={handleInputChange}
                name="password"
                value={loggedInUser?.password}
              />
              <label for="password">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                onChange={handleInputChange}
                name="email"
                value={loggedInUser?.email}
              />
              <label >Email</label>
            </div>
          </div>
          {/* <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            pulse
          >
            UPDATE USER
            <i class="material-icons right">send</i>
          </button> */}
          

          <button className=" my_button1 btn waves-effect waves-light pulse #26c6da cyan lighten-1" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>
  
        </form>
      </div>
    </div>
  );
};

export default Update_user;
