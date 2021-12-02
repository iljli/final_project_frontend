import { Switch, Route, Link, NavLink } from "react-router-dom";

const Header = () => {
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
            <Link to="/userManagement">User Management</Link>
          </li>
          <li>
            <Link to="/listSensors">My Sensors</Link>
          </li>
          <li>
            <Link to="/contacts">Contact Us</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
