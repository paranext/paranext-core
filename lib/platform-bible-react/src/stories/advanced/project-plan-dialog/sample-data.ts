import type {
  OrgProvidedPlan,
  PlanStage,
  PlanTask,
  ProjectPlan,
} from '@/components/advanced/project-plan-dialog';

const task = (
  id: string,
  name: string,
  overrides: Partial<PlanTask> = {},
): PlanTask => ({
  id,
  name,
  description: '',
  markComplete: 'by-chapter',
  taskStart: 'after-previous-task-on-same-book',
  requiresEditing: 'no',
  effort: { easiest: 10, easy: 8, moderate: 5, difficult: 3 },
  bookCountsByDifficulty: { easiest: 7, easy: 18, moderate: 22, difficult: 19 },
  ...overrides,
});

const stage = (id: string, name: string, tasks: PlanTask[]): PlanStage => ({
  id,
  name,
  description: '',
  tasks,
});

export const SAMPLE_ORG_PLANS: OrgProvidedPlan[] = [
  {
    id: 'sil-compact',
    name: 'SIL Compact',
    version: '1.0.0',
    stages: [
      stage('s-draft', 'Drafting', [
        task('t-draft-1', 'First draft'),
        task('t-draft-2', 'Self-check'),
      ]),
      stage('s-team', 'Team check', [
        task('t-team-1', 'Team review'),
        task('t-team-2', 'Reading comprehension'),
      ]),
      stage('s-consultant', 'Consultant check', [
        task('t-consult-1', 'Consultant review'),
      ]),
    ],
    checks: [
      { checkId: 'basic.markers', notifyOnlyInStage: 's-draft', requiredInStage: 's-team' },
      { checkId: 'basic.punctuation', notifyOnlyInStage: 's-draft', requiredInStage: 's-team' },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: 's-draft',
        requiredInStage: 's-consultant',
      },
    ],
  },
  {
    id: 'sil-comprehensive',
    name: 'SIL Comprehensive',
    version: '2.1.0',
    stages: [
      stage('s-c-prep', 'Preparation', [task('t-c-prep-1', 'Background study')]),
      stage('s-c-draft', 'Drafting', [
        task('t-c-draft-1', 'First draft'),
        task('t-c-draft-2', 'Second draft'),
        task('t-c-draft-3', 'Self-check'),
      ]),
      stage('s-c-team', 'Team check', [task('t-c-team-1', 'Team review')]),
      stage('s-c-back', 'Back translation', [task('t-c-back-1', 'Back translate')]),
      stage('s-c-consult', 'Consultant', [task('t-c-consult-1', 'Consultant review')]),
      stage('s-c-publish', 'Publishing', [task('t-c-publish-1', 'Final read-through')]),
    ],
    checks: [],
  },
  {
    id: 'eten-quickstart',
    name: 'ETEN Quickstart',
    version: '0.3.0',
    stages: [
      stage('s-q-1', 'Draft', [task('t-q-1', 'Draft text')]),
      stage('s-q-2', 'Review', [task('t-q-2', 'Review and finalize')]),
    ],
    checks: [],
  },
];

export const SAMPLE_PROJECT_PLAN: ProjectPlan = {
  id: 'project-plan-1',
  name: 'SIL Compact',
  basePlanRef: 'sil-compact',
  stages: structuredClone(SAMPLE_ORG_PLANS[0].stages),
  checks: structuredClone(SAMPLE_ORG_PLANS[0].checks),
};

export const EMPTY_PROJECT_PLAN: ProjectPlan = {
  id: 'project-plan-empty',
  name: 'Untitled',
  stages: [],
  checks: [],
};

export const CUSTOM_PROJECT_PLAN: ProjectPlan = {
  id: 'project-plan-custom',
  name: 'Acme Custom',
  stages: [
    stage('cust-s1', 'Pre-translation', [
      task('cust-t1', 'Exegetical study'),
      task('cust-t2', 'Key terms research'),
    ]),
    stage('cust-s2', 'Translation', [task('cust-t3', 'Initial draft')]),
  ],
  checks: [],
};
