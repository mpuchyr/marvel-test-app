import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'

class CharacterComicImage extends Component {
    state = {
        imgSrc: '',
        alt: ''
    }

    componentDidMount() {
        this.getComicImage()
    }

    getComicImage = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = comicsUrl + `/${this.props.comicId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        return fetch(fullUrl)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.text)
            } else {
                return res.json()
            }
        })
        .then(info => {
            this.setState({
                imgSrc: `${info.data.results[0].thumbnail.path}.${info.data.results[0].thumbnail.extension}`,
                alt: `${info.data.results[0].title}`

            }) 
          
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <img src={this.state.imgSrc} alt={this.state.alt} />
                <p>{this.state.alt}</p>
            </div>
        )
    }
}

export default CharacterComicImage