import { Switch, Route, Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import logo1 from "../pictures/logo1.png"

const Header = () => {
  const { userData, setUserData } = useUserContext();

  const handleLogout = () => {
    setUserData();
  };

  return (
    <nav>
      <div className=" nav_bar nav-wrapper   ">
        <img className="logo1"src={logo1} />
        <ul id="nav-mobile" className="right hide-on-med-and-down">
         
          <li>
            <Link to="/userManagement">Create Profile</Link>
          </li>
          <li>
            <Link to="/listSensors">My Sensors</Link>
          </li>
         
          <li>
            <Link to="/UpdateUser">Edit User Profile</Link>
          </li>
          <li>
            {!userData ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
