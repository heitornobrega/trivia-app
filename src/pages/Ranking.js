import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
    newGame = () => {
      const { history } = this.props;
      history.push('/');
    };

    render() {
      const listRanking = JSON.parse(localStorage.getItem('items'));
      const rankingPlayers = listRanking.sort((a, b) => Number(b.score)
      - Number(a.score));

      return (
        <>
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul>
            {
              rankingPlayers.map((element, index) => (
                <li key={ index }>
                  <p data-testid={ `player-name-${index}` }>{element.name}</p>
                  <p data-testid={ `player-score-${index}` }>{element.score}</p>
                </li>
              ))
            }
          </ul>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.newGame }
          >
            Go Home
          </button>
        </>
      );
    }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;