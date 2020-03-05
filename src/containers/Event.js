import React, { Component } from 'react';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const eventsUrl = URL + 'v1/public/events'

class Event extends Component {

    fetchEvent = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let paramsId = parseInt(this.props.match.params.id, 10)
        let fullUrl = eventsUrl + `${paramsId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    }

    render() {
        return (
            <div>
                <h1>Event Placeholder Text</h1>
            </div>
        )
    }

}

export default Event