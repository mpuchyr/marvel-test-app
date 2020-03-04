import React, { Component } from 'react';

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

    render() {
        return (
            <div>
                <h1>Search Marvel Comics and Characters</h1>
            </div>
        )
    }
}

export default Home