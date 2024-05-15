import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router/AppRouter"

describe('Pruebas en <AppRouter />', () => {
    test('should show login if the user is not authenticate', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter/>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('LoginPage')).toBeTruthy();
    });

    test('should show marvel component if user is authenticate', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Felipe Mora'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter/>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Marvel Comics')).toBeTruthy();
    })
})