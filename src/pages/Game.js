import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import { sumScore, rightQuestions } from '../redux/action';
import '../style/Game.css';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

class Game extends Component {
  state = {
    questionIndex: 0,
    allQuestions: [],
    category: '',
    question: '',
    correctAnswer: '',
    difficulty: '',
    allAnswers: [],
    isPainted: false,
    seconds: 30,
    showNextButton: false,
  }

  async componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);

    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );

    const data = await response.json();
    this.setDataTrivia(data);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === TIME_LIMIT) {
      this.inactivePlayer();
    }
  }

  setDataTrivia = (data) => {
    const { history } = this.props;
    const randNumber = 0.5;
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
        difficulty: data.results[0].difficulty,
        allAnswers: data.results[0]
          .incorrect_answers.concat(data.results[0].correct_answer)
          .sort(() => Math.random() - randNumber),
      });
    }
  }

  sumScore = () => {
    const levelScore = { easy: 1, medium: 2, hard: 3 };
    const defaultValue = 10;
    const { score, dispatch, assertions } = this.props;
    const { seconds, difficulty } = this.state;
    const rights = assertions + 1;
    const sum = score + (defaultValue + (seconds * levelScore[difficulty]));
    dispatch(sumScore(sum));
    dispatch(rightQuestions(rights));
  }

  inactivePlayer = () => {
    clearInterval(this.myInterval);
    this.setState({ seconds: 30, isPainted: true, showNextButton: true });
  }

  waitAnswer = (e) => {
    const answer = e.target.dataset.testid.split('-')[0];
    this.setState({ seconds: 30, isPainted: true, showNextButton: true });
    if (answer === 'correct') { this.sumScore(); }
    clearInterval(this.myInterval);
  }

  nextQuestion = () => {
    const { questionIndex, allQuestions } = this.state;
    const { history } = this.props;
    const numberFour = 4;
    const randNumber = 0.5;
    if (questionIndex === numberFour) {
      history.push('/feedback');
    } else {
      const nextIndex = questionIndex + 1;
      this.setState({
        questionIndex: nextIndex,
        category: allQuestions[nextIndex].category,
        question: allQuestions[nextIndex].question,
        correctAnswer: allQuestions[nextIndex].correct_answer,
        difficulty: allQuestions[nextIndex].difficulty,
        allAnswers: allQuestions[nextIndex]
          .incorrect_answers.concat(allQuestions[nextIndex].correct_answer)
          .sort(() => Math.random() - randNumber),
        isPainted: false,
        showNextButton: false,
      });
      this.myInterval = setInterval(() => {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      }, ONE_SECOND);
    }
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    const {
      category,
      question,
      correctAnswer,
      allAnswers,
      isPainted,
      seconds,
      showNextButton,
    } = this.state;

    return (
      <div className="game-container">
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic" src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` } />
          <span data-testid="header-player-name">
            { name}
          </span>
          <span data-testid="header-score">
            {score}
            {' '}
            Pontos
          </span>
        </header>
        <main>
          <Question
            category={ category }
            question={ question }
            correctAnswer={ correctAnswer }
            allAnswers={ allAnswers }
            nextQuestion={ this.waitAnswer }
            isPainted={ isPainted }
          />
          <h4>{seconds}</h4>

          {showNextButton && (
            <button
              className="btn-next"
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
  score: state.player.score,
});
export default connect(mapStateToProps)(Game);
