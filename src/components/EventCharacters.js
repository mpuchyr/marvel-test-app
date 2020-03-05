import React, { Component } from 'react';

class EventCharacters extends Component {

    getCharacterLi = () => {
        return this.props.characters.map(character => {
            console.log(character.name)
            return <li>{character.name}</li>
        })
    }

    displayCharacters = () => {
        return (
            <ul>
                {this.getCharacterLi()}
            </ul>
        )
    }

    render() {
        return (
            <div>
                <h1>Event Character Placeholder</h1>
                { this.displayCharacters()}
            </div>

        )
    }
}

export default EventCharacters