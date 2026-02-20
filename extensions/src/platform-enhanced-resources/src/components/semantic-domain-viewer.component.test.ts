import { describe, it, expect, vi } from 'vitest';
import type {
  SemanticDomainViewerProps,
  SemanticDomainViewerInput,
  SemanticDomain,
  BreadcrumbItem,
  SemanticDomainWord,
} from './semantic-domain-viewer.component';
import {
  findDomainByNumber,
  computeBreadcrumbPath,
  computeAncestorNumbers,
} from './semantic-domain-viewer.utils';

/**
 * SemanticDomainViewer component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts,
 * callback behavior, tree utility functions, breadcrumb generation, and ancestor expansion logic.
 */

// --- Mock data factory ---

function createMockWord(overrides: Partial<SemanticDomainWord> = {}): SemanticDomainWord {
  return {
    lemma: 'logos',
    term: 'word',
    ...overrides,
  };
}

function createMockDomain(overrides: Partial<SemanticDomain> = {}): SemanticDomain {
  return {
    number: '1',
    name: 'Universe, creation',
    words: [],
    children: [],
    ...overrides,
  };
}

/** Creates a sample multi-level domain tree for testing */
function createMockDomainTree(): SemanticDomain[] {
  return [
    createMockDomain({
      number: '1',
      name: 'Universe, creation',
      children: [
        createMockDomain({
          number: '1.1',
          name: 'Sky',
          children: [
            createMockDomain({
              number: '1.1.1',
              name: 'Sun',
              words: [
                createMockWord({ lemma: 'helios', term: 'sun' }),
                createMockWord({ lemma: 'phos', term: 'light' }),
              ],
            }),
            createMockDomain({
              number: '1.1.2',
              name: 'Moon',
              words: [createMockWord({ lemma: 'selene', term: 'moon' })],
            }),
            createMockDomain({
              number: '1.1.3',
              name: 'Star',
              children: [
                createMockDomain({
                  number: '1.1.3.1',
                  name: 'Constellation',
                  words: [],
                }),
              ],
            }),
          ],
        }),
        createMockDomain({
          number: '1.2',
          name: 'World',
          children: [
            createMockDomain({
              number: '1.2.1',
              name: 'Land',
            }),
            createMockDomain({
              number: '1.2.2',
              name: 'Water',
            }),
          ],
        }),
      ],
    }),
    createMockDomain({
      number: '2',
      name: 'Person',
      children: [
        createMockDomain({
          number: '2.1',
          name: 'Body',
        }),
      ],
    }),
  ];
}

