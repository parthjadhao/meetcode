import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return <nav>
        <Link to="/">MeetCode</Link>
        <ul>
            <li>
                <Link to="/Events">
                    Events
                </Link>
            </li>
            <li>
                <Link to="/SignIn">
                    User SignIn
                </Link>
            </li>
            <li>
                <Link to="/AdminSignIn">
                    Admin SignIn 
                </Link>
            </li>
            <li>
                <Link to="/AdminLogin">
                    Admin Login
                </Link>
            </li>
            <li>
                <Link to="/Login">
                    user Login
                </Link>
            </li>
        </ul>
    </nav>
}

export default Navbar