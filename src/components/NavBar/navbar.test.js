import NavBar from '.';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders navbar', () => {
  render(<Router><NavBar></NavBar></Router>);
  expect(screen.getByText( `Instructor`)).toBeInTheDocument();
});