import PropTypes from 'prop-types';

import { AuthContext } from "./AuthContext"
import { useReducer } from 'react';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user
  }
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, { logged: false}, init);

    const onLogin = (name = '') => {
      const user = { id: 'ABC', name }
      const action = { type: types.login, payload: user }

      localStorage.setItem('user', JSON.stringify(user))

      dispatch(action)
    }

    const onLogout = () => {
      localStorage.removeItem('user');
      const action = { type: types.logout };
      dispatch(action);
    }

  return (
    <AuthContext.Provider value={{ ...state, login: onLogin, logout: onLogout}}>
        { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
    children: PropTypes.any.isRequired
}
