import type { SemanticDomain, BreadcrumbItem } from './semantic-domain-viewer.component';

/** Finds a domain node by its number in the tree. Returns the node if found, undefined otherwise. */
export function findDomainByNumber(
  tree: SemanticDomain[],
  domainNumber: string,
): SemanticDomain | undefined {
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.number === domainNumber) return node;
    if (node.children.length > 0) {
      const found = findDomainByNumber(node.children, domainNumber);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Computes the breadcrumb path from the root to a given domain number. Returns an array of
 * BreadcrumbItem from root to the target domain (inclusive).
 */
export function computeBreadcrumbPath(
  tree: SemanticDomain[],
  domainNumber: string,
): BreadcrumbItem[] {
  const path: BreadcrumbItem[] = [];

  function search(nodes: SemanticDomain[]): boolean {
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      path.push({ number: node.number, name: node.name });

      if (node.number === domainNumber) return true;

      if (node.children.length > 0 && search(node.children)) return true;

      path.pop();
    }
    return false;
  }

  search(tree);
  return path;
}

/**
 * Computes the set of domain numbers that are ancestors of a given domain (i.e., all nodes on the
 * path from root to the target, excluding the target itself).
 */
export function computeAncestorNumbers(tree: SemanticDomain[], domainNumber: string): Set<string> {
  const breadcrumb = computeBreadcrumbPath(tree, domainNumber);
  const ancestors = new Set<string>();
  // All items except the last (the target itself) are ancestors
  for (let i = 0; i < breadcrumb.length - 1; i += 1) {
    ancestors.add(breadcrumb[i].number);
  }
  return ancestors;
}
