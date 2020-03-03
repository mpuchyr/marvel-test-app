import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class Characters extends Component {
    state = {
        characters: [],
        startsWith: ''
    }

    componentDidMount = () => {
        this.fetchCharacters()
    }

    fetchCharacters = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = ''
        if (this.state.startsWith) {
            fullUrl = charsUrl + `?nameStartsWith=${this.state.startsWith}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        } else {
            fullUrl = charsUrl + `?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        }
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
            this.setState({
                characters: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    displayCharacters = () => {
        return this.state.characters.map(character => {
            let imgSrc = `${character.thumbnail.path}.${character.thumbnail.extension}`
            console.log(imgSrc)
            return (
                <div className="comic">
                    <img key={character.id} src={imgSrc} alt={character.name}/>
                    <h4>{character.name}</h4>
                </div>
            )
        })
    }
    
    render() {        
        return(
            <>
                <h1>Placeholder Charcter Text</h1>
                {this.displayCharacters()}
            </>
        )
    }
}

export default Characters