import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { InputModal, ModalContent, ModalOverlay, Wrapper } from '../../elements/Modal/Modal.styles';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';

interface ChangeModalProps {
  isOpenTooltip: boolean;
  onClose: () => void;
  name: string;
  deskId: number;
  setDesks: Dispatch<SetStateAction<{ id: number; name: string; }[]>>;
}

export const ChangeModal:FC<ChangeModalProps> = ({ isOpenTooltip, onClose, name, deskId, setDesks }) => {
  const [newName, setNewName] = useState(name);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSave = () => {
    setDesks(prevDesks => prevDesks.map(desk =>
      desk.id === deskId ? { ...desk, name: newName } : desk
    ));
    onClose();
  };

  if (!isOpenTooltip) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Редактирование доски</h2>
        <InputModal
          type="text"
          placeholder="Название Доски"
          value={newName}
          onChange={handleNameChange}
        />
        <Wrapper>
          <Button onClick={handleSave}>Изменить</Button>
          <Button onClick={onClose}>Отменить</Button>
        </Wrapper>
      </ModalContent>
    </ModalOverlay>
  );
}
