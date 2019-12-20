import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../assets/style.css";
import quizservice from "../../quizService";
import QuestionBox from "../QuestionBox";
import Result from "../Result";

class Dashboard extends Component {
  state = { questionBank: [], score: 0, responses: 0, timer: 300 };

  getQuestions = () => {
    quizservice().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
      timer: 300
    });
  };
  componentDidMount() {
    this.getQuestions();
    this.doIntervalChange();
  }
  doIntervalChange = () => {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer - 1
      }));
    }, 1000);
  };

  render() {
    const { timer } = this.state;
    return (
      <div>
        <h1>current timer:{timer}</h1>
        <div className='title'>Quiz</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.timer > 0 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}
              />
            )
          )}
        {this.state.responses === 5 || this.state.timer < 0 ? (
          <Result
            score={this.state.score}
            playAgain={this.playAgain}
            questionBank={this.state.questionBank}
          />
        ) : null}
      </div>
    );
  }
  componentWillMount() {
    clearInterval(this.myInterval);
  }
}

export default Dashboard;

/*
import React, { useState } from "react";
import PropTypes from "prop-types";
import quizService from "../../quizService";
import QuestionBox from "../QuestionBox";
import "../../assets/style.css";
const Dashboard = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What's the name of Batman's  parents?",
      answers: [
        "Thomas & Martha",
        "Joey & Jackie",
        "Jason & Sarah",
        "Todd & Mira"
      ],
      correct: "Thomas & Martha",
      questionId: "333247"
    },
    {
      question: "What is the most common surname Wales?",
      answers: ["Jones", "Williams", "Davies", "Evans"],
      correct: "Jones",
      questionId: "496293"
    },
    {
      question:
        "What was the name of the WWF professional wrestling tag team made up of the wrestlers Ax and Smash?",
      answers: [
        "Demolition",
        "The Dream Team",
        "The Bushwhackers",
        "The British Bulldogs"
      ],
      correct: "Demolition",
      questionId: "588909"
    }
  ]);
  const emptyQuestion = () => {
    setQuestions([]);
  };

  return (
    <div className='container'>
        <div className="title"></div>
      <ul>
        {questions.map(({ question, answers, correct, questionId }) => (
          <QuestionBox question={question} options={answers} key={questionId} />
        ))}
      </ul>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
*/
