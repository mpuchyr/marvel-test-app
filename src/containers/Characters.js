import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class Characters extends Component {
    state = {
        characters: [],
        startsWith: '',
        limit: 20
    }

    componentDidMount = () => {
        this.fetchCharacters()
    }

    fetchCharacters = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = ''
        if (this.state.startsWith) {
            fullUrl = charsUrl + `?nameStartsWith=${this.state.startsWith}&limit=${this.state.limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        } else {
            fullUrl = charsUrl + `?limit=${this.state.limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
            const imgSrc = `${character.thumbnail.path}.${character.thumbnail.extension}`
            const link = `/characters/${character.id}`
            return (
                <div className="character">
                    <NavLink to={link} >
                        <img key={character.id} src={imgSrc} alt={character.name}/>
                    </NavLink>
                    <h4>{character.name}</h4>
                </div>
            )
        })
    }

    handleOnChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.fetchCharacters()
    }
    
    render() {        
        return(
            <div className="character-container">
                <h1>Characters</h1>
                <form onChange={this.handleOnChange} onSubmit={this.handleOnSubmit}>
                    <input type="text" name="startsWith" placeholder="name"></input>
                    <br />
                    <input type="text" name="limit" placeholder="limit"></input>
                    <br />
                    <input type="submit"></input>
                </form>
                <br />
                {this.displayCharacters()}
            </div>
        )
    }
}

export default Characters