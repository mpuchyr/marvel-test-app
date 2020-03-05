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
                comics: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    displayComic = () => {
        return this.state.comics.map(comic => {
            let imgSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            return (
                <div className="comic">
                    <h1>{comic.title}</h1>
                    <img key={comic.id} src={imgSrc} alt={comic.title}/>
                </div>
            )
        })
    }
    
    render() {
        return(
            <div>
                {this.displayComic()}
            </div>
        )
    }
}

export default Comic