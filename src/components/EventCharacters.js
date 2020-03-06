import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

let timeStamp = Date.now()
let hash = md5(timeStamp + privateKey + publicKey)

class EventCharacters extends Component {


    getCharacterLi = () => {
        return this.props.characters.map(character => {
            let charURI = character.resourceURI.split("/")
            let charId = charURI[charURI.length - 1]
            let link = `/characters/${charId}`
            this.getCharacterImage(charId)
            console.log(charId)
            console.log(character.name)
            return <li><NavLink to={link}>{character.name}</NavLink></li>
        })
    }

    getCharacterImage = (charId) => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = charsUrl + `/${charId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        fetch(fullUrl)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.text)
            } else {
                return res.json()
            }
        })
        .then(info => {
            console.log(info)
            
        })
        .catch(err => console.log(err))
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