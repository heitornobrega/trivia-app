import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../services/index';
import { loginCreator } from '../redux/action';
import '../style/Login.css';

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

    inputFocusIn = (e) => {
      e.target.nextSibling.style.transform = 'scaleX(1)';
      e.target.nextSibling.style.transformOrigin = 'center';
    }

    inputFocusOut = (e) => {
      e.target.nextSibling.style.transform = 'scaleX(0.3)';
      e.target.nextSibling.style.transformOrigin = 'center';
    }

    render() {
      const { name, gravatarEmail, btnDisalbled } = this.state;
      return (
        <main className="main-login">
          <div className="wrapForm">
            <div className="logo">
              TRIVIA GAME
              <img alt="megaman" src="https://i.gifer.com/origin/47/47b2fabe68ef7ae446317ce671878f50_w200.gif" width={ 80 } />
            </div>
            <form onSubmit={ this.handleClick }>
              <label htmlFor="name" className="label-name">
                Nome
                <input
                  name="name"
                  type="text"
                  data-testid="input-player-name"
                  id="name"
                  value={ name }
                  onChange={ this.handleChange }
                  onFocus={ this.inputFocusIn }
                  onBlur={ this.inputFocusOut }
                  placeholder="Digite seu melhor nome"
                />
                <div className="" id="teste" />
              </label>
              <label htmlFor="email" className="label-email">
                Email
                <input
                  name="gravatarEmail"
                  type="text"
                  data-testid="input-gravatar-email"
                  id="email"
                  value={ gravatarEmail }
                  onChange={ this.handleChange }
                  onFocus={ this.inputFocusIn }
                  onBlur={ this.inputFocusOut }
                  placeholder="Digite seu melhor email"
                />
                <div className="" id="teste2" />
              </label>
              <div className="wrapButtons">
                <button
                  type="submit"
                  data-testid="btn-play"
                  disabled={ btnDisalbled }
                  className="btn-enviar"
                >
                  Play
                </button>
                <button
                  type="button"
                  data-testid="btn-settings"
                  onClick={ this.goSettings }
                  className="btn-config"
                >
                  Settings
                </button>
              </div>
            </form>
          </div>
          <div className="side" />
        </main>
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
