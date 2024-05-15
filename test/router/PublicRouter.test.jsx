const { render, screen } = require("@testing-library/react")
const { PublicRoute } = require("../../src/router/PublicRoute")
const { AuthContext } = require("../../src/auth/context/AuthContext")
const { MemoryRouter, Route, Routes } = require("react-router-dom")
const { PrivateRoute } = require("../../src/router/PrivateRoute")

describe('test in <PublicRoute />', () => {
    test('should show children if the user is not authenticate', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta Publica')).toBeTruthy;
    })

    test('should show navigate when user is logged', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Felipe Mora'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={<h1>Página de marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Página de marvel')).toBeTruthy;

    })
})