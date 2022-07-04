import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const initialState = {
    player: {
      name: 'Player Name',
      gravatarEmail: 'player@email.com',
      score: 0,
      assertions: 0,
    }
}
  
describe('1. Testa a página de Feedback', () => {
    it('Testa se o botão Play Again existe', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const playAgain = screen.getByRole('button', { name: /play again/i });
        expect(playAgain).toBeInTheDocument();
    })
    it('Testa se o botão Play Again redireciona para \'/\'', () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const playAgain = screen.getByRole('button', { name: /play again/i });
        userEvent.click(playAgain);
        expect(history.location.pathname).toBe('/');
    })
    it('Testa se o botão Ranking redireciona para \'/ranking\'', () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const ranking = screen.getByRole('button', { name: /ranking/i });
        userEvent.click(ranking);
        expect(history.location.pathname).toBe('/ranking');
    })
    it('Testa a presença da imagem do gravatar', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const gravatarImg = screen.getByRole('img', { name: /profile\-pic/i })
        expect(gravatarImg).toBeInTheDocument();
    })
    it('Testa a presença do nome do jogador', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const playerName = screen.getByText(/player name/i)
        expect(playerName).toBeInTheDocument();
    })
    it('Testa a presença do score do header', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const headerScore = screen.getByTestId('header-score');
        expect(headerScore).toBeInTheDocument();
    })
    it('Testa a presença do total score', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const totalScore = screen.getByTestId('feedback-total-score');
        expect(totalScore).toBeInTheDocument();
    })
    it('Testa a presença do número de acertos', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toBeInTheDocument();
    })
    it('Testa a presença do texto de feedback', () => {
        renderWithRouterAndRedux(<App />, initialState, "/feedback");
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toBeInTheDocument();
    })

})     