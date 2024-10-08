import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { InputModal } from './CreateModal.styles';
import { Button } from '../../../elements/Buttons/MainButton/Button.styles';
import { ModalContent, ModalOverlay, Wrapper } from '../../../elements/Modal/Modal.styles';
import { useSetNextId } from '../../../utils/CustomHooks/useSetNextId';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setDesks: Dispatch<SetStateAction<{ id: number; name: string; }[]>>;
}

export const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose, setDesks })  => {
  const [deskName, setDeskName] = useState('');
  const [nextId, setNextId] = useSetNextId(1)

  const handleSubmit = () => {
    if(deskName.trim() === '') return null;
    setDesks(prevDesks => [...prevDesks, { id: nextId, name: deskName }]);
    setNextId();
    setDeskName('')
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeskName(event.target.value);
  };

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
