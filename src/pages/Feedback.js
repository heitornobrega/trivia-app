import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { clearScore } from '../redux/action';

class Feedback extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (localStorage.getItem('items')) {
      const listItems = JSON.parse(localStorage.getItem('items'));
      const { name, gravatarEmail, score, assertions } = this.props;
      const database = { name, gravatarEmail, score, assertions };
      listItems.push(database);
      localStorage.setItem('items', JSON.stringify(listItems));
    } else {
      const emptyList = [];
      const { name, gravatarEmail, score, assertions } = this.props;
      const database = { name, gravatarEmail, score, assertions };
      emptyList.push(database);
      localStorage.setItem('items', JSON.stringify(emptyList));
    }
    dispatch(clearScore());
  }

    newGame = () => {
      const { history } = this.props;
      history.push('/');
    };

    rankingList = () => {
      const { history } = this.props;
      history.push('/ranking');
    }

    render() {
      const { name, gravatarEmail, score, assertions } = this.props;
      const numberThree = 3;
      return (
        <>
          <header>
            <img
              data-testid="header-profile-picture"
              alt="profile-pic"
              src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            />
            <span data-testid="header-player-name">
              { name }
            </span>
            <span data-testid="header-score">{score}</span>
          </header>
          <main>
            <span data-testid="feedback-text">
              {assertions < numberThree ? 'Could be better...' : 'Well Done!'}
            </span>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{assertions}</p>
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ this.newGame }
            >
              Play Again
            </button>
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ this.rankingList }
            >
              Ranking
            </button>
          </main>
        </>
      );
    }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(
  mapStateToProps,
)(Feedback);
