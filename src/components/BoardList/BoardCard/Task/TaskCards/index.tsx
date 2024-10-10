import { TaskCard } from '../Task.styles';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ChangeModalCard } from './ChangeModalCard';
import { TaskStatus } from '../TaskColumn';

interface TaskCardProps {
  task: {
    id: number,
    date: string,
    name: string,
    description: string,
    status: string,
    priority: string,
    mark?: string
  };
  tasks: {
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    status: TaskStatus | string,
    mark?: string
  }[];
  setFilteredTasks: Dispatch<SetStateAction<{
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    status: string,
    mark: string }[]>>;
  setTasks: Dispatch<SetStateAction<{
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    status: string,
    mark: string }[]>>
}

export const TaskCards: FC<TaskCardProps> = ({ task, tasks, setFilteredTasks, setTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <TaskCard onClick={openModal} key={task.id}>
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
      <ChangeModalCard isOpen={isOpen} task={task} tasks={tasks} onClose={closeModal} taskId={task.id} setFilteredTasks={setFilteredTasks} setTasks={setTasks}  />
    </>
  );
};
