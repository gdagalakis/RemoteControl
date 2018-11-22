import React from 'react'
//import './style.css'
import { NavLink } from 'react-router-dom'
import { NavWrapper, ThemeSelector } from './style.js'
import Select from 'react-select'

const options = [
    { value: 'VanillaTheme', label: 'Vanilla' },
    { value: 'DarculaTheme', label: 'Darcula' },
    { value: 'Funny', label: 'Funny' },
]

class NavBar extends React.Component {
    changeTheme = this.props.changeTheme

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        this.changeTheme(selectedOption.value)
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
        }
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
                    <ThemeSelector>
                        <Select
                            className="select"
                            classNamePrefix="theme_select"
                            value={this.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </ThemeSelector>
                </div>
            </NavWrapper>
        )
    }
}

export default NavBar
