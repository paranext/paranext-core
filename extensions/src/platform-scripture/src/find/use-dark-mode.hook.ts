import { useEffect, useState } from 'react';

// TODO: Replace this hook with Tailwind's built-in `dark:` variant classes once we upgrade to
// Tailwind v4, which supports automatic dark mode detection without a class-based workaround.

/**
 * Returns whether the app is currently in dark mode by observing the `dark` class on
 * `document.body`. Re-renders the consumer whenever dark mode changes.
 *
 * This is needed because Tailwind's `dark:` variant classes don't apply correctly in webview
 * contexts with the current Tailwind version.
 */
export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.body.classList.contains('dark')),
    );
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
