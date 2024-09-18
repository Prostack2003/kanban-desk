import React from 'react';
import { ModalContent, ModalOverlay, Wrapper } from '../../elements/Modal/Modal.styles';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';

interface DeleteModalProps {
  isOpenTooltip: boolean;
  onClose: () => void;
  onDelete: () => void;
}


export default function DeleteModal({isOpenTooltip , onClose, onDelete} : DeleteModalProps) {
  if (!isOpenTooltip) return null;
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <h2>Удаление доски</h2>
          <p>Вы точно хотите удалить данную доску и все задачи?</p>
          <Wrapper>
            <Button onClick={onDelete}>Удалить</Button>
            <Button onClick={onClose}>Отменить</Button>
          </Wrapper>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}
