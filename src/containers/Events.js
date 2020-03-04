import React, { Component } from 'react';
import md5 from 'md5';

class Events extends Component {
    state = {
        events: [],
        startsWith: '',
        limit: 20
    }
    render(){
        return (
            <>
                <h1>Events Placeholder Text</h1>
            </>
        )
    }

}

export default Events