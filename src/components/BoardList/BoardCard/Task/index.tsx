import { useParams } from 'react-router-dom';
import { BoardWrapper, Column, ColumnTitle, Select, TaskCard } from './Task.styles';
import { Button } from '../../../../elements/Buttons/MainButton/Button.styles';
import { Wrapper } from '../../../../elements/Modal/Modal.styles';
import React, { useState } from 'react';
import { useSetNextId } from '../../../../utils/CustomHooks/useSetNextId';
import { getCurrentDate } from '../../../../utils/functions/getCurrentDate';
import { TaskModal } from './TaskModal';

export const Task = () => {
  const { taskId } = useParams();
  const initialTasks = [
    {
      id: 0,
      date: getCurrentDate(),
      name: 'Первая Карточка Задачи',
      description: 'Описание',
      priority: 'high',
      status: 'open',
      mark: 'Метка'
    }
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextId, setNextId] = useSetNextId(1);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [selected, setSelected] = useState('high');
  const [mark, setMark] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
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

      setTasks([...tasks, newTask]);
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
    const filtered = tasks.filter(task => task.priority === selectedPriority);
    setFilteredTasks(filtered);
  };

  return (
    <>
      <BoardWrapper>
        <Select>
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
        <Button onClick={applyFilters}>Применить фильтрацию задач</Button>
      </BoardWrapper>
      <BoardWrapper>
        <Column>
          <ColumnTitle>Open</ColumnTitle>
          {filteredTasks
            .filter((task) => task.status === 'open')
            .map(task => (
            <TaskCard key={task.id}>
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
