import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class NavBar extends Component {

    render() {
        return(
            <div className="navbar">
                <NavLink to="/">Home</NavLink>

                <NavLink to="/characters">Characters</NavLink>

                <NavLink to="/comics">Comics</NavLink>

                <NavLink to="/events">Events</NavLink>
            </div>
        )
    }
}

export default NavBar