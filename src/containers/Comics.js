import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import md5 from 'md5';


const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'


class Comics extends Component {
    state = {
        comics: [],
        startsWith: '',
        limit: 21
    }
    
    componentDidMount() {
        this.fetchComics()
    }

    fetchComics = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = ''
        if (this.state.startsWith) {
            fullUrl = comicsUrl + `?titleStartsWith=${this.state.startsWith}&limit=${this.state.limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        } else {
            fullUrl = comicsUrl + `?limit=${this.state.limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
        return this.state.comics.map(comic => {
            let imgSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            let link = `/comics/${comic.id}`
            return (
                <div className="comic">
                    <NavLink to={link}>
                        <img className="comic-book-img"key={comic.id} src={imgSrc} alt={comic.title}/>
                    </NavLink>
                    <h4>{comic.title}</h4>
                </div>
            )
        })
    }
    
    handleOnChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.fetchComics()
    }

    render() {
        return (
            <>
                <div className="comic-form">
                    <h1>Comics</h1>
                    <form onChange={this.handleOnChange} onSubmit={this.handleOnSubmit}>
                    <input type="text" name="startsWith" placeholder="name"></input>
                    <br />
                    <input type="text" name="limit" placeholder="limit"></input>
                    <br />
                    <input type="submit"></input>
                    </form>
                    <br />
                </div>
                <div className="comic-container">
                    {this.displayComics()}
                </div>
            </>

        )
    }
}

export default Comics