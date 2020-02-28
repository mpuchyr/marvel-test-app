import React, { Component } from 'react';
import md5 from 'md5';


const publicKey = process.env.REACT_APP_API_KEY
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY
const URL = "https://gateway.marvel.com/"
const comicsUrl = URL + 'v1/public/comics'

let comics = []

class Comics extends Component {
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
          comics = info.data.results
          // console.log(comics)
        })
        .catch(err => console.log(err))
      }
    
    
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Comics