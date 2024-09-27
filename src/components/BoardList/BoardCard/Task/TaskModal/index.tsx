import React, { FC } from 'react';
import { InputModal, ModalContent, ModalOverlay, Wrapper } from '../../../../../elements/Modal/Modal.styles';
import { Button } from '../../../../../elements/Buttons/MainButton/Button.styles';
import { Textarea, Select } from '../Task.styles';
import { TaskModalProps } from './TaskModalProps';

export const TaskModal: FC<TaskModalProps> = (
  {
    taskName,
    taskDescription,
    selectedPriority,
    mark,
    onTaskNameChange,
    onTaskDescriptionChange,
    onPriorityChange,
    onMarkChange,
    onSubmit,
    onCancel
  }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <InputModal
          type="text"
          placeholder="Название задачи*"
          value={taskName}
          onChange={onTaskNameChange}
          required
        />
        <Textarea
          placeholder="Описание задачи*"
          value={taskDescription}
          onChange={onTaskDescriptionChange}
          required
        />
        <Select value={selectedPriority} onChange={onPriorityChange}>
          <option value="high">Высокий приоритет</option>
          <option value="middle">Средний приоритет</option>
          <option value="low">Низкий приоритет</option>
        </Select>
        <InputModal
          type="text"
          placeholder="Метка Задачи"
          value={mark}
          onChange={onMarkChange}
        />
        <Wrapper>
          <Button type="button" onClick={onSubmit}>Создать</Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Wrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
