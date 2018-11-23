import React from 'react'
//import './style.css'
import { NavLink } from 'react-router-dom'
import { NavWrapper, ThemeSelector } from './style.js'
import { themes, defaultTheme } from '../../globalStyle.js'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        this.props.changeTheme(selectedOption.value)
    }

    render() {
        return (
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
                    <ThemeSelector
                        defaultValue={defaultTheme}
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={themes}
                    />
                </div>
            </NavWrapper>
        )
    }
}

export default NavBar
