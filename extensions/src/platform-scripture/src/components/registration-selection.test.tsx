import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import {
  RegistrationSelectionControl,
  determineRegistrationState,
  sharesProjectLicenseWithParent,
  needOwnProjectLicense,
  isNotRegisteredType,
  getProjectTypeDisplayName,
  type ProjectType,
  type ProjectReference,
  type RegistrationInfo,
} from './registration-selection.component';

// =====================================================
// Helper Function Tests
// =====================================================

describe('sharesProjectLicenseWithParent', () => {
  it('should return true for BackTranslation', () => {
    expect(sharesProjectLicenseWithParent('BackTranslation')).toBe(true);
  });

  it('should return true for Auxiliary', () => {
    expect(sharesProjectLicenseWithParent('Auxiliary')).toBe(true);
  });

  it('should return true for TransliterationManual', () => {
    expect(sharesProjectLicenseWithParent('TransliterationManual')).toBe(true);
  });

  it('should return true for TransliterationWithEncoder', () => {
    expect(sharesProjectLicenseWithParent('TransliterationWithEncoder')).toBe(true);
  });

  it('should return false for Standard', () => {
    expect(sharesProjectLicenseWithParent('Standard')).toBe(false);
  });

  it('should return false for Daughter', () => {
    expect(sharesProjectLicenseWithParent('Daughter')).toBe(false);
  });

  it('should return false for StudyBibleAdditions', () => {
    expect(sharesProjectLicenseWithParent('StudyBibleAdditions')).toBe(false);
  });

  it('should return false for ConsultantNotes', () => {
    expect(sharesProjectLicenseWithParent('ConsultantNotes')).toBe(false);
  });
});

describe('needOwnProjectLicense', () => {
  it('should return true for Standard', () => {
    expect(needOwnProjectLicense('Standard')).toBe(true);
  });

  it('should return true for Daughter', () => {
    expect(needOwnProjectLicense('Daughter')).toBe(true);
  });

  it('should return true for StudyBibleAdditions', () => {
    expect(needOwnProjectLicense('StudyBibleAdditions')).toBe(true);
  });

  it('should return true for XmlResource', () => {
    expect(needOwnProjectLicense('XmlResource')).toBe(true);
  });

  it('should return true for XmlDictionary', () => {
    expect(needOwnProjectLicense('XmlDictionary')).toBe(true);
  });

  it('should return false for BackTranslation', () => {
    expect(needOwnProjectLicense('BackTranslation')).toBe(false);
  });

  it('should return false for Auxiliary', () => {
    expect(needOwnProjectLicense('Auxiliary')).toBe(false);
  });

  it('should return false for ConsultantNotes', () => {
    expect(needOwnProjectLicense('ConsultantNotes')).toBe(false);
  });
});

describe('isNotRegisteredType', () => {
  it('should return true for ConsultantNotes', () => {
    expect(isNotRegisteredType('ConsultantNotes')).toBe(true);
  });

  it('should return false for Standard', () => {
    expect(isNotRegisteredType('Standard')).toBe(false);
  });

  it('should return false for BackTranslation', () => {
    expect(isNotRegisteredType('BackTranslation')).toBe(false);
  });
});

describe('getProjectTypeDisplayName', () => {
  it('should return display name for Standard', () => {
    expect(getProjectTypeDisplayName('Standard')).toBe('Standard Translation');
  });

  it('should return display name for BackTranslation', () => {
    expect(getProjectTypeDisplayName('BackTranslation')).toBe('Back Translation');
  });

  it('should return display name for ConsultantNotes', () => {
    expect(getProjectTypeDisplayName('ConsultantNotes')).toBe('Consultant Notes');
  });
});

// =====================================================
// determineRegistrationState Tests
// =====================================================

