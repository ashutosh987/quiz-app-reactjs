import React from "react";

const Result = ({ score, playAgain, questionBank }) => (
  <div className='score-board'>
    <div className='centered' className='score'>
      <div className='w3-animate-fading'>
        <h>
          {" "}
          {score === 5 ? <h>Very Strong</h> : null}
          {score === 4 ? <h>Strong</h> : null}
          {score === 3 ? <h>Good</h> : null}
          {score === 2 ? <h>Bad</h> : null}
          {score === 1 ? <h>Poor</h> : null}
          {score === 0 ? <h>Very Poor</h> : null}
        </h>
        <h>
          {" "}
          <div className='question'>
            You scored {score} / 5 correct answers!{" "}
          </div>
        </h>
        <button className='btn btn-lg btn-success' onClick={playAgain}>
          Play again!
        </button>
      </div>
    </div>
    {questionBank.map(({ question, correct }) => (
      <h4>
        <div className='question'>{question} </div> correct answer is:{" "}
        <div className='answerBtn'>{correct}</div>
        <hr />
      </h4>
    ))}
  </div>
);

export default Result;
