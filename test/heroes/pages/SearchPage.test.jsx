const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter, useNavigate } = require("react-router-dom");
const { SearchPage } = require("../../../src/heroes/pages/SearchPage");

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));


describe('Tests in <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should show ok with deafult values', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
    })

    test('should show batman and input with query string', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const inputValue = screen.getByRole('textbox');
        const image = screen.getByRole('img');
        const divSearchHero = screen.getByLabelText('search-hero');
        const divNoHero = screen.getByLabelText('no-hero');

        expect(inputValue.value).toBe('batman');
        expect(image.src).toContain('/assets/heroes/dc-batman.jpg');
        expect(divSearchHero.style.display).toBe('none');
        expect(divNoHero.style.display).toBe('none');
    })

    test('should show error if hero is not found', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const inputValue = screen.getByRole('textbox');
        const divSearchHero = screen.getByLabelText('search-hero');
        const divNoHero = screen.getByLabelText('no-hero');

        expect(inputValue.value).toBe('batman123');
        expect(divSearchHero.style.display).toBe('none');
        expect(divNoHero.style.display).toBe('');
    });

    test('should call navigate', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const inputValue = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.change(inputValue, { target: { name: 'searchText', value: 'superman' } })
        fireEvent.submit(form);

        expect(inputValue.value).toBe('superman');
        expect(mockUseNavigate).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith('?q=superman');

    });
});
