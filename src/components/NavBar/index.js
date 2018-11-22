import React from 'react'
//import './style.css'
import { NavLink } from 'react-router-dom'
import { NavWrapper } from './style.js'

const NavBar = ({ changeTheme }) => (
    <NavWrapper>
        <div>
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
            <select onChange={e => changeTheme(e.target.value)}>
                <option value="VanillaTheme"> Vanilla</option>
                <option value="DarculaTheme"> Darcula</option>
                <option value="Funny"> Funny</option>
            </select>
        </div>
    </NavWrapper>
)

export default NavBar
