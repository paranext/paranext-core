import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn() backwards compatibility shim', () => {
  describe('basic dedup — last wins', () => {
    it('tw- wins over earlier tw:', () => {
      expect(cn('tw:p-4', 'tw-p-4')).toBe('tw-p-4');
    });
    it('tw: wins over earlier tw-', () => {
      expect(cn('tw-p-4', 'tw:p-4')).toBe('tw:p-4');
    });
    it('tw- wins via conditional object', () => {
      expect(cn({ 'tw:p-4': true }, 'tw-p-4')).toBe('tw-p-4');
    });
  });

  describe('variant reordering', () => {
    it('tw: hover wins over tw- hover', () => {
      expect(cn('hover:tw-bg-red-500', 'tw:hover:bg-red-500')).toBe('tw:hover:bg-red-500');
    });
    it('tw- hover wins over tw: hover', () => {
      expect(cn('tw:hover:bg-red-500', 'hover:tw-bg-red-500')).toBe('hover:tw-bg-red-500');
    });
  });

  describe('multi-variant', () => {
    it('handles dark:hover compound', () => {
      expect(cn('dark:hover:tw-bg-red-500', 'tw:dark:hover:bg-blue-500')).toBe(
        'tw:dark:hover:bg-blue-500',
      );
    });
  });

  describe('responsive variants', () => {
    it('tw: sm wins over tw- sm', () => {
      expect(cn('sm:tw-p-4', 'tw:sm:p-8')).toBe('tw:sm:p-8');
    });
    it('tw- sm wins over tw: sm', () => {
      expect(cn('tw:sm:p-8', 'sm:tw-p-4')).toBe('sm:tw-p-4');
    });
    it('handles md:lg compound', () => {
      expect(cn('md:lg:tw-flex', 'tw:md:lg:hidden')).toBe('tw:md:lg:hidden');
    });
  });

  describe('compound variants (group/peer)', () => {
    it('handles group-hover', () => {
      expect(cn('group-hover:tw-flex', 'tw:group-hover:hidden')).toBe('tw:group-hover:hidden');
    });
    it('handles peer-focus:group-hover compound', () => {
      expect(
        cn('peer-focus:group-hover:tw-text-red-500', 'tw:peer-focus:group-hover:text-blue-500'),
      ).toBe('tw:peer-focus:group-hover:text-blue-500');
    });
  });

  describe('negative form A (tw--X)', () => {
    it('tw: wins over tw-- form', () => {
      expect(cn('tw--mt-4', 'tw:-mt-4')).toBe('tw:-mt-4');
    });
    it('tw-- form wins over tw:', () => {
      expect(cn('tw:-mt-4', 'tw--mt-4')).toBe('tw--mt-4');
    });
  });

  describe('negative form B (-tw-X)', () => {
    it('tw: wins over -tw- form', () => {
      expect(cn('-tw-mt-4', 'tw:-mt-4')).toBe('tw:-mt-4');
    });
    it('-tw- form wins over tw:', () => {
      expect(cn('tw:-mt-4', '-tw-mt-4')).toBe('-tw-mt-4');
    });
  });

  describe('both TW3 negative forms compete', () => {
    it('-tw- wins over tw-- when last', () => {
      expect(cn('tw--mt-4', '-tw-mt-4')).toBe('-tw-mt-4');
    });
    it('tw-- wins over -tw- when last', () => {
      expect(cn('-tw-mt-4', 'tw--mt-4')).toBe('tw--mt-4');
    });
  });

  describe('negatives with variants', () => {
    it('tw: hover wins over tw-- hover', () => {
      expect(cn('hover:tw--mt-4', 'tw:hover:-mt-4')).toBe('tw:hover:-mt-4');
    });
    it('-tw- hover wins over tw: hover', () => {
      expect(cn('tw:hover:-mt-4', 'hover:-tw-mt-4')).toBe('hover:-tw-mt-4');
    });
  });

  describe('negative vs positive dedup', () => {
    it('negative wins over positive when last', () => {
      expect(cn('tw-mt-4', 'tw:-mt-4')).toBe('tw:-mt-4');
    });
    it('positive wins over negative when last', () => {
      expect(cn('tw:-mt-4', 'tw-mt-4')).toBe('tw-mt-4');
    });
  });

  describe('non-tw classes pass through', () => {
    it('preserves non-tw classes', () => {
      expect(cn('some-class', 'tw:p-4')).toBe('some-class tw:p-4');
    });
    it('preserves pr-twp and deduplicates tw classes', () => {
      expect(cn('pr-twp', 'tw-flex', 'tw:flex')).toBe('pr-twp tw:flex');
    });
  });

  describe('mixed prefixes — no conflict', () => {
    it('both survive when no conflict', () => {
      expect(cn('tw-p-4', 'tw:bg-red-500')).toBe('tw-p-4 tw:bg-red-500');
    });
  });

  describe('arbitrary values', () => {
    it('tw: wins with arbitrary pixel value', () => {
      expect(cn('tw-p-[12px]', 'tw:p-[16px]')).toBe('tw:p-[16px]');
    });
    it('tw- wins with arbitrary pixel value', () => {
      expect(cn('tw:p-[16px]', 'tw-p-[12px]')).toBe('tw-p-[12px]');
    });
  });

  describe('arbitrary properties (colons inside brackets)', () => {
    it('tw: wins with arbitrary property', () => {
      expect(cn('tw-[color:red]', 'tw:[color:blue]')).toBe('tw:[color:blue]');
    });
    it('tw- wins with arbitrary property', () => {
      expect(cn('tw:[color:blue]', 'tw-[color:red]')).toBe('tw-[color:red]');
    });
  });

  describe('important modifier (!)', () => {
    it('tw: wins with important', () => {
      expect(cn('!tw-p-4', 'tw:!p-4')).toBe('tw:!p-4');
    });
    it('tw- wins with important', () => {
      expect(cn('tw:!p-4', '!tw-p-4')).toBe('!tw-p-4');
    });
  });

  describe('single token passthrough', () => {
    it('single token passes through', () => {
      expect(cn('tw-p-4')).toBe('tw-p-4');
    });
  });

  describe('existing cn() behavior preserved', () => {
    it('merges TW4-only classes normally', () => {
      expect(cn('tw:bg-primary', 'tw:bg-secondary')).toBe('tw:bg-secondary');
    });
    it('handles conditional objects', () => {
      expect(cn('tw:p-4', { 'tw:p-8': true, 'tw:m-2': false })).toBe('tw:p-8');
    });
    it('passes through non-tailwind classes', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });
  });
});