describe('determineRegistrationState', () => {
  const registeredBase: ProjectReference = {
    guid: 'base-guid-123',
    shortName: 'BASE',
    fullName: 'Base Project',
    isRegistered: true,
  };

  const unregisteredBase: ProjectReference = {
    guid: 'base-guid-456',
    shortName: 'UNREG',
    fullName: 'Unregistered Base',
    isRegistered: false,
  };

  const registration: RegistrationInfo = {
    registryId: 'reg-123',
    visibility: 'Test',
    licenseName: 'Test License',
  };

  describe('NotSelected state', () => {
    it('should return NotSelected when projectType is undefined', () => {
      expect(determineRegistrationState(undefined, undefined, undefined)).toBe('NotSelected');
    });

    it('should return NotSelected when projectType is "NotSelected"', () => {
      expect(determineRegistrationState('NotSelected', undefined, undefined)).toBe('NotSelected');
    });
  });

  describe('NotRegisteredType state', () => {
    it('should return NotRegisteredType for ConsultantNotes', () => {
      expect(determineRegistrationState('ConsultantNotes', undefined, undefined)).toBe(
        'NotRegisteredType',
      );
    });
  });

  describe('Registered state', () => {
    it('should return Registered when currentRegistration is provided', () => {
      expect(determineRegistrationState('Standard', undefined, registration)).toBe('Registered');
    });

    it('should return Registered for any type when registration exists', () => {
      expect(determineRegistrationState('BackTranslation', registeredBase, registration)).toBe(
        'Registered',
      );
    });
  });

  describe('InheritsRegistered state', () => {
    it('should return InheritsRegistered for BackTranslation with registered base', () => {
      expect(determineRegistrationState('BackTranslation', registeredBase, undefined)).toBe(
        'InheritsRegistered',
      );
    });

    it('should return InheritsRegistered for Auxiliary with registered base', () => {
      expect(determineRegistrationState('Auxiliary', registeredBase, undefined)).toBe(
        'InheritsRegistered',
      );
    });

    it('should return InheritsRegistered for TransliterationManual with registered base', () => {
      expect(determineRegistrationState('TransliterationManual', registeredBase, undefined)).toBe(
        'InheritsRegistered',
      );
    });

    it('should return InheritsRegistered for TransliterationWithEncoder with registered base', () => {
      expect(
        determineRegistrationState('TransliterationWithEncoder', registeredBase, undefined),
      ).toBe('InheritsRegistered');
    });
  });

  describe('InheritsUnregistered state', () => {
    it('should return InheritsUnregistered for BackTranslation with unregistered base', () => {
      expect(determineRegistrationState('BackTranslation', unregisteredBase, undefined)).toBe(
        'InheritsUnregistered',
      );
    });

    it('should return InheritsUnregistered for Auxiliary with unregistered base', () => {
      expect(determineRegistrationState('Auxiliary', unregisteredBase, undefined)).toBe(
        'InheritsUnregistered',
      );
    });

    it('should return InheritsUnregistered when base project is undefined', () => {
      expect(determineRegistrationState('BackTranslation', undefined, undefined)).toBe(
        'InheritsUnregistered',
      );
    });
  });

  describe('CanRegister state', () => {
    it('should return CanRegister for Standard with internet available', () => {
      expect(determineRegistrationState('Standard', undefined, undefined, true, true)).toBe(
        'CanRegister',
      );
    });

    it('should return CanRegister for Daughter with internet available', () => {
      expect(determineRegistrationState('Daughter', registeredBase, undefined, true, true)).toBe(
        'CanRegister',
      );
    });

    it('should return CanRegister for StudyBibleAdditions with internet available', () => {
      expect(
        determineRegistrationState('StudyBibleAdditions', registeredBase, undefined, true, true),
      ).toBe('CanRegister');
    });
  });

  describe('OfflineMigration state', () => {
    it('should return OfflineMigration for Standard without internet', () => {
      expect(determineRegistrationState('Standard', undefined, undefined, false, true)).toBe(
        'OfflineMigration',
      );
    });

    it('should return OfflineMigration when registry server unavailable', () => {
      expect(determineRegistrationState('Standard', undefined, undefined, false, false)).toBe(
        'OfflineMigration',
      );
    });

    it('should return OfflineMigration for Daughter without internet', () => {
      expect(determineRegistrationState('Daughter', registeredBase, undefined, true, false)).toBe(
        'OfflineMigration',
      );
    });
  });
});

// =====================================================
// RegistrationSelectionControl Component Tests
// =====================================================

