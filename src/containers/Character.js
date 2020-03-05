import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const charsUrl = URL + 'v1/public/characters'

class Character extends Component {
    state = {
        characters: []
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
            console.log(info)
            this.setState({
                characters: info.data.results
            })
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return(
            <div>
                <h1>Character Placeholder Text</h1>
            </div>
        )
    }
}

export default Character