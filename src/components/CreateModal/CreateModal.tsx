import React, { Dispatch, SetStateAction, useState } from 'react';
import { InputModal, ModalContent, ModalOverlay, Wrapper } from './CreateModal.styles';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setDesks: Dispatch<SetStateAction<{ id: number; name: string; }[]>>;
}

export default function CreateModal({ isOpen, onClose, setDesks }: CreateModalProps) {
  const [deskName, setDeskName] = useState('');
  const [nextId, setNextId] = useState(1)

  const handleSubmit = () => {
    if(deskName.trim() === '') return null;

    setDesks(prevDesks => [...prevDesks, { id: nextId, name: deskName }]);
    setNextId(prevId => prevId + 1);
    setDeskName('');
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setDeskName(event.target.value);
  }

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <h2>Создание Доски</h2>
          <InputModal
            type="text"
            placeholder="Название Доски"
            value={deskName}
            onChange={handleChange}
          />
          <Wrapper>
            <Button onClick={handleSubmit}>Создать</Button>
            <Button onClick={onClose}>Отменить</Button>
          </Wrapper>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}
