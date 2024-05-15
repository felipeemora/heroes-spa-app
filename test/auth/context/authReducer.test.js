import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('test in auth reducer', () => {

    const initialState = {
        logged: false
    }

    test('should return deault status', () => {
        const action = {
            type: 'Undefined type'
        }
        const authReducerCall = authReducer(initialState, action);
        expect(authReducerCall).toBe(initialState);
    })

    test('should return user logged', () => {

        const user = {
            id: 123,
            name: 'Felipe Mora'
        }

        const action = {
            type: types.login,
            payload: user
        }

        const authReducerCall = authReducer(initialState, action);
        expect(authReducerCall.logged).toBe(true);
        expect(authReducerCall.user).toBe(user);
    })

    test('should return user logout', () => {
        const initialStateLogged = {
            logged: true
        }

        const action = {
            type: types.logout
        }
        const authReducerCall = authReducer(initialStateLogged, action);
        expect(authReducerCall.logged).toBe(false);
    })
});