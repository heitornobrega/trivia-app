import React, { Component } from 'react';
import '../style/Settings.css';
import Imagem from '../style/image.gif';

class Settings extends Component {
  render() {
    return (
      <div className="id-tittle">
        <h1
          data-testid="settings-title"
        >
          Settings
        </h1>
        <div className="img-settings">
          <img src={ Imagem } alt="construção" />
        </div>
      </div>
    );
  }
}

export default Settings;
