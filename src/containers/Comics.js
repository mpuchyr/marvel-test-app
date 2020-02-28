import React, { Component } from 'react';
import md5 from 'md5';


const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'


class Comics extends Component {
    state = {
        comics: [],
        startsWith: ''
    }
    
    componentDidMount() {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = ''
        if (this.state.startsWith) {
            fullUrl = comicsUrl + `?titleStartsWith=${this.state.startsWith}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        } else {
            fullUrl = comicsUrl + `?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        }
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
                <div className="comic">
                    <img key={comic.id} src={imgSrc} alt={comic.title}/>
                    <h4>{comic.title}</h4>
                </div>
            )
        })
    }
    
    
    render() {
        return (
            <>
                <form>
                    <input type="text"></input>
                    <input type="submit"></input>
                </form>
                <br />
                {this.displayComics()}
            </>
        )
    }
}

export default Comics