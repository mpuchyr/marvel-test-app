import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class CharacterComicImage extends Component {
    state = {
        imgSrc: '',
        alt: ''
    }
    render() {
        return (
            <div>
                <h2>Image Placeholder</h2>
            </div>
        )
    }
}

export default CharacterComicImage