import React from "react";

const Result = ({ score, playAgain, questionBank }) => (
  <div className="score-board">
    <div className="score">
      <div>
        <h>
          {" "}
          {score === 5 ? (
            <h>
              Very Strong<i class="fas fa-surprise"></i>
            </h>
          ) : null}
          {score === 4 ? (
            <h>
              Strong<i class="far fa-smile-beam"></i>
            </h>
          ) : null}
          {score === 3 ? (
            <h>
              Good<i class="far fa-meh"></i>
            </h>
          ) : null}
          {score === 2 ? (
            <h>
              Bad<i class="fas fa-sad-tear"></i>
            </h>
          ) : null}
          {score === 1 ? (
            <h>
              Poor<i class="fas fa-sad-tear"></i>
            </h>
          ) : null}
          {score === 0 ? (
            <h>
              Very Poor <i class="fas fa-sad-tear"></i>
            </h>
          ) : null}
        </h>
        <h>
          {" "}
          <div className="question">
            You scored {score} / 5 correct answers!{" "}
          </div>
        </h>
        <button className="btn btn-lg btn-success" onClick={playAgain}>
          Play again!
        </button>
      </div>
    </div>
    <div>
      <h1>Following are the questions asked with their right answers</h1>
    </div>
    <div style={{ backgroundColor: "  #FFFDD0" }}>
      {questionBank.map(({ question, correct }) => (
        <h4>
          <div className="question">{question} </div> correct answer is:{" "}
          <div className="answerBtn1">{correct}</div>
          <hr />
        </h4>
      ))}
    </div>
  </div>
);

export default Result;
