export const PLAYER_IS_LOGIN = 'PLAYER_IS_LOGIN';
export const PLAYER_SUM_SCORE = 'PLAYER_SUM_SCORE';
export const PLAYER_RIGHT_QUESTIONS = 'PLAYER_RIGHT_QUESTIONS';
export const CLEAR_SCORE = 'CLEAR_SCORE';

export const loginCreator = (payload) => ({
  type: PLAYER_IS_LOGIN,
  payload,
});

export const sumScore = (payload) => ({
  type: PLAYER_SUM_SCORE,
  payload,
});

export const rightQuestions = (payload) => ({
  type: PLAYER_RIGHT_QUESTIONS,
  payload,
});

export const clearScore = (payload) => ({
  type: CLEAR_SCORE,
  payload,
});
