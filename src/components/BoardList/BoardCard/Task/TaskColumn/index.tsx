import React, { FC } from 'react';
import { Column, ColumnTitle } from '../Task.styles';
import { TaskCards } from '../../../../../components';

export type TaskStatus = 'open' | 'in progress' | 'review' | 'done'

interface TaskColumnProps {
  title: string,
  tasks: {
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    status: TaskStatus | string,
    mark?: string
  }[],
  filteredTasks: {
    date: string;
    name: string;
    description: string;
    id: number;
    priority: string;
    mark: string;
    status: string
  }[]
}

export const TaskColumn: FC<TaskColumnProps> = ({ title, filteredTasks }) => {
  return (
    <Column>
      <ColumnTitle>{title}</ColumnTitle>
      {filteredTasks
        .filter((task) => task.status.toLowerCase() === title.toLowerCase())
        .map(task => (
          <TaskCards key={task.id} task={task} />
        ))}
    </Column>
  );
};

