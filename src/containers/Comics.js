import React, { Component } from 'react';
import md5 from 'md5';


const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'


class Comics extends Component {
    state = {
        comics: [],
    }
    
    componentDidMount() {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        fetch(comicsUrl + `?format=comic&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(res.status.text)
          } else {
            return res.json()
          }
        })
        .then(info => {
            this.setState({
                comics: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    displayComics = () => {
        console.log(this.state)
        return this.state.comics.map(comic => {
            let imgSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            console.log(imgSrc)
            return (
                <>
                    <img src={imgSrc} alt={comic.title}/>
                    <h4>{comic.title}</h4>
                </>
            )
        })
    }
    
    
    render() {
        return (
            <div>
                {this.displayComics()}
            </div>
        )
    }
}

export default Comics