import React, { FC, useState } from 'react';
import { Wrapper, BoardContainer, ButtonContainer } from './BoardList.styles';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';
import { BoardCard } from '../../components';
import { CreateModal } from '../../components';
import { BoardListProps } from './BoardListProps';

export const BoardList:FC<BoardListProps> = ({search}) => {
  const initialDesks = [{ id: 0, name: 'Первая Доска' }];
  const [desks, setDesks] = useState(initialDesks);

  const deleteDesk = (id: number) => {
    setDesks(desks.filter((desk) => desk.id !== id));
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const desksForSearch = desks.filter((desk) =>
    desk.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Wrapper>
      <BoardContainer>
        {desksForSearch.length === 0 ? (
          <p className='board-paragraph'>Нет доступных досок</p>
        ) : (
          desksForSearch.map((desk) => (
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
