import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import CharacterComicImage from './CharacterComicImage'


class CharacterComics extends Component {
    
    getComic = () => {
        return this.props.comics.map(comic => {
            let comicURI = comic.resourceURI.split("/")
            let comicId = comicURI[comicURI.length - 1]
            let link = `/comics/${comicId}`
            return (
                <div className="event-character">
                    <NavLink to={link} key={comic.name}>
                        <CharacterComicImage comicId={comicId}/>
                    </NavLink>
                </div>
            )
        })
    }

    displayComics = () => {
        return (
            <div className="character-comics">
                {this.getComic()}
            </div>
        )
    }
    
    render() {
        console.log(this.props.comics)
        return (
            <div>
                <h1>Comics</h1>
                {this.displayComics()}
            </div>
        )
    }
}

export default CharacterComics