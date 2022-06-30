import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
    newGame = () => {
      const { history } = this.props;
      history.push('/');
    };

    render() {
      return (
        <>
          <h1
            data-testid="ranking-title"
          >
            Ranking
          </h1>
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
