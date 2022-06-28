import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services';

class Login extends Component {
    state = {
      name: '',
      email: '',
      btnDisalbled: true,
    }

    validateEmail= () => {
      const { email, name } = this.state;
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(regex) && name) {
        this.setState({ btnDisalbled: false });
      } else {
        this.setState({ btnDisalbled: true });
      }
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
      this.validateEmail();
    }

    handleClick = async () => {
      const { history } = this.props;
      const result = await fetchApi();
      const { token } = result;
      localStorage.setItem('token', token);
      history.push('/game');
    }

    goSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { name, email, btnDisalbled } = this.state;
      return (
        <form>
          <label htmlFor="name">
            Nome
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              name="email"
              type="text"
              data-testid="input-gravatar-email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ btnDisalbled }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.goSettings }
          >
            Settings
          </button>
        </form>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
