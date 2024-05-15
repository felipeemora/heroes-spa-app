const { render, screen } = require("@testing-library/react")
const { AuthContext } = require("../../src/auth/context/AuthContext")
const { MemoryRouter } = require("react-router-dom")
const { PrivateRoute } = require("../../src/router/PrivateRoute")

describe('test in <PrivateRoute />', () => {
    test('should show children if the user is not authenticate', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'Felipe Mora'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta Privada')).toBeTruthy;
    })
})