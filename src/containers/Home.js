import React, { Component } from 'react';
import md5 from 'md5';
import { NavLink } from 'react-router-dom'

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'
const eventsUrl = URL + 'v1/public/events'
const charsUrl = URL + 'v1/public/characters'
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

class Home extends Component {
    state = {
        comics: [],
        characters: [],
        events: []
    }

    componentDidMount() {
        this.fetchComics()
        this.fetchCharacters()
        this.fetchEvents()
    }
    
    fetchComics = () => {

        let comicStartsWith = alphabet[Math.floor(Math.random() * alphabet.length)]
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = comicsUrl + `?titleStartsWith=${comicStartsWith}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        fetch(fullUrl)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(res.status.text)
          } else {
            return res.json()
          }
        })
        .then(info => {
            this.setState({
                ...this.state,
                comics: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    fetchCharacters = () => {
        let charStartsWith = alphabet[Math.floor(Math.random() * alphabet.length)]
        console.log(charStartsWith)
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = charsUrl + `?nameStartsWith=${charStartsWith}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
                ...this.state,
                characters: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    fetchEvents = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = eventsUrl + `?limit=100&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        fetch(fullUrl)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(res.status.text)
          } else {
            return res.json()
          }
        })
        .then(info => {
            console.log(info.data)
            this.setState({
                ...this.state,
                events: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    chooseImages = () => {
        let comic = this.state.comics[Math.floor(Math.random() * this.state.comics.length)]
        if (comic) {
            while (comic.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                comic = this.state.comics[Math.floor(Math.random() * this.state.comics.length)]
            }

        }

        let character = this.state.characters[Math.floor(Math.random() * this.state.characters.length)]
        if (character) {
            while (character.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                character = this.state.characters[Math.floor(Math.random() * this.state.characters.length)]
            }

        }

        let event = this.state.events[Math.floor(Math.random() * this.state.events.length)]
        if (event) {
            while (event.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                event = this.state.events[Math.floor(Math.random() * this.state.events.length)]
            }

        }

        return this.displayImages(comic, character, event)
    }

    displayImages = (comic, character, event) => {
        if (comic && character && event) {
            let comicImgSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            let charImgSrc = `${character.thumbnail.path}.${character.thumbnail.extension}`
            let eventImgSrc = `${event.thumbnail.path}.${event.thumbnail.extension}`
            return (
                <>
                    <div className="home-img-container">
                        <NavLink to='/comics'><img src={comicImgSrc} alt="Comics" /></NavLink>
                        <h2>Comics</h2>
                    </div>
                    <div className="home-img-container">
                        <NavLink to='/characters'><img src={charImgSrc} alt="Characters" /></NavLink>
                        <h2>Characters</h2>
                    </div>
                    <div className="home-img-container">
                        <NavLink to='/events'><img src={eventImgSrc} alt="Events" /></NavLink>
                        <h2>Events</h2>
                    </div>

                </>
            )
        }


    }

    render() {
        return (
            <div className="home-container">
                <h1>Search Marvel Comics and Characters</h1>
                { this.chooseImages()}
            </div>
        )
    }
}

export default Home