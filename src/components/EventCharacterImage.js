import React, { Component } from 'react';
import md5 from 'md5'

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class EventCharacterImage extends Component {
    state = {
        imgSrc: '',
        alt: ''
    }

    componentDidMount() {
        this.getCharacterImage()
    }

    getCharacterImage = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = charsUrl + `/${this.props.charId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
                alt: `${info.data.results[0].name}`

            }) 
          
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return(
            <>
                <img className="event-character-img" src={this.state.imgSrc} alt={this.state.alt} />
                <p>{this.state.alt}</p>
            </>
        )
    }
}

export default EventCharacterImage