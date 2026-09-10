import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { reloadWebView } from '@renderer/services/web-view.service-shard';
import { logger } from '@shared/services/logger.service';
import { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WebViewErrorBoundary } from './web-view-error-boundary.component';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  reloadWebView: vi.fn(async () => 'web-view-id'),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%webView_error_crashed_title%': 'This panel stopped working',
      '%webView_error_crashed_message%': 'Localized message for {webViewTitle}',
      '%webView_error_crashed_messageNoTitle%': 'Localized message with no title',
      '%webView_error_crashed_reloadButton%': 'Reload',
    },
    false,
  ]),
}));

function Boom(): ReactNode {
  throw new Error('render-phase boom');
}

function renderBoundary(children: ReactNode) {
  return render(
    <WebViewErrorBoundary webViewId="web-view-id" webViewType="testWebView" webViewTitle="Editor">
      {children}
    </WebViewErrorBoundary>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  // React reports every caught error to the console; the boundary's own logging is what these tests
  // assert on, so keep the suite output readable
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('WebViewErrorBoundary', () => {
  it('renders its children when nothing throws', () => {
    renderBoundary(<div>web view content</div>);

    expect(screen.getByText('web view content')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders the crash view instead of blanking when a child throws while rendering', () => {
    renderBoundary(<Boom />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('This panel stopped working')).toBeInTheDocument();
  });

  it('logs the failure with the web view id, type and component stack', () => {
    renderBoundary(<Boom />);

    expect(logger.error).toHaveBeenCalledTimes(1);
    const message = vi.mocked(logger.error).mock.calls[0][0];
    expect(message).toContain('web-view-id');
    expect(message).toContain('testWebView');
    expect(message).toContain('render-phase boom');
    // The component stack is the part that makes the log actionable in a bug report
    expect(message).toContain('Boom');
  });

  it('keeps showing the crash view when the parent re-renders', () => {
    const { rerender } = renderBoundary(<Boom />);

    rerender(
      <WebViewErrorBoundary webViewId="web-view-id" webViewType="testWebView" webViewTitle="Editor">
        <div>recovered content</div>
      </WebViewErrorBoundary>,
    );

    // Reloading is the documented way back; a parent re-render must not silently remount a subtree
    // that is still broken
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText('recovered content')).not.toBeInTheDocument();
  });

  it('keeps showing the crash view when the web view definition changes', () => {
    // The generated iframe script re-runs `root.render` against this same boundary instance on
    // every `onDidUpdateWebView`, and the updates that reach a crashed pane are shared-state ones -
    // `scrollGroupScrRef` on every navigation, `state`, bring-to-front. Resetting on those would
    // re-run the same failing render on every verse move. The updates that genuinely mean "show
    // something else here" replace or reload the web view, which builds a fresh iframe and a fresh
    // boundary with it.
    const { rerender } = renderBoundary(<Boom />);

    rerender(
      <WebViewErrorBoundary
        webViewId="web-view-id"
        webViewType="testWebView"
        webViewTitle="Editor - after navigation"
      >
        <div>recovered content</div>
      </WebViewErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText('recovered content')).not.toBeInTheDocument();
  });

  it('reloads the web view when the crash view asks it to', async () => {
    renderBoundary(<Boom />);

    fireEvent.click(screen.getByRole('button'));

    expect(reloadWebView).toHaveBeenCalledExactlyOnceWith('testWebView', 'web-view-id');
  });

  it('logs rather than silently doing nothing when the web view is no longer open', async () => {
    // `reloadWebView` RESOLVES undefined in this case instead of rejecting, so a `.catch` alone
    // would leave a button that does nothing and reports nothing
    vi.mocked(reloadWebView).mockResolvedValueOnce(undefined);
    renderBoundary(<Boom />);

    fireEvent.click(screen.getByRole('button'));
    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalledOnce());

    expect(vi.mocked(logger.warn).mock.calls[0][0]).toContain('no longer open');
  });

  it('catches a crash that Lexical re-throws out of its own error boundary', () => {
    // The scripture editor renders through `@eten-tech-foundation/platform-editor`, which passes
    // `LexicalErrorBoundary` to Lexical's `RichTextPlugin` and configures
    // `onError(error) { throw error; }`. Lexical's boundary catches first and would render its own
    // bare "An error was thrown." box, but re-throwing from `componentDidCatch` hands the error to
    // the next boundary up — us. That chain is why editor crashes reach this component at all, and
    // it spans two packages we do not own, so pin it: if a platform-editor upgrade ever swallows in
    // `onError` instead, editor coverage disappears silently and this test is what says so.
    renderBoundary(
      <LexicalErrorBoundary
        onError={(error) => {
          throw error;
        }}
      >
        <Boom />
      </LexicalErrorBoundary>,
    );

    expect(screen.getByText('This panel stopped working')).toBeInTheDocument();
    expect(screen.queryByText('An error was thrown.')).not.toBeInTheDocument();
  });
});
