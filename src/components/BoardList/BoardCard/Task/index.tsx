import { useParams } from 'react-router-dom';
import { BoardWrapper, ButtonWrapper, InputMark, Select, SelectSort } from './Task.styles';
import { Button } from '../../../../elements/Buttons/MainButton/Button.styles';
import { Wrapper } from '../../../../elements/Modal/Modal.styles';
import React, { FC, useEffect, useState } from 'react';
import { useSetNextId } from '../../../../utils/CustomHooks/useSetNextId';
import { getCurrentDate } from '../../../../utils/functions/getCurrentDate';
import { TaskModal } from '../../../../components';
import { TaskColumn } from '../../../../components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

type Priority = 'high' | 'middle' | 'low';

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
      name: 'Пример названия карточки 2',
      description: 'Пример описания карточки 2',
      priority: 'high',
      status: 'open',
      mark: 'Пример метки карточки 2'
    },
    {
      id: 2,
      date: '2-10-2024',
      name: 'Название карточки',
      description: 'Описание карточки',
      priority: 'high',
      status: 'in progress',
      mark: 'Метка карточки'
    },
  ];
  const statusCards = ['Open', 'In Progress', 'Review', 'Done'];
  const [statusCard, setStatusCard] = useState<string>('open');
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextId, setNextId] = useSetNextId(3);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [mark, setMark] = useState<string>('');
  const [markSearch, setMarkSearch] = useState<string>('');
  const [selected, setSelected] = useState<string>('high');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [sortPriority, setSortPriority] = useState<string>('all');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortDirection, setSortDirection] = useState<string>('abc');
  const priorityOrder: Record<Priority, number> = { high: 3, middle: 2, low: 1 };
  const [sortDate, setSortDate] = useState<string>('newDate');

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
    let filtered = tasks.filter(task =>
      (selectedPriority === task.priority || selectedPriority === 'all') &&
      statusCard === task.status &&
      task.mark.toLowerCase().includes(markSearch.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      if (sortDirection === 'abc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    if (sortPriority === 'big') {
      filtered.sort((a, b) => priorityOrder[b.priority as Priority] - priorityOrder[a.priority as Priority]);
    } else if (sortPriority === 'small') {
      filtered.sort((a, b) => priorityOrder[a.priority as Priority] - priorityOrder[b.priority as Priority]);
    }

    if (sortDate === 'newDate') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortDate === 'oldDate') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    setFilteredTasks(filtered);
  };

  const removeFilters = () => {
    setFilteredTasks(tasks);
    setSortDirection('abc');
  }

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const draggedTask = tasks.find(task => task.id === taskId);

    if (draggedTask) {
      const updatedTask = {
        ...draggedTask,
        status: destination.droppableId.toLowerCase()
      };

      const updatedTasks = tasks.map(task =>
        task.id === taskId ? updatedTask : task
      );

      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    }
  };

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
          <option value="all">Все приоритеты</option>
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
        <ButtonWrapper>
          <Button onClick={applyFilters}>Применить фильтрацию задач</Button>
        </ButtonWrapper>
      </BoardWrapper>
      <BoardWrapper>
        <SelectSort onChange={(event) => setSortDirection(event.target.value)}>
          <option value="abc">Название (А-я)</option>
          <option value="cba">Название (Я-а)</option>
        </SelectSort>
        <SelectSort onChange={(event) => setSortPriority(event.target.value)}>
          <option value="all">Без сортировки по приоритету</option>
          <option value="big">От большего приоритета</option>
          <option value="small">От меньшего приоритета</option>
        </SelectSort>
        <SelectSort onChange={(event) => setSortDate(event.target.value)}>
          <option value="newDate">Сначала новые</option>
          <option value="oldDate">Сначала старые</option>
        </SelectSort>
        <ButtonWrapper>
          <Button onClick={removeFilters}>Сбросить фильтрацию задач</Button>
        </ButtonWrapper>
      </BoardWrapper>
      <Wrapper>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {statusCards.map((title, index) => (
            (statusCard === title.toLowerCase() || filteredTasks.length === tasks.length) && (
              <TaskColumn key={index} title={title} tasks={tasks} filteredTasks={filteredTasks} setTasks={setTasks} />
            )
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
  );
};
