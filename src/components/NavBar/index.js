import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
    <nav className="nav" id="menu-outer">
        <div className="table">
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/devices/" activeClassName="active">
                        Devices
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users/" activeClassName="active">
                        Users
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default NavBar
