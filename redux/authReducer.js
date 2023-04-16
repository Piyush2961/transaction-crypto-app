import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './authActions';

const initialState = {
  isAuthenticated: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};