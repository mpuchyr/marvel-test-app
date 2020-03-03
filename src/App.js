import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './containers/Home'
import Comics from './containers/Comics'

require('dotenv').config()


// const charactersUrl = URL + `v1/public/characters?apikey=${publicKey}`
// const charactersUrl = URL + 'v1/public/characters'




class App extends Component {
  

  
  // state = {
  //   characterName: ''
  // }

  // handleOnClick = (event) => {

  //   let timeStamp = Date.now()

  //   let hash = md5(timeStamp + privateKey + publicKey)
  //   // console.log(charactersUrl + `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
  //   return fetch(comicsUrl + `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
  //   .then(res => {
  //     if (res.status !== 200) {
  //       throw new Error(res.status.text)
  //     } else {
  //       return res.json()
  //     }
  //     })
  //   .then(info => {
  //     console.log(info)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })


  // }

  // handleOnChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  // handleOnSubmit = (event) => {
  //   event.preventDefault()
  //   let timeStamp = Date.now()
  //   let hash = md5(timeStamp + privateKey + publicKey)
  //   let charName = this.state.characterName
  //   // console.log(charactersUrl + `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
  //   return fetch(charactersUrl + `?name=${charName}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
  //   .then(res => {
  //     if (res.status !== 200) {
  //       throw new Error(res.status.text)
  //     } else {
  //       return res.json()
  //     }
  //     })
  //   .then(info => {
  //     this.displayCharacterInfo(info)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  // displayCharacterInfo = (character) => {
  //   let name = document.querySelector("#character-name")
  //   let desc = document.querySelector("#character-description")
  //   let imgContainer = document.querySelector("#character-thumbnail")
  //   let footer = document.querySelector("#footer")
  //   name.innerText = character.data.results[0].name
  //   desc.innerText = character.data.results[0].description
  //   imgContainer.innerHTML = `
  //     <img src=${character.data.results[0].thumbnail.path + '.' + character.data.results[0].thumbnail.extension} alt=${character.data.results[0].name}/>
  //   `
  //   footer.innerHTML = `${character.attributionHTML}`
  //   // console.log(character.data.results[0].name)
  //   console.log(character)
  //   console.log(character.data.results[0].comics.items[0])
  // }

  // render() {
  //   return (
  //     <div className="App">
  //       <h1>Marvel App</h1>
  //       <form onSubmit={this.handleOnSubmit}>
  //         <input type="text" name="characterName" onChange={this.handleOnChange}></input>
  //         <input type="submit"></input>
  //       </form>

  //       <h2 id="character-name"></h2>
  //       <div id="character-thumbnail"></div>
  //       <p id="character-description"></p>

  //       <footer id="footer"></footer>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="App">
        <h1>Marvel App</h1>
          <div className="container">
            <Router>
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/comics" component={ Comics } />
              </Switch>
            </Router>
          </div>
        
      </div>
    )
  }

}

export default App;
