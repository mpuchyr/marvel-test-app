import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class EventCharacters extends Component {
    state = {
        characters: []
    }

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
                <h1>Characters</h1>
                { this.displayCharacters()}
            </div>

        )
    }
}

export default EventCharacters