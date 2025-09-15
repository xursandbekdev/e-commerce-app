// src/__tests__/components/Navbar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import  Navbar  from '../../components/navbar';
import { CartProvider } from '../../context/CartContext';
import { useAuth } from '../../context/authContext';

// Mocks
jest.mock('../../components/ui/CardBadge', () => () => <div data-testid="cart-badge" />);
jest.mock('./themeToggle', () => () => <div data-testid="theme-toggle" />);
jest.mock('./languageSelect', () => ({ language, setLanguage }: any) => (
  <div data-testid="language-select">{language}</div>
));

const mockLogout = jest.fn();
jest.mock('../../context/authContext', () => ({
  useAuth: jest.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: 'TestUser', role: 'USER' },
      logout: mockLogout,
    });
  });

  it('renders search input on home', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CartProvider>
          <Navbar searchValue="" setSearchValue={jest.fn()} />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders user avatar and opens menu', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <CartProvider>
          <Navbar searchValue="" setSearchValue={jest.fn()} />
        </CartProvider>
      </MemoryRouter>
    );

    const avatar = screen.getByRole('button', { name: /user/i });
    expect(avatar).toBeInTheDocument();

    fireEvent.click(avatar);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('calls logout on clicking logout', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <CartProvider>
          <Navbar searchValue="" setSearchValue={jest.fn()} />
        </CartProvider>
      </MemoryRouter>
    );

    const avatar = screen.getByRole('button', { name: /user/i });
    fireEvent.click(avatar);

    const logoutBtn = screen.getByText(/logout/i);
    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('renders language select and theme toggle', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CartProvider>
          <Navbar searchValue="" setSearchValue={jest.fn()} />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('language-select')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
