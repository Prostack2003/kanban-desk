import { ChangeEvent } from 'react';

export interface TaskModalProps {
  taskName: string;
  taskDescription: string;
  selectedPriority: string;
  mark: string;
  onTaskNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTaskDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onPriorityChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onMarkChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
