import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class NavBar extends Component {

    render() {
        return(
            <div className="navbar">
                <button><NavLink to="/">Home</NavLink></button>

                <button><NavLink to="/characters">Characters</NavLink></button>

                <button><NavLink to="/comics">Comics</NavLink></button>

                <button><NavLink to="/events">Events</NavLink></button>
            </div>
        )
    }
}

export default NavBar