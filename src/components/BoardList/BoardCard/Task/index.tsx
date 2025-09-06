import { useParams, useLocation } from 'react-router-dom';
import { Button } from '../../../../elements/Buttons/MainButton/Button.styles';
import { Wrapper } from '../../../../elements/Modal/Modal.styles';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { useSetNextId } from '../../../../utils/CustomHooks/useSetNextId';
import { getCurrentDate } from '../../../../utils/functions/getCurrentDate';
import { TaskModal } from '../../../../components';
import { TaskColumn } from '../../../../components';
import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';
import ErrorBoundary from '../../../../components/ErrorBoundary/ErrorBoundary';

if (typeof window === 'undefined') {
  resetServerContext();
}

type Priority = 'high' | 'middle' | 'low';

export const Task: FC = () => {
  const { taskId } = useParams();
  const location = useLocation();
  const [dndKey, setDndKey] = useState(0);

  const initialTasks = [
    {
      id: 0,
      date: getCurrentDate(),
      name: 'Карточка Задачи',
      description: 'Описание',
      priority: 'high',
      status: 'open',
      mark: 'Метка'
    },
  ];

  const statusCards = ['Open', 'In Progress', 'Review', 'Done'];
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextId, setNextId] = useSetNextId(1);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [mark, setMark] = useState<string>('');
  const [selected, setSelected] = useState<string>('high');

  useEffect(() => {
    setDndKey(prev => prev + 1);
  }, [location.key]); // Используем location.key вместо pathname

  // Используем useCallback для стабильной ссылки на функцию
  const handleOnDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return;
    }

    const draggedTaskId = parseInt(draggableId);
    const draggedTask = tasks.find(task => task.id === draggedTaskId);

    if (draggedTask) {
      const updatedTask = {
        ...draggedTask,
        status: destination.droppableId.toLowerCase()
      };

      const updatedTasks = tasks.map(task =>
          task.id === draggedTaskId ? updatedTask : task
      );

      setTasks(updatedTasks);
    }
  }, [tasks]);

  const handleCreateTask = () => {
    if (taskName && taskDescription) {
      const newTask = {
        id: nextId,
        date: getCurrentDate(),
        name: taskName,
        description: taskDescription,
        priority: selected,
        status: 'open',
        mark: mark
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      setNextId();
      setIsModalOpen(false);
      setTaskName('');
      setTaskDescription('');
      setSelected('high');
      setMark('');
    }
  };

  const openCreateTaskModal = () => setIsModalOpen(true);

  const closeCreateTaskModal = () => {
    setIsModalOpen(false);
    setTaskName('');
    setTaskDescription('');
    setMark('');
  };

  return (
      <ErrorBoundary
          fallback={
            <div>
              <h2>Произошла ошибка при отображении доски задач</h2>
              <Button onClick={() => window.location.reload()}>
                Перезагрузить страницу
              </Button>
            </div>
          }
      >
        <>
          <Wrapper>
            <DragDropContext key={`dnd-context-${dndKey}`} onDragEnd={handleOnDragEnd}>
              {statusCards.map((title) => (
                  <TaskColumn
                      key={`${title}-${dndKey}`}
                      title={title}
                      tasks={tasks}
                      setTasks={setTasks}
                  />
              ))}
            </DragDropContext>

            {isModalOpen && (
                <TaskModal
                    taskName={taskName}
                    taskDescription={taskDescription}
                    selectedPriority={selected}
                    mark={mark}
                    onTaskNameChange={e => setTaskName(e.target.value)}
                    onTaskDescriptionChange={e => setTaskDescription(e.target.value)}
                    onPriorityChange={e => setSelected(e.target.value)}
                    onMarkChange={e => setMark(e.target.value)}
                    onSubmit={handleCreateTask}
                    onCancel={closeCreateTaskModal}
                />
            )}
          </Wrapper>
          <Wrapper>
            <Button onClick={openCreateTaskModal}>Создать задачу</Button>
          </Wrapper>
        </>
      </ErrorBoundary>
  );
};
