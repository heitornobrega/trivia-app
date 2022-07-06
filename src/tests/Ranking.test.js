import React from 'react';
import { screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';
import App from '../App';

const initialState = {
    player: {
      name: 'Player Name',
      gravatarEmail: 'player@email.com',
      score: 70,
      assertions: 0,
    }
}

const TEST_KEY = "items";
const TEST_VALUE = [
    {"name":"Monke","gravatarEmail":"rharanru@gmail.com","score":70,"assertions":1},
    {"name":"Teste","gravatarEmail":"rharan.srufino@gmail.com","score":30,"assertions":1}
];

describe('1. Testa a página de Ranking', () => {
    beforeEach(() => {
        localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));
    });
    it('Testa se o local da página é \'/ranking\'', () => {
        const { history } = renderWithRouterAndRedux(<Ranking />);
        history.push('/ranking')
        expect(history.location.pathname).toBe('/ranking');
    });

    it('Testa a presença do titulo da página', () => {
        renderWithRouterAndRedux(<Ranking />);
        const header = screen.getByTestId('ranking-title');
        expect(header).toBeInTheDocument();
    });

    it('Testa a presença do jogador na tela', () => {
        renderWithRouterAndRedux(<Ranking />);
        const rankingLength = screen.getAllByRole('listitem')
        const dataName = screen.getByText(`Monke`);
        const dataScore = screen.getByText(`70`);
        const dataImg = screen.getByTestId('header-profile-picture-0');
        expect(dataName).toBeInTheDocument();
        expect(dataScore).toBeInTheDocument();
        expect(dataImg).toBeInTheDocument();
        expect(rankingLength.length).toBe(2);
        expect(dataImg).toHaveAttribute('src', `https://www.gravatar.com/avatar/c27830f1e5f6da666f333445ae48e332`);

        const dataName2 = screen.getByText(`Teste`);
        const dataScore2 = screen.getByText(`30`);
        const dataImg2 = screen.getByTestId('header-profile-picture-1');
        expect(dataName2).toBeInTheDocument();
        expect(dataScore2).toBeInTheDocument();
        expect(dataImg2).toBeInTheDocument();
        expect(dataImg2).toHaveAttribute('src', `https://www.gravatar.com/avatar/6a7a593f2fbefd09ffb238be2aa6548d`);
    });

    it('Testa se o botão de home está presente', () => {
        renderWithRouterAndRedux(<Ranking />);
        const homeBtn = screen.getByRole('button', { name: /Go Home/i })
        expect(homeBtn).toBeInTheDocument();
    });

    it('Testa se ao clickar no botão volta para home', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/ranking')
        const homeBtn = screen.getByRole('button', { name: /Go Home/i })
        userEvent.click(homeBtn);
        expect(history.location.pathname).toBe('/');
    });

    it('Testa se ao clickar no botão volta para home e a store é zerada', () => {
        const { store } = renderWithRouterAndRedux(<App />, initialState, '/ranking');
        const homeBtn = screen.getByRole('button', { name: /Go Home/i })
        userEvent.click(homeBtn);
        const globalState = store.getState();
        expect(globalState.score).toBe(undefined);
    });
})      
