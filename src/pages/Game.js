import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="profile-pic" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } />
        <span data-testid="header-player-name">
          { name}
        </span>
        <span data-testid="header-score"> 0 </span>
      </header>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});
export default connect(mapStateToProps)(Game);
