import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaApi } from '../services';
import Question from '../components/Question';

class Game extends Component {
  state = {
    questionIndex: 0,
    allQuestions: [],
    category: '',
    question: '',
    correctAnswer: '',
    allAnswers: [],
    isPainted: false,
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await fetchTriviaApi(token)
      .then((data) => this.setDataTrivia(data));
  }

  setDataTrivia = (data) => {
    const { history } = this.props;
    if (data.results.length === 0) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({
        questionIndex: 0,
        allQuestions: data.results,
        category: data.results[0].category,
        question: data.results[0].question,
        correctAnswer: data.results[0].correct_answer,
        allAnswers: data.results[0]
          .incorrect_answers.concat(data.results[0].correct_answer) });
    }
  }

  waitAnswer = () => {
    this.setState({ isPainted: true });
    const halfSecond = 500;
    setTimeout(this.nextQuestion, halfSecond);
  }

  nextQuestion = () => {
    const { questionIndex, allQuestions } = this.state;
    const nextIndex = questionIndex + 1;
    this.setState({
      questionIndex: nextIndex,
      category: allQuestions[nextIndex].category,
      question: allQuestions[nextIndex].question,
      correctAnswer: allQuestions[nextIndex].correct_answer,
      allAnswers: allQuestions[nextIndex]
        .incorrect_answers.concat(allQuestions[nextIndex].correct_answer),
      isPainted: false,
    });
  }

  render() {
    const { name, email } = this.props;
    const { category, question, correctAnswer, allAnswers, isPainted } = this.state;
    const randNumber = 0.5;
    const randomList = allAnswers.sort(() => Math.random() - randNumber);
    return (
      <>
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } />
          <span data-testid="header-player-name">
            { name}
          </span>
          <span data-testid="header-score"> 0 </span>
        </header>
        <main>
          <Question
            category={ category }
            question={ question }
            correctAnswer={ correctAnswer }
            allAnswers={ randomList }
            nextQuestion={ this.waitAnswer }
            isPainted={ isPainted }
          />
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});
export default connect(mapStateToProps)(Game);
