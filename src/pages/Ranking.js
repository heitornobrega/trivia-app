/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import confetti from 'canvas-confetti';

class Ranking extends Component {
    newGame = () => {
      const { history } = this.props;
      history.push('/');
    };

  componentDidMount = () => {
    confetti({
      particleCount: 500,
      startVelocity: 50,
      spread: 360,
    });
  }

  render() {
    const listRanking = JSON.parse(localStorage.getItem('items'));
    const rankingPlayers = listRanking.sort((a, b) => Number(b.score)
      - Number(a.score));

    return (
      <div className="w-full">
        <div
          className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 dark:bg-gray-700
             rounded-tl-lg rounded-tr-lg"
        >
          <div className="sm:flex items-center justify-between">
            <h1
              className="font-VT323 font-9xl"
            >
              RANKING

            </h1>
            <div>
              <button
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                     inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start
                      px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none
                      rounded"
                data-testid="btn-go-home"
                type="button"
                onClick={ this.newGame }
              >
                <p className="text-sm font-medium leading-none text-white">Go Home</p>
              </button>
            </div>
          </div>
        </div>
        <div
          className="
            bg-red-500
              shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto"
        >
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr
                tabIndex="0"
                className="focus:outline-none
                   h-16 w-full text-sm leading-none text-gray-800 dark:text-white "
              >
                <th className="font-normal text-left pl-2">Position</th>
                <th className="font-normal text-left pl-4">Player</th>
                <th className="font-normal text-left pl-12">Score</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {
                rankingPlayers.map((element, index) => (
                  <tr
                    key={ index }
                    tabIndex="0"
                    className="h-20 text-sm
                        text-gray-800 dark:text-white  bg-gray-400
                        border-b border-t border-gray-100 "
                  >
                    <td>
                      <div className="w-13 h-13">
                        <h1 className="w-full h-full font-2xl">
                          {index + 1}
                          {' '}
                          °
                        </h1>
                      </div>
                    </td>
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-13 h-13">
                          <img
                            className="w-full h-full rounded-full"
                            data-testid={ `header-profile-picture-${index}` }
                            alt="profile-pic"
                            src={ `https://www.gravatar.com/avatar/${md5(element.gravatarEmail).toString()}` }
                          />
                        </div>
                        <div className="pl-4">
                          <p
                            className="font-bold"
                            data-testid={ `player-name-${index}` }
                          >
                            {element.name}
                          </p>
                          <p
                            className="text-xs leading-3 text-gray-600
                              dark:text-gray-200  pt-2"
                            data-testid={ `player-score-${index}` }
                          >
                            {element.gravatarEmail}
                          </p>
                          <p
                            className="text-xs
                                leading-3 text-gray-600 dark:text-gray-200  pt-2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p
                        className="text-sm font-bold
                             leading-none text-gray-800 dark:text-white"
                        data-testid={ `player-score-${index}` }
                      >
                        {element.score}

                      </p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
