import { fireEvent, render, screen } from "@testing-library/react"
import { AuthContext } from "../../../src/auth/context/AuthContext"
import { Navbar } from "../../../src/ui/components/Navbar"
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
  

describe('Pruebas en el <Navbar />', () => {
    const contextValue = {
        logged: true,
        user: {
            name: 'Felipe Mora'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('should show name of logged user', () => {


        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByLabelText('userName').textContent).toBe(contextValue.user.name);
    })

    test('should call logout and navigate when click in loggout button', () => {
        const navigateMock = jest.fn();
        
        useNavigate.mockReturnValueOnce(navigateMock)

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const buttonLogout = screen.getByRole('button', { name: 'Logout'});

        fireEvent.click(buttonLogout)

        expect(contextValue.logout).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith('/login', {"replace": true});
    })
})