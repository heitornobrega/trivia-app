import { PLAYER_IS_LOGIN } from '../action';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_IS_LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default userReducer;
