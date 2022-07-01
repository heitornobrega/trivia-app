import { PLAYER_IS_LOGIN,
  PLAYER_SUM_SCORE,
  PLAYER_RIGHT_QUESTIONS,
  CLEAR_SCORE,
} from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_IS_LOGIN:
    return { ...state, ...action.payload };
  case PLAYER_SUM_SCORE:
    return { ...state, score: action.payload };
  case PLAYER_RIGHT_QUESTIONS:
    return { ...state, assertions: action.payload };
  case CLEAR_SCORE:
    return { ...state, score: 0 };
  default:
    return state;
  }
};

export default userReducer;
