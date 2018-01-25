import React, { Component } from 'react';
import './App.css';
import logo from './jeopardy_logo2.png';
import Board from './Board/Board';

class App extends Component {
  constructor() {
    super()
    this.state = {
      board: null,
    }
  }

  handleBoard = (board) => {
    this.setState({board: board})
  }

  render() {
    return (
      <div className="App">
        <button onClick={()=>this.handleBoard(0)} className="boardButton">Board: test</button>
        <button onClick={()=>this.handleBoard(1)} className="boardButton">Board: 1</button>  
        <button onClick={()=>this.handleBoard(2)} className="boardButton">Board: 2</button>  
        <button onClick={()=>this.handleBoard(3)} className="boardButton">Board: 3</button>  
        <button onClick={()=>this.handleBoard(4)} className="boardButton">Board: 4</button>  
        <button onClick={()=>this.handleBoard(5)} className="boardButton">Board: 5</button>  
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />  
        </header>
        <Board board={this.state.board} />
      </div>
    );
  }
}

export default App;
