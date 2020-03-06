import React, { Component } from 'react'


class CharacterComics extends Component {
    
    getComic = () => {
        return this.props.comicss.map(comic => {
            let charURI = comic.resourceURI.split("/")
            let charId = charURI[charURI.length - 1]
            let link = `/characters/${charId}`
            return (
                <div className="event-character">
                    <NavLink to={link} key={comic.name}>
                        <EventCharacterImage charId={charId}/>
                    </NavLink>
                </div>
            )
        })
    }
    
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