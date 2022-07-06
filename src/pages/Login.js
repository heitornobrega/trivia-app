import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../services/index';
import { loginCreator } from '../redux/action';

class Login extends Component {
    state = {
      name: '',
      gravatarEmail: '',
      btnDisalbled: true,
    }

    validateEmail= () => {
      const { gravatarEmail, name } = this.state;
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (gravatarEmail.match(regex) && name) {
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

    handleClick = async (e) => {
      const { dispatch, history } = this.props;
      e.preventDefault();
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      dispatch(loginCreator(formProps));
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
      const { name, gravatarEmail, btnDisalbled } = this.state;
      return (
        <form onSubmit={ this.handleClick }>
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
              name="gravatarEmail"
              type="text"
              data-testid="input-gravatar-email"
              id="email"
              value={ gravatarEmail }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            // onClick={ this.handleClick }
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
