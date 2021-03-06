import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const eventsUrl = URL + 'v1/public/events'

class Events extends Component {
    state = {
        events: [],
        startsWith: '',
        limit: 20
    }

    componentDidMount() {
        this.fetchEvents()
    }

    fetchEvents = () => {
        let timeStamp = Date.now()
        let hash = md5(timeStamp + privateKey + publicKey)
        let fullUrl = ''
        if (this.state.startsWith) {
            fullUrl = eventsUrl + `?nameStartsWith=${this.state.startsWith}&limit=${this.state.limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        } else {
            fullUrl = eventsUrl + `?limit=${this.state.limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
            console.log(info.data)
            this.setState({
                events: info.data.results
            })
        })
        .catch(err => console.log(err))
    }

    displayEvents = () => {
        return this.state.events.map(event => {
            const imgSrc = `${event.thumbnail.path}.${event.thumbnail.extension}`
            const link = `/events/${event.id}`
            return (
                <div className="event">
                    <NavLink to={link}>
                        <img key={event.id} src={imgSrc} alt={event.title}/>
                    </NavLink>
                    <h4>{event.title}</h4>
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
        this.fetchEvents()
    }


    render(){
        return (
            <>
                <div className="event-form">
                    <h1>Events</h1>
                    <form onChange={this.handleOnChange} onSubmit={this.handleOnSubmit}>
                    <input type="text" name="startsWith" placeholder="name"></input>
                    <br />
                    <input type="text" name="limit" placeholder="limit"></input>
                    <br />
                    <input type="submit"></input>
                    </form>
                    <br />
                </div>
                <div className="event-container">
                    { this.displayEvents()}
                </div>
            </>

        )
    }

}

export default Events