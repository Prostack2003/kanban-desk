import React, { Dispatch, FC, SetStateAction } from 'react';
import { Column, ColumnTitle } from '../Task.styles';
import { TaskCards } from '../../../../../components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

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
    mark: string
  }[],
  setTasks: Dispatch<SetStateAction<{
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    status: string,
    mark: string }[]>>
}

export const TaskColumn: FC<TaskColumnProps> = ({ title, tasks, setTasks }) => {
  // Фильтруем задачи для текущей колонки
  const columnTasks = tasks.filter(task => task.status.toLowerCase() === title.toLowerCase());

  return (
      <Droppable droppableId={title.toLowerCase()}>
        {provided => (
            <Column
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
              <ColumnTitle>{title}</ColumnTitle>
              {columnTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                          <TaskCards task={task} tasks={tasks} setTasks={setTasks}/>
                        </div>
                    )}
                  </Draggable>
              ))}
              {provided.placeholder}
            </Column>
        )}
      </Droppable>
  );
};
