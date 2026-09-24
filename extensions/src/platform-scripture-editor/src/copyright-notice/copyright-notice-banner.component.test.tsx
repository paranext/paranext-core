// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyrightNoticeBanner } from './copyright-notice-banner.component';
import { BIBLICA_PERMISSIONS_URL } from './copyright-notice.const';

const { sendCommand } = vi.hoisted(() => ({ sendCommand: vi.fn(async () => undefined) }));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand } },
  logger: { warn: vi.fn() },
}));

const STRINGS = {
  '%platformScripture_copyrightNotice_restrictedLicense_banner%':
    '{label}: The {name} is for reference only.',
  '%platformScripture_copyrightNotice_restrictedLicense_details%':
    'Do not quote the {name} Bible. {fullName}™ Bible copyright © {years} by Biblica, Inc. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_restrictedLicense_details_noYears%':
    'Do not quote the {name} Bible. {fullName}™ Bible copyright © Biblica, Inc. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_notification_format%': '{name}: {notice}',
  '%platformScripture_copyrightNotice_moreInfo%': 'More info',
  '%platformScripture_copyrightNotice_showMore%': 'Show more',
  '%platformScripture_copyrightNotice_showLess%': 'Show less',
  '%platformScripture_copyrightNotice_dismiss%': 'Dismiss copyright notice',
  '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
  '%platformScripture_copyrightNotice_details_close%': 'Close',
  '%ariaLabel_opensInBrowser%': 'Opens externally in a browser window',
};

const RESTRICTED = {
  kind: 'restrictedLicense',
  name: 'NIV11',
  fullName: 'New International Version 2011',
  copyrightYears: '1973, 2011',
} as const;

/** Stands in for the browser's ResizeObserver so a test can report a size change on demand. */
class ControllableResizeObserver {
  static instances: ControllableResizeObserver[] = [];

  private readonly targets = new Set<Element>();

  constructor(private readonly callback: ResizeObserverCallback) {
    ControllableResizeObserver.instances.push(this);
  }

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }

  /** Reports a size change, as the browser would, only if something is being observed */
  fire() {
    if (this.targets.size === 0) return;
    // The banner only re-measures; it does not read the entries
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.callback([], this as unknown as ResizeObserver);
  }
}

/** Makes every element report the given heights, as the clamped message will in the browser. */
function setMeasuredHeights(scrollHeight: number, clientHeight: number) {
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(scrollHeight);
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(clientHeight);
}

type BannerProps = Parameters<typeof CopyrightNoticeBanner>[0];

function renderBanner(overrides: Partial<BannerProps> = {}) {
  const onDismiss = vi.fn();
  const props: BannerProps = {
    notice: RESTRICTED,
    localizedStrings: STRINGS,
    onDismiss,
    ...overrides,
  };
  const result = render(<CopyrightNoticeBanner {...props} />);
  return {
    onDismiss,
    rerender: (next: Partial<BannerProps>) =>
      result.rerender(<CopyrightNoticeBanner {...props} {...next} />),
  };
}

function openDetails(name = 'NIV11') {
  fireEvent.click(screen.getByRole('button', { name: 'More info' }));
  return screen.getByRole('dialog', { name: `Copyright for ${name}` });
}

