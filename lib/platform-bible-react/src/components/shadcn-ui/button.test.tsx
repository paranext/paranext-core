import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/shadcn-ui/button';

describe('Button Component (Unit Tests)', () => {
  it('renders correctly with default props', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button', { name: /default button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('tw-bg-destructive');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('tw-border');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('tw-bg-secondary');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('hover:tw-bg-accent');

    rerender(<Button variant="link">Link</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('tw-text-primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('tw-h-9');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('tw-h-11');

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('tw-h-10');
    expect(button).toHaveClass('tw-w-10');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:tw-pointer-events-none');
    expect(button).toHaveClass('disabled:tw-opacity-50');
  });

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    let buttonRef: HTMLButtonElement | undefined;

    render(
      <Button
        ref={(ref) => {
          buttonRef = ref ?? undefined;
        }}
      >
        Ref Button
      </Button>,
    );

    expect(buttonRef).toBeInstanceOf(HTMLButtonElement);
    expect(buttonRef?.textContent).toBe('Ref Button');
  });

  it('supports asChild prop with Slot', () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass('tw-inline-flex'); // Button styles should be applied
  });
});
