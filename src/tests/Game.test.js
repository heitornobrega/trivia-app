import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

const initialState = {
    player: {
      name: 'Monke',
      gravatarEmail: 'rharanru@gmail.com',
      score: 0,
      assertions: 0,
    }
}

const token = '549f8f21daff0efc23240ada9d765a7a1ebf4b1279eee1a9cd15f812076984e8'
const triviaResponse = {
    "response_code": 0,
    "results": [
      {
        "category": "Entertainment: Music",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Who had a 1983 hit with the song &#039;Africa&#039;?",
        "correct_answer": "Toto",
        "incorrect_answers": [
          "Foreigner",
          "Steely Dan",
          "Journey"
        ]
      },
      {
        "category": "Geography",
        "type": "multiple",
        "difficulty": "hard",
        "question": "What country is the second largest in the world by area?",
        "correct_answer": "Canada",
        "incorrect_answers": [
          "Russia",
          "China",
          "United States of America"
        ]
      },
      {
        "category": "History",
        "type": "boolean",
        "difficulty": "medium",
        "question": "Assyrian king Sennacherib&#039;s destruction of Babylon in 689 BCE was viewed as a triumph by other Assyrian citizens.",
        "correct_answer": "False",
        "incorrect_answers": [
          "True"
        ]
      },
      {
        "category": "Animals",
        "type": "multiple",
        "difficulty": "hard",
        "question": "What scientific family does the Aardwolf belong to?",
        "correct_answer": "Hyaenidae",
        "incorrect_answers": [
          "Canidae",
          "Felidae",
          "Eupleridae"
        ]
      },
      {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "hard",
        "question": "In &quot;Starbound&quot;, what is the max HP of the monster &quot;Punchy&quot;?",
        "correct_answer": "50,000 HP",
        "incorrect_answers": [
          "9,000,000 HP",
          "100 HP",
          "150,000 HP"
        ]
      }
    ]
}

describe('1. Testa a página de Ranking', () => {
    beforeEach(() => {
        localStorage.setItem("token", JSON.stringify(token));
        global.fetch = jest.fn(async () => ({
            json: async () => triviaResponse
        }))  
    });
    
    it('Testa se o local da página é \'/game\'', () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
        expect(history.location.pathname).toBe('/game');
    });

    it('Testa a presença do titulo da página', async () => {
        renderWithRouterAndRedux(<App />, initialState, '/game');

        const dataImg = screen.getByTestId('header-profile-picture');
        const dataName = screen.getByText(`Monke`);
        const dataScore = screen.getByText(`0`);
        expect(dataImg).toBeInTheDocument();
        expect(dataName).toBeInTheDocument();
        expect(dataScore).toBeInTheDocument();
    });

    it('Testa a presença dos elementos da página', async () => {
        renderWithRouterAndRedux(<App />, initialState, '/game');

        const categoryEl = await screen.findByTestId('question-category');
        const textEl = await screen.findByTestId('question-text');
        const allWrongsEl = await screen.findAllByTestId(/wrong-answer/i);
        const correctEl = await screen.findByTestId(/correct-answer/i)
        expect(categoryEl).toBeInTheDocument();
        expect(textEl).toBeInTheDocument();
        expect(correctEl).toBeInTheDocument();
        expect(allWrongsEl.length).toBe(3);

        
    });

    it('Testa se o botão next aparece na tela', async () => {
        renderWithRouterAndRedux(<App />, initialState, '/game');

        const result = (10 + (30  * 1)).toFixed();
        const correctEl = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl);
        const score = await screen.findByTestId('header-score');
        expect(score.innerHTML).toBe(result);
        expect(correctEl).toHaveProperty('className', 'correct-answer'); 
        const btnNext = await screen.findByRole('button', {  name: /next/i });
        expect(btnNext).toBeInTheDocument();
        userEvent.click(btnNext);
        const cateQuestion = await screen.findByTestId('question-category');
        expect(cateQuestion).toBeInTheDocument();
    });

    it('Testa se o score é modificado', async () => {
        renderWithRouterAndRedux(<App />, initialState, '/game');
        
        const correctEl = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl);
        const score = await screen.findByTestId('header-score');
        expect(score.innerHTML).toBe("40");
        const btnNext = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext);

        const correctEl2 = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl2);
        const score2 = await screen.findByTestId('header-score');
        expect(score2.innerHTML).toBe("140");
        const btnNext2 = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext2);

        const correctEl3 = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl3);
        const score3 = await screen.findByTestId('header-score');
        expect(score3.innerHTML).toBe("210");
        const btnNext3 = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext3);
    });

    it('Testa se o timer está funcionando', async () => {
        renderWithRouterAndRedux(<App />, initialState, '/game');

        const correctEl = await screen.findByTestId('correct-answer')
        expect(correctEl).toBeEnabled();
        const timer = await screen.findByText('28', {}, { timeout: 2000 });
        expect(timer).toBeInTheDocument();
        const btnNext = await screen.findByRole('button', {  name: /next/i}, { timeout: 32000 });
        expect(btnNext).toBeInTheDocument();
    }, 35000);

    it('Testa se o token for inválido volta para login page', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/');
        const invalidToken = {
            "response_code": 3,
            "results": []
        }
        jest.spyOn(global, 'fetch')
            .mockResolvedValue({ json: jest.fn().mockResolvedValue(invalidToken) });
        history.push('/game')
        await waitFor(() => expect(history.location.pathname).toBe('/'));
    });

    it('Testa se volta para a tela de feedback ao responder 5 perguntas', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
        
        const correctEl = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl);
        const btnNext = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext);

        const correctEl2 = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl2);
        const btnNext2 = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext2);

        const correctEl3 = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl3);
        const btnNext3 = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext3);

        const correctEl4 = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl4);
        const btnNext4 = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext4);

        const correctEl5 = await screen.findByTestId('correct-answer');
        userEvent.click(correctEl5);
        const btnNext5 = await screen.findByRole('button', {  name: /next/i });
        userEvent.click(btnNext5);

        expect(history.location.pathname).toBe('/feedback')
    });
})      
