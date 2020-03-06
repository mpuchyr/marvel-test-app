import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import EventCharacterImage from './EventCharacterImage'


class EventCharacters extends Component {
    state = {
        characterHTML: []
    }



    getCharacter = () => {
        return this.props.characters.map(character => {
            let charURI = character.resourceURI.split("/")
            let charId = charURI[charURI.length - 1]
            let link = `/characters/${charId}`
            return (
                <div className="event-character">
                    <NavLink to={link} key={character.name}>
                        <EventCharacterImage charId={charId}/>
                    </NavLink>
                </div>
            )
        })
    }

    displayCharacters = () => {
        return (
            <div className="event-characters">
                {this.getCharacter()}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>Characters</h1>
                { this.displayCharacters()}

            </div>

        )
    }
}

export default EventCharacters