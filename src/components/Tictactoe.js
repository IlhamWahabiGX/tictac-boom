import React, { Component } from 'react'

import Score from './Score'
import Board from './Board'
import Interact from './Interact'

import './css/Tictactoe.css'

export default class Tictactoe extends Component {
  state = {
    turn: 1,
    score: { 1: 0, 2: 0, },
    box: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, },
    settings: {
      theme: 'light',
      mode: 'friend',
      player: 'cross'
    }
  }

  addTurn = () => { this.setState(state => ({ turn: state.turn + 1 })) }
  updateBox = box => { this.setState({ box }) }
  resetGame = score => { this.setState({ turn: 1, score, box: {
      1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 
  }})}
  changeSettings = (newSettings) => { this.setState({ settings: newSettings }) }

  render(){
    return (
      <section className="game">
        <Score {...this.state.score} />
        <Board {...this.state} addTurn={this.addTurn} updateBox={this.updateBox} resetGame={this.resetGame} />
        <Interact {...this.state.settings} changeSettings={this.changeSettings} />
      </section>
    )
  }
}