import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('1. Testa a página de Login', () => {
    beforeEach(() => renderWithRouterAndRedux(<App />))
    
    it('Testa se o local da página de login é \'/\'', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        expect(history.location.pathname).toBe('/');
      });
    it('Testa a presença do input destinado ao nome do jogador', () => {
        const inputName = screen.getByRole('textbox', {name:/nome/i});
        expect(inputName).toBeInTheDocument();
    })
    it('Testa a presença do input destinado ao email do jogador', () => {
        const inputEmail = screen.getByRole('textbox', {name: /email/i})
        expect(inputEmail).toBeInTheDocument();
    })
    it('Testa se o botão de jogar está presente', () => {
        const loginBtn = screen.getByRole('button', { name: /play/i })
        expect(loginBtn).toBeInTheDocument();
    })
    it('Testa se o botão de configurações está presente', () => {
        const settingsBtn = screen.getByRole('button', { name: /settings/i })
        expect(settingsBtn).toBeInTheDocument();
    })
})      

describe('2 Testa as funcionalidades dos elementos da página de Login', () => {
    it('Testa se é possível escrever na área de input do nome do jogador', () => {
        renderWithRouterAndRedux(<App />)
        const inputName = screen.getByRole('textbox', { name: /nome/i });
        userEvent.type(inputName, 'meu nome');
        expect(inputName.value.length).toBe(8);
    })
    it('Testa se é possível escrever na área de input do email do jogador', () => {
        renderWithRouterAndRedux(<App />)
        const inputEmail = screen.getByRole('textbox', { name: /email/i });
        userEvent.type(inputEmail, 'meu email');
        expect(inputEmail.value.length).toBe(9);
    })
    it('Testa se o botão de jogar está desabilitado', () => {
        renderWithRouterAndRedux(<App />)
        const playBtn = screen.getByRole('button', { name: /play/i });
        expect(playBtn).toBeDisabled();
    })
    it('Testa se dados inválidos não são aceitos', () => {
        renderWithRouterAndRedux(<App />)
        const inputName = screen.getByRole('textbox', { name: /nome/i });
        const playBtn = screen.getByRole('button', { name: /play/i });
        const inputEmail = screen.getByRole('textbox', { name: /email/i });
        userEvent.type(inputEmail, 'emailinvalido.com');
        expect(playBtn).toBeDisabled();

        userEvent.type(inputName, 'nome');
        userEvent.type(inputEmail, 'email@valido.com');
        expect(playBtn).toBeEnabled();
    });
    it('Testa se nome e email são salvos no estado da aplicação', () => {
        const { store } = renderWithRouterAndRedux(<App />);
        const PLAYER_NAME = "Vincent"
        const inputName = screen.getByRole('textbox', { name: /nome/i });
        const playBtn = screen.getByRole('button', { name: /play/i });
        const inputEmail = screen.getByRole('textbox', { name: /email/i });
    
        userEvent.type(inputEmail, 'email@valido.com');
        userEvent.type(inputName, PLAYER_NAME);
        userEvent.click(playBtn);
    
        expect(store.getState().player.name).toBe(PLAYER_NAME);
        expect(store.getState().player.gravatarEmail).toBe('email@valido.com');
    });
    
    it('Testa se a rota é  \'/settings\' após clicar em settings', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const settingsBtn = screen.getByRole('button', { name: /settings/i });
        userEvent.click(settingsBtn);
        expect(history.location.pathname).toBe('/settings');
      });

      it('Testa se a rota é  \'/game\' após clicar em play', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const PLAYER_NAME = "Vincent"
        const inputName = screen.getByRole('textbox', { name: /nome/i });
        const playBtn = screen.getByRole('button', { name: /play/i });
        const inputEmail = screen.getByRole('textbox', { name: /email/i });
    
        userEvent.type(inputName, PLAYER_NAME);
        userEvent.type(inputEmail, 'email@valido.com');
        userEvent.click(playBtn);
          
        await waitFor(() => {
            expect(history.location.pathname).toBe('/game');
        })
      });
})