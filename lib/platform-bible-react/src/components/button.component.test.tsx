import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/button.component';

describe('Button', () => {
  it('renders button text correctly', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('handles click event correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
