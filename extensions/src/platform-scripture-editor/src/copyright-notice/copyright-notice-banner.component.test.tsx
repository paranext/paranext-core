// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyrightNoticeBanner } from './copyright-notice-banner.component';
import { BIBLICA_PERMISSIONS_URL } from './copyright-notice-message.utils';

const STRINGS = {
  '%platformScripture_copyrightNotice_restrictedLicense_banner%':
    '{label}: The {name} is for reference only.',
  '%platformScripture_copyrightNotice_restrictedLicense_details%':
    'Do not quote the {name} Bible. {fullName}™ Bible copyright © {years} by Biblica, Inc. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_restrictedLicense_details_noYears%':
    'Do not quote the {name} Bible. {fullName}™ Bible copyright © Biblica, Inc. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_notification_format%': '{name}: {notice}',
  '%platformScripture_copyrightNotice_moreInfo%': 'More info…',
  '%platformScripture_copyrightNotice_showMore%': 'Show more',
  '%platformScripture_copyrightNotice_showLess%': 'Show less',
  '%platformScripture_copyrightNotice_dismiss%': 'Dismiss',
  '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
  '%platformScripture_copyrightNotice_details_close%': 'Close',
};

const RESTRICTED = { kind: 'restrictedLicense', copyrightYears: '1973, 2011' } as const;

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

function renderBanner(overrides: Partial<Parameters<typeof CopyrightNoticeBanner>[0]> = {}) {
  const onDismiss = vi.fn();
  const onOpenUrl = vi.fn();
  render(
    <CopyrightNoticeBanner
      notice={RESTRICTED}
      name="NIV11"
      fullName="New International Version 2011"
      localizedStrings={STRINGS}
      onDismiss={onDismiss}
      onOpenUrl={onOpenUrl}
      {...overrides}
    />,
  );
  return { onDismiss, onOpenUrl };
}

function openDetails(name = 'NIV11') {
  fireEvent.click(screen.getByRole('button', { name: 'More info…' }));
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
  it('shows the licence notice for a restricted text, naming it', () => {
    renderBanner();

    expect(screen.getByRole('status')).toHaveTextContent('NIV11: The NIV11 is for reference only.');
  });

  it('leads the licence notice with the name in bold', () => {
    renderBanner();

    expect(screen.getByRole('status').querySelector('strong')).toHaveTextContent('NIV11');
  });

  it("shows a notification text's own banner wording after its name", () => {
    renderBanner({
      notice: { kind: 'notification', bannerText: 'Do not translate the ESV.', details: '' },
      name: 'ESVUK',
    });

    expect(screen.getByRole('status')).toHaveTextContent('ESVUK: Do not translate the ESV.');
  });

  it('isolates the names so right-to-left names cannot reorder the sentence', () => {
    renderBanner({ name: 'كتاب' });

    const isolatedNames = Array.from(
      screen.getByRole('status').querySelectorAll('bdi'),
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

  it("leaves the years out of Biblica's terms when the copyright names none", () => {
    renderBanner({ notice: { kind: 'restrictedLicense', copyrightYears: '' } });

    expect(openDetails()).toHaveTextContent(
      'New International Version 2011™ Bible copyright © Biblica, Inc.',
    );
  });

  it("uses the short name in Biblica's terms when there is no full name", () => {
    renderBanner({ fullName: '' });

    expect(openDetails()).toHaveTextContent('NIV11™ Bible copyright © 1973, 2011');
  });

  it("opens Biblica's permissions page from its link", () => {
    const { onOpenUrl } = renderBanner();

    fireEvent.click(
      within(openDetails()).getByRole('button', { name: 'https://www.biblica.com/permissions/' }),
    );

    expect(onOpenUrl).toHaveBeenCalledWith(BIBLICA_PERMISSIONS_URL);
  });

  it("opens a notification text's own copyright, one paragraph per line", () => {
    renderBanner({
      notice: {
        kind: 'notification',
        bannerText: 'Do not translate the ESV.',
        details: 'Copyright © 2016 Crossway.\nAll rights reserved.',
      },
      name: 'ESVUK',
    });

    const paragraphs = within(openDetails('ESVUK'))
      .getAllByText(/./, { selector: 'p' })
      .map((paragraph) => paragraph.textContent);
    expect(paragraphs).toEqual(['Copyright © 2016 Crossway.', 'All rights reserved.']);
  });

  it('reports a dismissal', () => {
    const { onDismiss } = renderBanner();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  describe('clamping', () => {
    it('offers no expander when the whole notice fits', () => {
      setMeasuredHeights(40, 40);

      renderBanner();

      expect(screen.getByRole('status')).toBeInTheDocument();
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
  });
});
