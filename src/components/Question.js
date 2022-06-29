import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const {
      question,
      allAnswers,
      category,
      nextQuestion,
      correctAnswer,
      isPainted } = this.props;
    return (
      <>
        <h3 data-testid="question-text">{question}</h3>
        <p data-testid="question-category">{category}</p>
        <div data-testid="answer-options">
          {allAnswers.map((answear, index) => (
            answear !== correctAnswer
              ? (
                <button
                  key={ answear }
                  type="button"
                  onClick={ nextQuestion }
                  data-testid={ `wrong-answer-${index}` }
                  className={ isPainted ? 'wrong-answer' : '' }
                >
                  {answear}
                </button>
              )
              : (
                <button
                  key={ answear }
                  type="button"
                  onClick={ nextQuestion }
                  data-testid="correct-answer"
                  className={ isPainted ? 'correct-answer' : '' }
                >
                  {answear}
                </button>
              )
          ))}
        </div>
      </>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  allAnswers: PropTypes.instanceOf(Array).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  isPainted: PropTypes.bool.isRequired,

};

export default Question;