describe('RegistrationSelectionControl', () => {
  const defaultProps = {
    isNewProject: true,
  };

  const registeredBase: ProjectReference = {
    guid: 'base-guid-123',
    shortName: 'BASE',
    fullName: 'Base Project',
    isRegistered: true,
  };

  const unregisteredBase: ProjectReference = {
    guid: 'base-guid-456',
    shortName: 'UNREG',
    fullName: 'Unregistered Base',
    isRegistered: false,
  };

  const registration: RegistrationInfo = {
    registryId: 'reg-123',
    visibility: 'Test',
    licenseName: 'Test License',
  };

  describe('NotSelected state rendering', () => {
    it('should render NotSelected message when project type is undefined', () => {
      render(<RegistrationSelectionControl {...defaultProps} />);

      expect(
        screen.getByText('Project type must be selected before registration.'),
      ).toBeInTheDocument();
    });

    it('should render NotSelected message when project type is NotSelected', () => {
      render(<RegistrationSelectionControl {...defaultProps} projectType="NotSelected" />);

      expect(
        screen.getByText('Project type must be selected before registration.'),
      ).toBeInTheDocument();
    });
  });

  describe('InheritsRegistered state rendering', () => {
    it('should render inherits registered message for BackTranslation with registered base', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="BackTranslation"
          baseProject={registeredBase}
        />,
      );

      expect(
        screen.getByText(
          'Registered. This type of project inherits registration from its base project.',
        ),
      ).toBeInTheDocument();
    });
  });

  describe('InheritsUnregistered state rendering', () => {
    it('should render inherits unregistered message for BackTranslation with unregistered base', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="BackTranslation"
          baseProject={unregisteredBase}
        />,
      );

      expect(
        screen.getByText(
          'Unregistered. This type of project inherits registration from its base project.',
        ),
      ).toBeInTheDocument();
    });
  });

  describe('NotRegisteredType state rendering', () => {
    it('should render not registered type message for ConsultantNotes', () => {
      render(<RegistrationSelectionControl {...defaultProps} projectType="ConsultantNotes" />);

      expect(
        screen.getByText(
          'Consultant Notes projects are not registered with the Paratext Registry.',
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Registered state rendering', () => {
    it('should render registered status with visibility badge and manage link', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          currentRegistration={registration}
        />,
      );

      expect(screen.getByText('Registered.')).toBeInTheDocument();
      expect(screen.getByText('(Test)')).toBeInTheDocument();
      expect(screen.getByText('Manage registration...')).toBeInTheDocument();
    });

    it('should render Confidential visibility badge', () => {
      const confidentialReg: RegistrationInfo = {
        ...registration,
        visibility: 'Confidential',
      };

      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          currentRegistration={confidentialReg}
        />,
      );

      expect(screen.getByText('(Confidential)')).toBeInTheDocument();
    });

    it('should not render visibility badge for Public', () => {
      const publicReg: RegistrationInfo = {
        ...registration,
        visibility: 'Public',
      };

      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          currentRegistration={publicReg}
        />,
      );

      expect(screen.getByText('Registered.')).toBeInTheDocument();
      expect(screen.queryByText('(Test)')).not.toBeInTheDocument();
      expect(screen.queryByText('(Confidential)')).not.toBeInTheDocument();
      expect(screen.queryByText('(Public)')).not.toBeInTheDocument();
    });

    it('should call onManageClick when manage link is clicked', () => {
      const onManageClick = vi.fn();

      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          currentRegistration={registration}
          onManageClick={onManageClick}
        />,
      );

      fireEvent.click(screen.getByText('Manage registration...'));
      expect(onManageClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('CanRegister state rendering', () => {
    it('should render Register button for Standard type', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable
          internetAvailable
        />,
      );

      expect(screen.getByRole('button', { name: /Register online/i })).toBeInTheDocument();
    });

    it('should call onRegisterClick when Register button is clicked', () => {
      const onRegisterClick = vi.fn();

      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable
          internetAvailable
          onRegisterClick={onRegisterClick}
        />,
      );

      fireEvent.click(screen.getByRole('button', { name: /Register online/i }));
      expect(onRegisterClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('OfflineMigration state rendering', () => {
    it('should render offline migration checkbox when no internet', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable={false}
          internetAvailable={false}
        />,
      );

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText(/I do not have access to the Internet/i)).toBeInTheDocument();
    });

    it('should show checkbox as unchecked by default', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable={false}
        />,
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should show checkbox as checked when offlineConfirmed is true', () => {
      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable={false}
          offlineConfirmed
        />,
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should call onOfflineConfirmChange when checkbox is clicked', () => {
      const onOfflineConfirmChange = vi.fn();

      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable={false}
          onOfflineConfirmChange={onOfflineConfirmChange}
        />,
      );

      fireEvent.click(screen.getByRole('checkbox'));
      expect(onOfflineConfirmChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Localized strings', () => {
    it('should use localized strings when provided', () => {
      const localizedStrings = {
        '%registration_not_selected%': 'Seleccione un tipo de proyecto primero.',
      };

      render(
        <RegistrationSelectionControl {...defaultProps} localizedStrings={localizedStrings} />,
      );

      expect(screen.getByText('Seleccione un tipo de proyecto primero.')).toBeInTheDocument();
    });

    it('should use localized visibility labels', () => {
      const localizedStrings = {
        '%registration_visibility_test%': '(Prueba)',
      };

      render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          currentRegistration={registration}
          localizedStrings={localizedStrings}
        />,
      );

      expect(screen.getByText('(Prueba)')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to container', () => {
      const { container } = render(
        <RegistrationSelectionControl {...defaultProps} className="custom-class" />,
      );

      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('State updates on props change', () => {
    it('should update state when projectType changes', () => {
      const { rerender } = render(
        <RegistrationSelectionControl {...defaultProps} projectType={undefined} />,
      );

      expect(
        screen.getByText('Project type must be selected before registration.'),
      ).toBeInTheDocument();

      rerender(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="Standard"
          registryServerAvailable
          internetAvailable
        />,
      );

      expect(screen.getByRole('button', { name: /Register online/i })).toBeInTheDocument();
    });

    it('should update state when baseProject changes', () => {
      const { rerender } = render(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="BackTranslation"
          baseProject={undefined}
        />,
      );

      expect(
        screen.getByText(
          'Unregistered. This type of project inherits registration from its base project.',
        ),
      ).toBeInTheDocument();

      rerender(
        <RegistrationSelectionControl
          {...defaultProps}
          projectType="BackTranslation"
          baseProject={registeredBase}
        />,
      );

      expect(
        screen.getByText(
          'Registered. This type of project inherits registration from its base project.',
        ),
      ).toBeInTheDocument();
    });
  });
});

// =====================================================
// Registration Rules by Project Type (BHV-017)
// =====================================================

describe('Registration Rules by Project Type (BHV-017)', () => {
  const registeredBase: ProjectReference = {
    guid: 'base-guid',
    shortName: 'BASE',
    fullName: 'Base Project',
    isRegistered: true,
  };

  // Types that require own registration
  const ownRegistrationTypes: ProjectType[] = ['Standard', 'Daughter', 'StudyBibleAdditions'];
  it.each(ownRegistrationTypes)('%s should require own registration', (type) => {
    const state = determineRegistrationState(type, registeredBase, undefined, true, true);
    expect(state).toBe('CanRegister');
  });

  // Types that inherit from base
  const inheritsTypes: ProjectType[] = [
    'BackTranslation',
    'Auxiliary',
    'TransliterationManual',
    'TransliterationWithEncoder',
  ];
  it.each(inheritsTypes)('%s should inherit registration from base', (type) => {
    const state = determineRegistrationState(type, registeredBase, undefined, true, true);
    expect(state).toBe('InheritsRegistered');
  });

  // Types that are never registered
  it('ConsultantNotes should never be registered', () => {
    const state = determineRegistrationState('ConsultantNotes', undefined, undefined, true, true);
    expect(state).toBe('NotRegisteredType');
  });
});

// =====================================================
// Accessibility Tests
// =====================================================

describe('Accessibility', () => {
  it('should have accessible checkbox with label', () => {
    render(
      <RegistrationSelectionControl
        projectType="Standard"
        isNewProject
        registryServerAvailable={false}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'offline-migration');
    expect(checkbox).toHaveAttribute('aria-describedby', 'offline-migration-label');
  });

  it('should have keyboard-accessible buttons', () => {
    render(
      <RegistrationSelectionControl
        projectType="Standard"
        isNewProject
        registryServerAvailable
        internetAvailable
      />,
    );

    const button = screen.getByRole('button', { name: /Register online/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });
});
