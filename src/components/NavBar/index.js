import React from 'react'
import { NavLink } from 'react-router-dom'
import P from 'prop-types'
import { NavWrapper, ThemeSelector } from './style.js'
import { themes, defaultTheme } from '../../globalStyle.js'

class NavBar extends React.Component {
  handleChange = selectedOption => {
    const { changeTheme } = this.props
    changeTheme(selectedOption.value)
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
              <NavLink to="/addNew/" onClick={ev => ev.preventDefault()} activeClassName="active">
                Add New
              </NavLink>
              <ul className="submenu">
                <li>
                  <NavLink to="/addNew/Places/" activeClassName="active">
                    Places
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addNew/Devices/" activeClassName="active">
                    Devices
                  </NavLink>
                </li>
              </ul>
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
NavBar.propTypes = { changeTheme: P.func }

export default NavBar