beforeEach(() => {
  ControllableResizeObserver.instances = [];
  vi.stubGlobal('ResizeObserver', ControllableResizeObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('CopyrightNoticeBanner', () => {
  it('shows the license notice for a restricted text, naming it', () => {
    renderBanner();

    expect(screen.getByRole('note')).toHaveTextContent('NIV11: The NIV11 is for reference only.');
  });

  it('is not a live region, so expanding it does not announce the whole notice again', () => {
    renderBanner();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('note')).not.toHaveAttribute('aria-live');
  });

  it('leads the license notice with the name in bold', () => {
    renderBanner();

    expect(screen.getByRole('note').querySelector('strong')).toHaveTextContent('NIV11');
  });

  it("shows a notification text's own banner wording after its name", () => {
    renderBanner({
      notice: {
        kind: 'notification',
        name: 'ESVUK',
        fullName: 'English Standard Version Anglicised',
        bannerText: 'Do not translate the ESV.',
        details: '',
      },
    });

    expect(screen.getByRole('note')).toHaveTextContent('ESVUK: Do not translate the ESV.');
  });

  it('isolates the names so right-to-left names cannot reorder the sentence', () => {
    renderBanner({ notice: { ...RESTRICTED, name: 'كتاب' } });

    const isolatedNames = Array.from(
      screen.getByRole('note').querySelectorAll('bdi'),
      (element) => element.textContent,
    );
    expect(isolatedNames).toEqual(['كتاب', 'كتاب']);
  });

  it("opens Biblica's terms for a restricted text from More info", () => {
    renderBanner();

    expect(openDetails()).toHaveTextContent(
      'Do not quote the NIV11 Bible. New International Version 2011™ Bible copyright © 1973, 2011 by Biblica, Inc. Ask at https://www.biblica.com/permissions/',
    );
  });

  it('announces the terms as the description of the details window', () => {
    renderBanner();

    expect(openDetails()).toHaveAccessibleDescription(/^Do not quote the NIV11 Bible\./);
  });

  it("leaves the years out of Biblica's terms when the copyright names none", () => {
    renderBanner({ notice: { ...RESTRICTED, copyrightYears: '' } });

    expect(openDetails()).toHaveTextContent(
      'New International Version 2011™ Bible copyright © Biblica, Inc.',
    );
  });

  it("links to Biblica's permissions page, opening it in the browser", () => {
    renderBanner();

    const link = within(openDetails()).getByRole('link', { name: BIBLICA_PERMISSIONS_URL });

    expect(link).toHaveAttribute('href', BIBLICA_PERMISSIONS_URL);
    expect(link).toHaveAccessibleDescription('Opens externally in a browser window');
  });

  it('asks the platform to open the permissions page, since a web view cannot open windows', () => {
    renderBanner();
    const link = within(openDetails()).getByRole('link', { name: BIBLICA_PERMISSIONS_URL });

    const isNotCancelled = fireEvent.click(link);

    expect(isNotCancelled).toBe(false);
    expect(sendCommand).toHaveBeenCalledWith('platform.openWindow', BIBLICA_PERMISSIONS_URL);
  });

  it('keeps the permissions address left to right in a right-to-left sentence', () => {
    renderBanner();

    const link = within(openDetails()).getByRole('link', { name: BIBLICA_PERMISSIONS_URL });

    expect(link.querySelector('bdi')).toHaveAttribute('dir', 'ltr');
  });

  it("opens a notification text's own copyright, one paragraph per line", () => {
    renderBanner({
      notice: {
        kind: 'notification',
        name: 'ESVUK',
        fullName: 'English Standard Version Anglicised',
        bannerText: 'Do not translate the ESV.',
        details: 'Copyright © 2016 Crossway.\nAll rights reserved.',
      },
    });

    const paragraphs = within(openDetails('ESVUK'))
      .getAllByText(/./, { selector: 'p' })
      .map((paragraph) => paragraph.textContent);
    expect(paragraphs).toEqual(['Copyright © 2016 Crossway.', 'All rights reserved.']);
  });

  it('offers one way to close the details: its own Close button', () => {
    renderBanner();

    const closeButtons = within(openDetails()).getAllByRole('button', { name: /close/i });

    expect(closeButtons.map((button) => button.textContent)).toEqual(['Close']);
  });

  it('returns focus to More info when the details close', async () => {
    renderBanner();
    const moreInfo = screen.getByRole('button', { name: 'More info' });
    moreInfo.focus();

    fireEvent.keyDown(openDetails(), { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => expect(moreInfo).toHaveFocus());
  });

  it('reports a dismissal', () => {
    const { onDismiss } = renderBanner();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss copyright notice' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  describe('clamping', () => {
    it('offers no expander when the whole notice fits', () => {
      setMeasuredHeights(40, 40);

      renderBanner();

      expect(screen.getByRole('note')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument();
    });

    it('expands and collapses a notice that does not fit', () => {
      setMeasuredHeights(120, 40);
      renderBanner();

      const showMore = screen.getByRole('button', { name: 'Show more' });
      expect(showMore).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(showMore);
      const showLess = screen.getByRole('button', { name: 'Show less' });
      expect(showLess).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(showLess);
      expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('offers the expander once a hidden tab becomes visible and the notice turns out not to fit', () => {
      // A tab that is not showing has no layout, so everything measures zero
      setMeasuredHeights(0, 0);
      renderBanner();
      expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument();

      // The tab is shown: the message gets its real size and the observer reports it
      setMeasuredHeights(120, 40);
      act(() => {
        ControllableResizeObserver.instances.forEach((observer) => observer.fire());
      });

      expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('measures again when the wording changes, as when the strings arrive after the notice', () => {
      // While strings load, each one is its own key, which here fits on the line
      setMeasuredHeights(40, 40);
      const { rerender } = renderBanner({
        localizedStrings: {
          ...STRINGS,
          '%platformScripture_copyrightNotice_restrictedLicense_banner%':
            '%platformScripture_copyrightNotice_restrictedLicense_banner%',
        },
      });
      expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument();

      // The real wording arrives and no longer fits; the box keeps its clamped size, so no
      // resize is reported
      setMeasuredHeights(120, 40);
      rerender({ localizedStrings: STRINGS });

      expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });
  });
});
