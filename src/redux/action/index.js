export const PLAYER_IS_LOGIN = 'PLAYER_IS_LOGIN';
export const PLAYER_SUM_SCORE = 'PLAYER_SUM_SCORE';

export const loginCreator = (payload) => ({
  type: PLAYER_IS_LOGIN,
  payload,
});

export const sumScore = (payload) => ({
  type: PLAYER_SUM_SCORE,
  payload,
});
