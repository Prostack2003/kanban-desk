import { useParams } from 'react-router-dom';
import { BoardWrapper, Column, ColumnTitle, TaskCard } from './Task.styles';
import { Button } from '../../../../elements/Buttons/MainButton/Button.styles';
import { InputModal, ModalContent, ModalOverlay, Wrapper } from '../../../../elements/Modal/Modal.styles';
import React, { useState } from 'react';
import { useSetNextId } from '../../../../utils/CustomHooks/useSetNextId';
import { getCurrentDate } from '../../../../utils/functions/getCurrentDate';

export const Task = () => {
  const { taskId } = useParams();
  const initialTasks = [
    {
      id: 0,
      date: getCurrentDate(),
      name: 'Первая Карточка Задачи',
      description: 'Описание',
      status: 'Open'
    }
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextId, setNextId] = useSetNextId(1);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');

  const handleCreateTask = () => {
    if (taskName && taskDescription) {
      const newTask = {
        id: nextId,
        date: getCurrentDate(),
        name: taskName,
        description: taskDescription,
        status: 'Open',
      };

      setTasks([...tasks, newTask]);
      setNextId();
      setIsModalOpen(false);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const openCreateTaskModal = () => setIsModalOpen(true);

  const closeCreateTaskModal = () => {
    setIsModalOpen(false);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <>
      <BoardWrapper>
        <Column>
          <ColumnTitle>Open</ColumnTitle>
          {tasks.map(task => (
            <TaskCard key={task.id}>
              <p>{task.name}</p>
            </TaskCard>
          ))}
        </Column>

        <Column>
          <ColumnTitle>In Progress</ColumnTitle>
        </Column>

        <Column>
          <ColumnTitle>Review</ColumnTitle>
        </Column>

        <Column>
          <ColumnTitle>Done</ColumnTitle>
        </Column>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <InputModal
                type="text"
                placeholder="Название задачи"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                required
              />
              <textarea
                placeholder="Описание задачи"
                value={taskDescription}
                onChange={(event) => setTaskDescription(event.target.value)}
                required
              ></textarea>
              <select>
                <option value="1">Высокий приоритет</option>
                <option value="2">Средний приоритет</option>
                <option value="3">Низкий приоритет</option>
              </select>
              <button type="button" onClick={handleCreateTask}>ОК</button>
              <button onClick={closeCreateTaskModal}>Отмена</button>
            </ModalContent>
          </ModalOverlay>
        )}
      </BoardWrapper>
      <Wrapper>
        <Button onClick={openCreateTaskModal}>Создать задачу</Button>
      </Wrapper>
    </>
  );
};
