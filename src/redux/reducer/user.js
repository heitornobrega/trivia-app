import { PLAYER_IS_LOGIN, PLAYER_SUM_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_IS_LOGIN:
    return { ...state, ...action.payload };
  case PLAYER_SUM_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default userReducer;
