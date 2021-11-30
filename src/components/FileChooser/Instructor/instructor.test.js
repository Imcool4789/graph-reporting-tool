import InstructorFileChooser from ".";
import React from 'react';
import { render, screen } from '@testing-library/react';

it('renders instructor page', () => {
  render(<InstructorFileChooser />);
  expect(screen.getByText("Upload Graduate Attributes")).toBeInTheDocument();
});