import React, { Component } from 'react';
import md5 from 'md5'

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'

class Comic extends Component {
    state = {
        comics: []
    }

    componentDidMount() {
        this.fetchComic()
    }

    fetchComic = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let paramsId = parseInt(this.props.match.params.id, 10)
        let fullUrl = comicsUrl + `/${paramsId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
                <h1>Comic Placeholder Text</h1>
            </div>
        )
    }
}

export default Comic