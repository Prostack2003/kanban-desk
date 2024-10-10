import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useInput } from '../../../../../../utils/CustomHooks/useInput';
import { InputModal, ModalContent, ModalOverlay, Wrapper } from '../../../../../../elements/Modal/Modal.styles';
import { Button } from '../../../../../../elements/Buttons/MainButton/Button.styles';
import { Select } from '../../Task.styles';
import { TaskStatus } from '../../TaskColumn';

interface ChangeModalCardProps {
  task: {
    id: number,
    date: string,
    name: string,
    description: string,
    priority: string,
    status: string,
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
  isOpen: boolean;
  onClose: () => void;
  taskId: number;
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

export const ChangeModalCard: FC<ChangeModalCardProps> = ({ task, tasks, isOpen, onClose, taskId, setFilteredTasks, setTasks }) => {
  const [newName, handleNameChange] = useInput(task.name);
  const [newDescription, handleNameDescriptionChange] = useInput(task.description);
  const [newMark, handleMarkChange] = useInput(task.mark || '');
  const [newStatus, setNewStatus] = useState(task.status);

  const handleSave = () => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, name: newName, description: newDescription, mark: newMark, status: newStatus } : task
    );

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);

    onClose();
  };

  const handleDelete = () => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);

    onClose();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Редактирование карточки задач</h2>
        <Wrapper>
          <p>Название</p>
          <InputModal
            type="text"
            placeholder="Название Карточки"
            value={newName}
            onChange={handleNameChange}
          />
        </Wrapper>
        <Wrapper>
          <p>Описание</p>
          <InputModal
            type="text"
            placeholder="Описание Карточки"
            value={newDescription}
            onChange={handleNameDescriptionChange}
          />
        </Wrapper>
        <Wrapper>
          <p>Метка</p>
          <InputModal
            type="text"
            placeholder="Метка Карточки"
            value={newMark}
            onChange={handleMarkChange}
          />
        </Wrapper>
        <Wrapper>
          <p>Статус</p>
          <Select value={newStatus} onChange={handleStatusChange}>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </Select>
        </Wrapper>
        <Wrapper>
          <Button onClick={handleSave}>Редактировать</Button>
          <Button onClick={handleDelete}>Удалить</Button>
        </Wrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
