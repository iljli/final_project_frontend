import { Switch, Route, Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const { userData, setUserData } = useUserContext();

  const handleLogout = () => {
    setUserData();
  };

  return (
    <nav>
      <div className="nav-wrapper  light-blue darken-3">
        <a href="#" class="brand-logo">
          LOGO
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/listSensors">My Sensors</Link>
          </li>
          <li>
            <Link to="/userManagement">User Management</Link>
          </li>
          <li>
            <Link to="/UpdateUser">Update User Data</Link>
          </li>
          <li>
            <Link to="/contacts">Contact Us</Link>
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
