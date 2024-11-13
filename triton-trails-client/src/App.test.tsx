import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

import App from './App'; // Adjust the path accordingly

describe("Navbar", () => {
  test('renders user login', () => {
    render(
      <Router initialEntries={['/']}>
        <App />
      </Router>
    );
    const login = screen.getByText("Login");
    fireEvent.click(login);
    waitFor(() => {
      const signInText = screen.getByText('Sign in');
      expect(signInText).toBeInTheDocument();
    });
  });

  test('renders explore', () => {
    render(
      <Router initialEntries={['/login']}>
        <App />
      </Router>
    );

    const explore = screen.getByText("Explore")
    fireEvent.click(explore)
    waitFor(() => {
      const addTrail = screen.getByText('Add Your Own Trail');
      expect(addTrail).toBeInTheDocument();
    });
  });
});