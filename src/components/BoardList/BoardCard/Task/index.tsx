import { useParams } from 'react-router-dom';
import { BoardWrapper, Column, ColumnTitle, Select, TaskCard, Textarea } from './Task.styles';
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
      priority: '',
      status: 'Open',
    }
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextId, setNextId] = useSetNextId(1);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [selected, setSelected] = useState('high')

  const handleCreateTask = () => {
    if (taskName && taskDescription) {
      const newTask = {
        id: nextId,
        date: getCurrentDate(),
        name: taskName,
        description: taskDescription,
        priority: selected,
        status: 'Open',
      };

      setTasks([...tasks, newTask]);
      setNextId();
      setIsModalOpen(false);
      setTaskName('');
      setTaskDescription('');
      setSelected('high');
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
              <p>{task.id + 1}. {task.name}</p>
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
              <Textarea
                placeholder="Описание задачи"
                value={taskDescription}
                onChange={(event) => setTaskDescription(event.target.value)}
                required
              ></Textarea>
              <Select value={selected} onChange={event => setSelected(event.target.value)}>
                <option value="high">Высокий приоритет</option>
                <option value="middle">Средний приоритет</option>
                <option value="low">Низкий приоритет</option>
              </Select>
              <Wrapper>
                <Button type="button" onClick={handleCreateTask}>Создать</Button>
                <Button onClick={closeCreateTaskModal}>Отмена</Button>
              </Wrapper>
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
