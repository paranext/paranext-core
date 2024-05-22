import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { filterProjectsMetadata } from '@shared/services/project-lookup.service';
import { ProjectMetadataFilterOptions } from '../models/project-lookup.service-model';

describe('filterProjectsMetadata', () => {
  const projectsMetadata: ProjectMetadata[] = [
    { id: 'asdf', name: 'fdsa', projectType: 'helloWorld' },
    { id: 'asdfg', name: 'fdsag', projectType: 'ParatextStandard' },
    { id: 'asdfgh', name: 'fdsagh', projectType: 'platform.placeholder' },
  ];

  test('should return a shallow clone if there are no filters', () => {
    const options: ProjectMetadataFilterOptions = {};

    const filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata).not.toBe(projectsMetadata);
    expect(filteredMetadata).toEqual(projectsMetadata);
  });

  test('should remove ids matching excludeProjectIds', () => {
    // Single string

    let options: ProjectMetadataFilterOptions = {
      excludeProjectIds: 'asdf',
    };

    let filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Multiple strings

    options = {
      excludeProjectIds: ['asdf', 'asdfg'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Still excludes even if includeProjectTypes includes

    options = {
      excludeProjectIds: ['asdf', 'asdfg'],
      includeProjectTypes: ['^ParatextStandard$', '^platform\\.placeholder$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should remove ids matching excludeProjectTypes', () => {
    // Single RegExp that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      excludeProjectTypes: '^helloWorld$',
    };

    let filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // Single RegExp that loosely matches all projects

    options = {
      excludeProjectTypes: 'd',
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(0);

    // Multiple RegExps that match two project types

    options = {
      excludeProjectTypes: ['^helloWorld$', '^ParatextStandard$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Still excludes even if includeProjectTypes includes

    options = {
      excludeProjectTypes: 'Paratext',
      includeProjectTypes: ['^ParatextStandard$', '^platform\\.placeholder$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should include only ids matching includeProjectTypes', () => {
    // Single RegExp that exact matches one project

    let options: ProjectMetadataFilterOptions = {
      includeProjectTypes: '^helloWorld$',
    };

    let filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);

    // Single RegExp that loosely matches all projects

    options = {
      includeProjectTypes: 'd',
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata).toEqual(projectsMetadata);

    // Multiple RegExps that match two project types

    options = {
      includeProjectTypes: ['^helloWorld$', '^ParatextStandard$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(2);

    // excludeProjectTypes excludes even if this includes

    options = {
      excludeProjectTypes: 'Paratext',
      includeProjectTypes: ['^ParatextStandard$', '^platform\\.placeholder$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });
});
