import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import CharacterComicImage from './CharacterComicImage'


class CharacterComics extends Component {
    
    // getComic = () => {
    //     return this.props.comicss.map(comic => {
    //         let comicURI = comic.resourceURI.split("/")
    //         let comicId = charURI[charURI.length - 1]
    //         let link = `/comics/${comicId}`
    //         return (
    //             <div className="event-character">
    //                 <NavLink to={link} key={comic.name}>
    //                     <EventCharacterImage comicId={comicId}/>
    //                 </NavLink>
    //             </div>
    //         )
    //     })
    // }
    
    render() {
        console.log(this.props.comics)
        return (
            <div>
                <h1>Character Comics Placeholder</h1>
            </div>
        )
    }
}

export default CharacterComics