import type {
  OrgProvidedPlan,
  PlanStage,
  PlanTask,
  ProjectPlan,
} from '@/components/advanced/project-plan-dialog';
import { FACTORY_PLANS } from './factory-plans';

const task = (
  id: string,
  name: string,
  overrides: Partial<PlanTask> = {},
): PlanTask => ({
  id,
  names: { en: name },
  descriptions: {},
  markComplete: 'by-chapter',
  taskStart: 'after-previous-task-on-same-book',
  requiresEditing: 'no',
  effort: { easiest: 10, easy: 8, moderate: 5, difficult: 3 },
  bookCountsByDifficulty: { easiest: 7, easy: 18, moderate: 22, difficult: 19 },
  ...overrides,
});

const stage = (id: string, name: string, tasks: PlanTask[]): PlanStage => ({
  id,
  names: { en: name },
  descriptions: {},
  tasks,
});

const ORG_PLANS: OrgProvidedPlan[] = [
  {
    id: 'eten-quickstart',
    name: 'ETEN Quickstart',
    version: '0.3.0',
    kind: 'organization',
    stages: [
      stage('s-q-1', 'Draft', [task('t-q-1', 'Draft text')]),
      stage('s-q-2', 'Review', [task('t-q-2', 'Review and finalize')]),
    ],
    checks: [],
  },
  {
    id: 'acme-translation',
    name: 'Acme Translation Team',
    version: '1.2.0',
    kind: 'organization',
    stages: [
      stage('s-a-1', 'Exegesis', [task('t-a-1', 'Background study')]),
      stage('s-a-2', 'Draft', [
        task('t-a-2a', 'Initial draft'),
        task('t-a-2b', 'Self-revision'),
      ]),
      stage('s-a-3', 'Peer review', [task('t-a-3', 'Peer review')]),
      stage('s-a-4', 'Consultant', [task('t-a-4', 'Consultant check')]),
    ],
    checks: [],
  },
];

export const SAMPLE_ORG_PLANS: OrgProvidedPlan[] = [...FACTORY_PLANS, ...ORG_PLANS];

const DEFAULT_FACTORY_PLAN = FACTORY_PLANS.find((p) => p.name === 'SIL Compact Base Plan') ?? FACTORY_PLANS[0];

export const SAMPLE_PROJECT_PLAN: ProjectPlan = {
  id: 'project-plan-1',
  name: DEFAULT_FACTORY_PLAN.name,
  basePlanRef: DEFAULT_FACTORY_PLAN.id,
  stages: structuredClone(DEFAULT_FACTORY_PLAN.stages),
  checks: structuredClone(DEFAULT_FACTORY_PLAN.checks),
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
