import { Canon } from '@sillsdev/scripture';
import { DC_BOOK_IDS, NT_BOOK_IDS, OT_BOOK_IDS } from './project-scopes';

describe('OT_BOOK_IDS', () => {
  it('contains the 39 Old Testament books in canonical order', () => {
    expect(OT_BOOK_IDS).toHaveLength(39);
    expect(OT_BOOK_IDS[0]).toBe('GEN');
    expect(OT_BOOK_IDS[OT_BOOK_IDS.length - 1]).toBe('MAL');
  });

  it('only contains books with canonical numbers 1–39', () => {
    OT_BOOK_IDS.forEach((id) => {
      const n = Canon.bookIdToNumber(id);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(39);
    });
  });
});

describe('NT_BOOK_IDS', () => {
  it('contains the 27 New Testament books in canonical order', () => {
    expect(NT_BOOK_IDS).toHaveLength(27);
    expect(NT_BOOK_IDS[0]).toBe('MAT');
    expect(NT_BOOK_IDS[NT_BOOK_IDS.length - 1]).toBe('REV');
  });

  it('only contains books with canonical numbers 40–66', () => {
    NT_BOOK_IDS.forEach((id) => {
      const n = Canon.bookIdToNumber(id);
      expect(n).toBeGreaterThanOrEqual(40);
      expect(n).toBeLessThanOrEqual(66);
    });
  });
});

describe('DC_BOOK_IDS', () => {
  it('begins with TOB and is non-empty', () => {
    expect(DC_BOOK_IDS.length).toBeGreaterThan(0);
    expect(DC_BOOK_IDS[0]).toBe('TOB');
  });

  it('only contains books with canonical numbers 67–88', () => {
    DC_BOOK_IDS.forEach((id) => {
      const n = Canon.bookIdToNumber(id);
      expect(n).toBeGreaterThanOrEqual(67);
      expect(n).toBeLessThanOrEqual(88);
    });
  });
});

describe('OT/NT/DC partitioning', () => {
  it('produces disjoint sets', () => {
    const otSet = new Set(OT_BOOK_IDS);
    const ntSet = new Set(NT_BOOK_IDS);
    const dcSet = new Set(DC_BOOK_IDS);

    OT_BOOK_IDS.forEach((id) => expect(ntSet.has(id)).toBe(false));
    OT_BOOK_IDS.forEach((id) => expect(dcSet.has(id)).toBe(false));
    NT_BOOK_IDS.forEach((id) => expect(otSet.has(id)).toBe(false));
    NT_BOOK_IDS.forEach((id) => expect(dcSet.has(id)).toBe(false));
    DC_BOOK_IDS.forEach((id) => expect(otSet.has(id)).toBe(false));
    DC_BOOK_IDS.forEach((id) => expect(ntSet.has(id)).toBe(false));
  });
});
