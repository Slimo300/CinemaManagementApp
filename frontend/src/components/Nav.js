import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../images/logo.png";
import axiosObject, { BASE_URL } from "../Requests";

const Nav = ({ user, setUser }) => {

    const Logout = async () => {
        try {
            await axiosObject.post(BASE_URL+"/users/logout", {}, {
                withCredentials: true,
            });
            window.localStorage.clear();
            setUser(null);
        } catch(err) {
            alert(JSON.stringify(err.response.data));
        }
    };

    return (
        <nav className="bg-violet navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" width="250" height="50" className="d-inline-block align-text-top" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/repertoire">Repertoire</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                        </li>
                    </ul>
                    <NavLink className="nav-item nav-link px-2" to="/admin">Admin</NavLink>
                    {!user?<NavLink className="nav-item nav-link px-2" to="/login">Login</NavLink>:null}
                    {!user?<NavLink className="nav-item nav-link px-2" to="/register">Register</NavLink>:null}
                    {user?<button className="btn bg-violet btn-primary" onClick={Logout}>Log Out</button>:null}
                </div>
            </div>
        </nav>
    )
}

export default Nav;