import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import EventCharacterImage from './EventCharacterImage'


class EventCharacters extends Component {
    state = {
        characterHTML: []
    }



    getCharacter = () => {
        console.log("in EventCharacters")
        console.log(this.props.characters)
        return this.props.characters.map(character => {
            let charURI = character.resourceURI.split("/")
            let charId = charURI[charURI.length - 1]
            let link = `/characters/${charId}`
            return (
                <div className="character">
                    <NavLink to={link} key={character.name}>
                        <EventCharacterImage charId={charId}/>
                    </NavLink>
                </div>
            )
        })
    }

    displayCharacters = () => {
        return (
            <div className="character-container">
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