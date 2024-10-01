import { useParams } from 'react-router-dom';
import { BoardWrapper, InputMark, Select } from './Task.styles';
import { Button } from '../../../../elements/Buttons/MainButton/Button.styles';
import { Wrapper } from '../../../../elements/Modal/Modal.styles';
import React, { FC, useState } from 'react';
import { useSetNextId } from '../../../../utils/CustomHooks/useSetNextId';
import { getCurrentDate } from '../../../../utils/functions/getCurrentDate';
import { TaskModal } from '../../../../components';
import { TaskColumn } from '../../../../components';

export const Task:FC = () => {
  const { taskId } = useParams();
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
    {
      id: 1,
      date: '1-10-2024',
      name: 'Карточка Задачи',
      description: 'Описание',
      priority: 'high',
      status: 'in progress',
      mark: 'Метка'
    }
  ];
  const statusCards = ['Open', 'In Progress', 'Review', 'Done'];
  const [statusCard, setStatusCard] = useState<string>('open');
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextId, setNextId] = useSetNextId(1);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [mark, setMark] = useState<string>('');
  const [markSearch, setMarkSearch] = useState<string>('');
  const [selected, setSelected] = useState<string>('high');
  const [selectedPriority, setSelectedPriority] = useState<string>('high');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

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
      setFilteredTasks(updatedTasks);

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

  const applyFilters = () => {
    setFilteredTasks(tasks.filter(task =>
      selectedPriority === task.priority &&
      statusCard === task.status &&
      task.mark.toLowerCase().includes(markSearch.toLowerCase())
    ));
  };

  const removeFilters = () => {
    setFilteredTasks(tasks);
  }

  return (
    <>
      <BoardWrapper>
        <Select onChange={(event) => setStatusCard(event.target.value)}>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </Select>
        <Select onChange={(event) => setSelectedPriority(event.target.value)}>
          <option value="high">High</option>
          <option value="middle">Middle</option>
          <option value="low">Low</option>
        </Select>
        <InputMark
          type="text"
          placeholder="Поиск по метке"
          value={markSearch}
          onChange={(event) => setMarkSearch(event.target.value)}
          required
        />
        <Button onClick={applyFilters}>Применить фильтрацию задач</Button>
        <Button onClick={removeFilters}>Сбросить фильтрацию задач</Button>
      </BoardWrapper>
      <BoardWrapper>
        {statusCards.map((title, index) => (
          (statusCard === title.toLowerCase() || filteredTasks.length === tasks.length) && (
            <TaskColumn key={index} title={title} tasks={tasks} filteredTasks={filteredTasks.filter(task => task.status === title.toLowerCase())} />
          )
        ))}
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
      </BoardWrapper>
      <Wrapper>
        <Button onClick={openCreateTaskModal}>Создать задачу</Button>
      </Wrapper>
    </>
  );
};
