import { TaskCard } from '../Task.styles';
import { FC } from 'react';

interface TaskCardProps {
  task: {
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    mark?: string
  }
}

export const TaskCards: FC<TaskCardProps> = ({ task }) => {
  return (
    <TaskCard key={task.id}>
      <p>{task.date}</p>
      <p>{task.id + 1}. {task.name}</p>
      {task.priority === 'high'
        ? <p style={{ color: '#FF0000' }}>#{task.mark}</p>
        : task.priority === 'middle'
          ? <p style={{ color: '#FFA500' }}>#{task.mark}</p>
          : task.priority === 'low'
            ? <p style={{ color: '#008000' }}>#{task.mark}</p>
            : <p>#{task.mark}</p>
      }
    </TaskCard>
  );
};
