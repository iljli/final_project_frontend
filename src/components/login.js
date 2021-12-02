import { useEffect, useState } from "react";

const Login = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const { REACT_APP_BACKEND_URL } = process.env;

  const url = `${REACT_APP_BACKEND_URL}/users/login`;

  //  const oneUser = users && users.map((user)=>` The username is ${user.username}` )
  const login = (e) => {
    e.preventDefault();
    if (!userInput.username || !userInput.password) {
      return alert("Please enter a username and a password");
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(userInput),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("ERROR");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    // e.target contains value + name + ...
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  // console.log(userInput);

  return (
    <div class="row ">
      <div class="col s12 login_container">
        <img
          class="responsive-img circle login_avatar"
          src="https://www.nareb.com/site-files/uploads/2017/03/fg-avatar-anonymous-user-retina.png"
        />
        <form>
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={userInput.username}
          />
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={userInput.password}
          />
        </form>
        <button
          class="btn waves-effect waves-light login_button"
          type="submit"
          onClick={login}
        >
          Submit
          <i class="material-icons right">vpn_key</i>
        </button>
      </div>
    </div>
  );
};

export default Login;
