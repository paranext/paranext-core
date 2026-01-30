import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { ChevronDown } from 'lucide-react';
import type { InterlinearTaskType } from '../../types/interlinear-setup.types';

export interface CreateTaskMenuProps {
  /** The current project name to display in menu items */
  projectName: string;
  /** Callback when a task type is selected */
  onSelectTaskType: (taskType: InterlinearTaskType) => void;
  /** Whether the menu is disabled */
  disabled?: boolean;
}

/** Menu item configuration for each task type */
interface TaskMenuItem {
  taskType: InterlinearTaskType;
  getLabel: (projectName: string) => string;
}

const TASK_MENU_ITEMS: TaskMenuItem[] = [
  {
    taskType: 'Glossing',
    getLabel: (projectName) => `Create glosses for ${projectName} based on a model text`,
  },
  {
    taskType: 'GlossingWithoutModel',
    getLabel: (projectName) => `Create glosses for ${projectName} with no model text`,
  },
  {
    taskType: 'BackTranslation',
    getLabel: (projectName) => `Create a back translation of ${projectName}`,
  },
  {
    taskType: 'Adaptation',
    getLabel: (projectName) => `Create adaptation/revision of ${projectName}`,
  },
];

/**
 * CreateTaskMenu provides a dropdown menu for creating new interlinear tasks. Displays 4 task type
 * options with the project name interpolated.
 */
export function CreateTaskMenu({
  projectName,
  onSelectTaskType,
  disabled = false,
}: CreateTaskMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled} className="tw-gap-2">
          Create
          <ChevronDown className="tw-h-4 tw-w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="tw-w-80">
        {TASK_MENU_ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.taskType}
            onClick={() => onSelectTaskType(item.taskType)}
            className="tw-cursor-pointer"
          >
            {item.getLabel(projectName)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CreateTaskMenu;
