import React, { FC, useState } from 'react';
import { Wrapper, BoardContainer, ButtonContainer } from './BoardList.styles';
import CreateModal from '../CreateModal/CreateModal';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';
import { BoardCard } from '../BoardCard/BoardCard';

export const BoardList:FC = () => {
  const initialDesks = [{ id: 0, name: 'Первая Доска' }];
  const [desks, setDesks] = useState(initialDesks);

  const deleteDesk = (id: number) => {
    setDesks(desks.filter((desk) => desk.id !== id));
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Wrapper>
      <BoardContainer>
        {desks.length === 0 ? (
          <p>Нет доступных досок</p>
        ) : (
          desks.map((desk) => (
            <BoardCard
              key={desk.id}
              name={desk.name}
              id={desk.id}
              onDelete={() => deleteDesk(desk.id)}
              setDesks={setDesks}
            />
          ))
        )}
      </BoardContainer>
      <ButtonContainer>
        <Button onClick={openModal}>Создать доску</Button>
      </ButtonContainer>
      <CreateModal isOpen={isOpen} onClose={closeModal} setDesks={setDesks} />
    </Wrapper>
  );
}
