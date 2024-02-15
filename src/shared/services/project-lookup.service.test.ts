import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { filterProjectsMetadata } from '@shared/services/project-lookup.service';
import { ProjectMetadataFilterOptions } from './project-lookup.service-model';

describe('filterProjectsMetadata', () => {
  test('should return a shallow clone if there are no filters', () => {
    const projectsMetadata: ProjectMetadata[] = [
      { id: 'asdf', name: 'fdsa', projectType: 'helloWorld', storageType: 'qwer' },
      { id: 'asdfg', name: 'fdsag', projectType: 'ParatextStandard', storageType: 'qwert' },
      { id: 'asdfgh', name: 'fdsagh', projectType: 'platform.placeholder', storageType: 'qwerty' },
    ];

    const options: ProjectMetadataFilterOptions = {};

    const filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata).not.toBe(projectsMetadata);
    expect(filteredMetadata).toEqual(projectsMetadata);
  });

  test('should remove ids matching excludeProjectIds', () => {
    const projectsMetadata: ProjectMetadata[] = [
      { id: 'asdf', name: 'fdsa', projectType: 'helloWorld', storageType: 'qwer' },
      { id: 'asdfg', name: 'fdsag', projectType: 'ParatextStandard', storageType: 'qwert' },
      { id: 'asdfgh', name: 'fdsagh', projectType: 'platform.placeholder', storageType: 'qwerty' },
    ];

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

    // Precedence over includeProjectTypes

    options = {
      excludeProjectIds: ['asdf', 'asdfg'],
      includeProjectTypes: ['^ParatextStandard$', '^platform\\.placeholder$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should remove ids matching excludeProjectTypes', () => {
    const projectsMetadata: ProjectMetadata[] = [
      { id: 'asdf', name: 'fdsa', projectType: 'helloWorld', storageType: 'qwer' },
      { id: 'asdfg', name: 'fdsag', projectType: 'ParatextStandard', storageType: 'qwert' },
      { id: 'asdfgh', name: 'fdsagh', projectType: 'platform.placeholder', storageType: 'qwerty' },
    ];

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

    // Precedence over includeProjectTypes

    options = {
      excludeProjectTypes: 'Paratext',
      includeProjectTypes: ['^ParatextStandard$', '^platform\\.placeholder$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });

  test('should include only ids matching includeProjectTypes', () => {
    const projectsMetadata: ProjectMetadata[] = [
      { id: 'asdf', name: 'fdsa', projectType: 'helloWorld', storageType: 'qwer' },
      { id: 'asdfg', name: 'fdsag', projectType: 'ParatextStandard', storageType: 'qwert' },
      { id: 'asdfgh', name: 'fdsagh', projectType: 'platform.placeholder', storageType: 'qwerty' },
    ];

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

    // Precedence over includeProjectTypes

    options = {
      excludeProjectTypes: 'Paratext',
      includeProjectTypes: ['^ParatextStandard$', '^platform\\.placeholder$'],
    };

    filteredMetadata = filterProjectsMetadata(projectsMetadata, options);

    expect(filteredMetadata.length).toEqual(1);
  });
});
