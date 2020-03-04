import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'
const eventsUrl = URL + 'v1/public/events'
const charsUrl = URL + 'v1/public/characters'

class Home extends Component {
    state = {
        comics: [],
        characters: [],
        events: []
    }

    
    fetchComics = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = comicsUrl + `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = charsUrl + `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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

    fetchEvents = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = eventsUrl + `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
                events: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Search Marvel Comics and Characters</h1>
            </div>
        )
    }
}

export default Home