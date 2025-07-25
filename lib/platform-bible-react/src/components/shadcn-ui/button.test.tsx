import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import { Button } from '@/components/shadcn-ui/button';

describe('Button Component', () => {
  it('renders correctly with default props', async () => {
    render(<Button>Default Button</Button>);
    const button = page.getByRole('button', { name: /default button/i });
    await expect(button).toBeInTheDocument();
  });

  it('renders with different variants', async () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    let button = page.getByRole('button');
    await expect(button).toHaveClass('tw-bg-destructive');

    rerender(<Button variant="outline">Outline</Button>);
    button = page.getByRole('button');
    await expect(button).toHaveClass('tw-border');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = page.getByRole('button');
    await expect(button).toHaveClass('tw-bg-secondary');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = page.getByRole('button');
    await expect(button).toHaveClass('hover:tw-bg-accent');

    rerender(<Button variant="link">Link</Button>);
    button = page.getByRole('button');
    await expect(button).toHaveClass('tw-text-primary');
  });

  it('renders with different sizes', async () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = page.getByRole('button');
    await expect(button).toHaveClass('tw-h-9');

    rerender(<Button size="lg">Large</Button>);
    button = page.getByRole('button');
    await expect(button).toHaveClass('tw-h-11');

    rerender(<Button size="icon">Icon</Button>);
    button = page.getByRole('button');
    await expect(button).toHaveClass('tw-h-10');
    await expect(button).toHaveClass('tw-w-10');
  });

  it('can be disabled', async () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
    await expect(button).toHaveClass('disabled:tw-pointer-events-none');
    await expect(button).toHaveClass('disabled:tw-opacity-50');
  });

  it('handles click events', async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = page.getByRole('button');

    await button.click();
    expect(clicked).toBe(true);
  });

  it('does not trigger click when disabled', async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    );
    const button = page.getByRole('button');

    await button.click();
    expect(clicked).toBe(false);
  });

  it('accepts custom className', async () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = page.getByRole('button');
    await expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', async () => {
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

    // Wait for the component to render
    await page.getByRole('button');

    expect(buttonRef).toBeInstanceOf(HTMLButtonElement);
    expect(buttonRef?.textContent).toBe('Ref Button');
  });

  it('supports asChild prop with Slot', async () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>,
    );

    const link = page.getByRole('link');
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '/');
    await expect(link).toHaveClass('tw-inline-flex'); // Button styles should be applied
  });
});