describe('semantic-domain-viewer.component', () => {
  // --- SemanticDomainViewerProps Type Contract Tests ---

  it('SemanticDomainViewerProps interface accepts all required props', () => {
    const props: SemanticDomainViewerProps = {
      selectedDomainNumber: '1.1.1',
      domainTree: createMockDomainTree(),
      onClose: () => {},
      onNavigateToWord: () => {},
    };

    expect(props.selectedDomainNumber).toBe('1.1.1');
    expect(props.domainTree).toHaveLength(2);
    expect(props.onClose).toBeDefined();
    expect(props.onNavigateToWord).toBeDefined();
  });

  it('SemanticDomainViewerProps accepts empty domain tree', () => {
    const props: SemanticDomainViewerProps = {
      selectedDomainNumber: '1',
      domainTree: [],
      onClose: () => {},
      onNavigateToWord: () => {},
    };

    expect(props.domainTree).toHaveLength(0);
  });

  // --- SemanticDomainViewerInput Type Contract Tests ---

  it('SemanticDomainViewerInput has all required fields', () => {
    const input: SemanticDomainViewerInput = {
      selectedDomainNumber: '1.1.1',
      domainTree: createMockDomainTree(),
    };

    expect(input.selectedDomainNumber).toBe('1.1.1');
    expect(input.domainTree).toBeDefined();
  });

  // --- SemanticDomain Type Contract Tests ---

  it('SemanticDomain has required fields', () => {
    const domain = createMockDomain();

    expect(domain.number).toBe('1');
    expect(domain.name).toBe('Universe, creation');
    expect(domain.children).toEqual([]);
  });

  it('SemanticDomain supports optional words field', () => {
    const domainWithWords = createMockDomain({
      words: [createMockWord({ lemma: 'theos', term: 'God' })],
    });
    const domainWithoutWords = createMockDomain({ words: undefined });

    expect(domainWithWords.words).toHaveLength(1);
    expect(domainWithoutWords.words).toBeUndefined();
  });

  it('SemanticDomain supports recursive children', () => {
    const tree = createMockDomainTree();
    const root = tree[0];

    expect(root.children).toHaveLength(2);
    expect(root.children[0].children).toHaveLength(3);
    expect(root.children[0].children[2].children).toHaveLength(1);
  });

  // --- BreadcrumbItem Type Contract Tests ---

  it('BreadcrumbItem has required fields', () => {
    const item: BreadcrumbItem = {
      number: '1.1',
      name: 'Sky',
    };

    expect(item.number).toBe('1.1');
    expect(item.name).toBe('Sky');
  });

  // --- SemanticDomainWord Type Contract Tests ---

  it('SemanticDomainWord has required fields', () => {
    const word = createMockWord();

    expect(word.lemma).toBe('logos');
    expect(word.term).toBe('word');
  });

  // --- findDomainByNumber Tests ---

  it('findDomainByNumber finds root-level domain', () => {
    const tree = createMockDomainTree();
    const result = findDomainByNumber(tree, '1');

    expect(result).toBeDefined();
    expect(result?.number).toBe('1');
    expect(result?.name).toBe('Universe, creation');
  });

  it('findDomainByNumber finds deeply nested domain', () => {
    const tree = createMockDomainTree();
    const result = findDomainByNumber(tree, '1.1.3.1');

    expect(result).toBeDefined();
    expect(result?.number).toBe('1.1.3.1');
    expect(result?.name).toBe('Constellation');
  });

  it('findDomainByNumber finds second root-level domain', () => {
    const tree = createMockDomainTree();
    const result = findDomainByNumber(tree, '2');

    expect(result).toBeDefined();
    expect(result?.number).toBe('2');
    expect(result?.name).toBe('Person');
  });

  it('findDomainByNumber returns undefined for non-existent domain', () => {
    const tree = createMockDomainTree();
    const result = findDomainByNumber(tree, '99.99');

    expect(result).toBeUndefined();
  });

  it('findDomainByNumber handles empty tree', () => {
    const result = findDomainByNumber([], '1');

    expect(result).toBeUndefined();
  });

  // --- computeBreadcrumbPath Tests ---

  it('computeBreadcrumbPath returns path from root to leaf', () => {
    const tree = createMockDomainTree();
    const path = computeBreadcrumbPath(tree, '1.1.1');

    expect(path).toHaveLength(3);
    expect(path[0]).toEqual({ number: '1', name: 'Universe, creation' });
    expect(path[1]).toEqual({ number: '1.1', name: 'Sky' });
    expect(path[2]).toEqual({ number: '1.1.1', name: 'Sun' });
  });

  it('computeBreadcrumbPath returns single item for root domain', () => {
    const tree = createMockDomainTree();
    const path = computeBreadcrumbPath(tree, '1');

    expect(path).toHaveLength(1);
    expect(path[0]).toEqual({ number: '1', name: 'Universe, creation' });
  });

  it('computeBreadcrumbPath returns path for deeply nested domain', () => {
    const tree = createMockDomainTree();
    const path = computeBreadcrumbPath(tree, '1.1.3.1');

    expect(path).toHaveLength(4);
    expect(path[0].number).toBe('1');
    expect(path[1].number).toBe('1.1');
    expect(path[2].number).toBe('1.1.3');
    expect(path[3].number).toBe('1.1.3.1');
  });

  it('computeBreadcrumbPath returns empty for non-existent domain', () => {
    const tree = createMockDomainTree();
    const path = computeBreadcrumbPath(tree, '99.99');

    expect(path).toHaveLength(0);
  });

  it('computeBreadcrumbPath handles second root branch', () => {
    const tree = createMockDomainTree();
    const path = computeBreadcrumbPath(tree, '2.1');

    expect(path).toHaveLength(2);
    expect(path[0]).toEqual({ number: '2', name: 'Person' });
    expect(path[1]).toEqual({ number: '2.1', name: 'Body' });
  });

  // --- computeAncestorNumbers Tests ---

  it('computeAncestorNumbers returns ancestors for leaf node', () => {
    const tree = createMockDomainTree();
    const ancestors = computeAncestorNumbers(tree, '1.1.1');

    expect(ancestors.size).toBe(2);
    expect(ancestors.has('1')).toBe(true);
    expect(ancestors.has('1.1')).toBe(true);
    expect(ancestors.has('1.1.1')).toBe(false); // Target itself not included
  });

  it('computeAncestorNumbers returns empty set for root domain', () => {
    const tree = createMockDomainTree();
    const ancestors = computeAncestorNumbers(tree, '1');

    expect(ancestors.size).toBe(0);
  });

  it('computeAncestorNumbers returns all ancestors for deeply nested domain', () => {
    const tree = createMockDomainTree();
    const ancestors = computeAncestorNumbers(tree, '1.1.3.1');

    expect(ancestors.size).toBe(3);
    expect(ancestors.has('1')).toBe(true);
    expect(ancestors.has('1.1')).toBe(true);
    expect(ancestors.has('1.1.3')).toBe(true);
    expect(ancestors.has('1.1.3.1')).toBe(false);
  });

  it('computeAncestorNumbers returns empty set for non-existent domain', () => {
    const tree = createMockDomainTree();
    const ancestors = computeAncestorNumbers(tree, '99.99');

    expect(ancestors.size).toBe(0);
  });

  // --- Callback Behavior Tests ---

  it('onClose callback is callable', () => {
    const onClose = vi.fn();
    const props: SemanticDomainViewerProps = {
      selectedDomainNumber: '1.1.1',
      domainTree: createMockDomainTree(),
      onClose,
      onNavigateToWord: () => {},
    };

    props.onClose();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('onNavigateToWord callback receives correct term', () => {
    const onNavigateToWord = vi.fn();
    const props: SemanticDomainViewerProps = {
      selectedDomainNumber: '1.1.1',
      domainTree: createMockDomainTree(),
      onClose: () => {},
      onNavigateToWord,
    };

    props.onNavigateToWord('sun');
    expect(onNavigateToWord).toHaveBeenCalledWith('sun');
  });

  it('onNavigateToWord callback called with different terms', () => {
    const onNavigateToWord = vi.fn();
    const props: SemanticDomainViewerProps = {
      selectedDomainNumber: '1.1.1',
      domainTree: createMockDomainTree(),
      onClose: () => {},
      onNavigateToWord,
    };

    props.onNavigateToWord('sun');
    props.onNavigateToWord('light');
    props.onNavigateToWord('moon');

    expect(onNavigateToWord).toHaveBeenCalledTimes(3);
    expect(onNavigateToWord).toHaveBeenNthCalledWith(1, 'sun');
    expect(onNavigateToWord).toHaveBeenNthCalledWith(2, 'light');
    expect(onNavigateToWord).toHaveBeenNthCalledWith(3, 'moon');
  });

  // --- Tree Structure Tests ---

  it('domain tree words are accessible on leaf nodes', () => {
    const tree = createMockDomainTree();
    const sunDomain = findDomainByNumber(tree, '1.1.1');

    expect(sunDomain?.words).toHaveLength(2);
    expect(sunDomain?.words?.[0].lemma).toBe('helios');
    expect(sunDomain?.words?.[0].term).toBe('sun');
    expect(sunDomain?.words?.[1].lemma).toBe('phos');
    expect(sunDomain?.words?.[1].term).toBe('light');
  });

  it('domain without words has empty or undefined words array', () => {
    const tree = createMockDomainTree();
    const landDomain = findDomainByNumber(tree, '1.2.1');

    // Domain created without words field (undefined) or empty
    expect(!landDomain?.words || landDomain.words.length === 0).toBe(true);
  });

  // --- Breadcrumb Navigation Logic Tests ---

  it('breadcrumb path changes when navigating to sibling domain', () => {
    const tree = createMockDomainTree();

    const pathToSun = computeBreadcrumbPath(tree, '1.1.1');
    const pathToMoon = computeBreadcrumbPath(tree, '1.1.2');

    expect(pathToSun).toHaveLength(3);
    expect(pathToMoon).toHaveLength(3);

    // First two items in path are the same (shared ancestors)
    expect(pathToSun[0]).toEqual(pathToMoon[0]);
    expect(pathToSun[1]).toEqual(pathToMoon[1]);

    // Last item differs
    expect(pathToSun[2].number).toBe('1.1.1');
    expect(pathToMoon[2].number).toBe('1.1.2');
  });

  it('breadcrumb path completely different for different root branches', () => {
    const tree = createMockDomainTree();

    const pathToSky = computeBreadcrumbPath(tree, '1.1');
    const pathToBody = computeBreadcrumbPath(tree, '2.1');

    expect(pathToSky[0].number).toBe('1');
    expect(pathToBody[0].number).toBe('2');
  });

  // --- Auto-expand Tests ---

  it('auto-expand computes correct initial expansion for mid-level domain', () => {
    const tree = createMockDomainTree();
    const ancestors = computeAncestorNumbers(tree, '1.2.1');

    expect(ancestors.size).toBe(2);
    expect(ancestors.has('1')).toBe(true);
    expect(ancestors.has('1.2')).toBe(true);
  });

  it('selecting a new domain adds its ancestors to expanded set', () => {
    const tree = createMockDomainTree();

    // Initially expanded for 1.1.1
    const initialAncestors = computeAncestorNumbers(tree, '1.1.1');
    expect(initialAncestors.has('1')).toBe(true);
    expect(initialAncestors.has('1.1')).toBe(true);

    // Switch to 1.2.1 - need to add 1.2 to expanded
    const newAncestors = computeAncestorNumbers(tree, '1.2.1');
    const merged = new Set([...initialAncestors, ...newAncestors]);

    expect(merged.has('1')).toBe(true);
    expect(merged.has('1.1')).toBe(true);
    expect(merged.has('1.2')).toBe(true);
  });
});
