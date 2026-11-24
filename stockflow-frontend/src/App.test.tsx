
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render the StockFlow APP heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /stockflow app/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render the application header', () => {
    render(<App />);

    expect(
        screen.getByRole('banner')
    ).toBeInTheDocument();
  });
});
