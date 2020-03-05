import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const eventsUrl = URL + 'v1/public/events'

class Event extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        this.fetchEvent()
    }

    fetchEvent = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let paramsId = parseInt(this.props.match.params.id, 10)
        let fullUrl = eventsUrl + `/${paramsId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
                events: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    displayEvent = () => {
        return this.state.events.map(event => {
            let imgSrc = `${event.thumbnail.path}.${event.thumbnail.extension}`
            return (
                <div className="event">
                    <h1>{event.title}</h1>
                    <img key={event.id} src={imgSrc} alt={event.title}/>
                    <p>{event.description}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.displayEvent()}
            </div>
        )
    }

}

export default Event