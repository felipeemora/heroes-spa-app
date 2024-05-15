import { types } from "../../../src/auth/types/types"

describe('test in types', () => {
    test('should return thoose types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
    })
})