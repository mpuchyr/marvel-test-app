import React, { Component } from 'react';
import md5 from 'md5';
import CharacterComics from '../components/CharacterComics'

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class Character extends Component {
    state = {
        characters: [],
        comics: []
    }


    componentDidMount() {
        this.fetchCharacter()
    }

    fetchCharacter = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let paramsId = parseInt(this.props.match.params.id, 10)
        let fullUrl = charsUrl + `/${paramsId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        fetch(fullUrl)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.text)
            } else {
                return res.json()
            }
        })
        .then(info => {
            // console.log(info.data.results[0].comics.items)
            this.setState({
                characters: info.data.results,
                comics: info.data.results[0].comics.items
            })
        })
        .catch(err => console.log(err))
    }

    displayCharacter = () => {
        return this.state.characters.map(character => {
            let imgSrc = `${character.thumbnail.path}.${character.thumbnail.extension}`
            return (
                <div className="comic">
                    <h1>{character.name}</h1>
                    <img key={character.id} src={imgSrc} alt={character.name}/>                    
                </div>
            )
        })
    }
    
    render() {
        return(
            <div>
                {this.displayCharacter()}
                <CharacterComics comics={this.state.comics}/>
            </div>
        )
    }
}

export default Character