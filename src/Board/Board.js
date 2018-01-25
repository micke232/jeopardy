import React, { Component } from 'react';
import Boards from './BoardQuestions/test';
import logo from '../chas_a_logo_white.png';

const categoryStyle = {
  width: '25%',
  height: '100px',
  lineHeight: '100px',
  float: 'left',
  fontSize: '40px',
  boxShadow: 'inset 0 0 10px #222',
  backgroundColor: '#66b0c7',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: 'white'
}

const listStyle = {
  listStyle: 'none',
  boxShadow: 'inset 0 0 10px #222',
  cursor: 'pointer'
}

const buttonStyle = {
  cursor: 'pointer',
  width: '200px',
  border: '2px solid #de667b',
  backgroundColor: '#de667b',
  fontSize: '1.2rem',
  color: 'white',
  padding: '15px',
  textTransform: 'uppercase',
}

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: Boards[0],
      question: '',
      answer: '',
      questionAndAnswerText: '',
      closeModal: false,
      questionModal: {
        backgroundColor: '#66b0c7',
        width: '100%',
        position: 'absolute',
        fontWeight: 'bold',
        height: '500px',
        paddingTop: '80px',
        fontSize: '80px',
        display: 'block',
        color: 'white'
      }
    }
  }
  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({ questions: Boards[props.board]})

  }
  showAnswer() {
    if (this.state.closeModal) {
      this.setState({
        questionModal: { ...this.state.questionModal, display: 'block'},
        closeModal: false,
        question: '',
        answer: '',
        questionAndAnswerText: '',
      })
      return;
    }
    this.setState({
      questionModal: { ...this.state.questionModal, display: 'block' },
      questionAndAnswerText: this.state.question.answer,
      closeModal: true,
    })
  }

  onQuestionClick(question) {
    const newQuestions = this.state.questions.map((qArray) => {
      return {
        ...qArray, questions: 
        qArray.questions.map((q) => {
          if (q.question === question.question) {
            return {...q, opened: true}
          }
          return {...q}
        })
      }
    })
    this.setState({
      question,
      questions: newQuestions,
      answer: question.answer,
      questionAndAnswerText: question.question
    })
  }

  renderQuestions(questions) {
    const listItems = questions;
    return listItems.map((item, index) => {
      return (
        <li
          style={{ ...listStyle, backgroundColor: item.opened ? '#de667b' : '#66b0c7' }}
          key={item.question}
          onClick={!item.opened ? () => this.onQuestionClick(item) : null}
        >
          {item.opened ? <img src={logo} style={{
              height: '60px',
              display: 'block',
              margin: 'auto',
              padding: '20px',
            }
          } 
    alt="logo" />   : (index + 1) * 100}
        </li>
      )
    })
  }

  renderCategories() {
    const questions = this.state.questions;
    const categories = questions.map((cat) => {
      return <div style={categoryStyle} key={cat.category} >
        {cat.category}
        {this.renderQuestions(cat.questions)}
      </div>
    })


    return (<div>{categories}</div>)
  }

  render() {
    const { question, questions, questionAndAnswerText, closeModal } = this.state;
    return (
      <div>
        <div className="Board">
          {this.renderCategories()}    
        </div>
        {
          !question.opened &&
          <div style={question !== '' ? this.state.questionModal : { display: 'none' }}>
            <div>
              {questionAndAnswerText}
            </div>
            <button style={buttonStyle} onClick={() => this.showAnswer()}>{!closeModal ? 'Visa Svar' : 'Stäng' }</button>
          </div>
        }
      </div>
    );
  }
}

export default Board;
