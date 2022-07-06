import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

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
          <h1 data-testid="ranking-title" className="bg-red-500">Ranking</h1>
          <ul>
            {
              rankingPlayers.map((element, index) => (
                <li key={ index }>
                  <img
                    data-testid={ `header-profile-picture-${index}` }
                    alt="profile-pic"
                    src={ `https://www.gravatar.com/avatar/${md5(element.gravatarEmail).toString()}` }
                  />
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
