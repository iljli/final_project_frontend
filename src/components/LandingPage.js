import react from "react";
import logo from "../pictures/logo.gif"


const Landing = () => {



  return (
    <div className="container1">
      <img className="logo" src={logo} />
      <h1 className="landing"> You want to be able to take care of your plants ,but in the easiest way? </h1>
      <h5 className="landing1"> <span className="colored"> Don't worry , we got you ... </span> </h5>
      <p className="landing1"> With us , you are able to create your profile and set up your sensor <br />
        the way it works best for you. You can see the temperature , humidity<br />
        and  pressure  in a graph , so you will have a visual representation how  <br />
        your plants are feeling. <br /><br /><br />
        <span className="colored">Are you ready? </span> </p>
    </div>

  );
};

export default Landing;
