import React, { Dispatch, SetStateAction, useState } from 'react';
import { Wrapper } from './BoardCard.styles';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';
import { TooltipButton, TooltipWrapper } from '../../elements/Buttons/Tooltip/Tooltip.styles';
import ChangeModal from '../ChangeModal/ChangeModal';
import DeleteModal from '../DeleteModal/DeleteModal';

type stateDesks = {id: number; name: string;}[]

interface BoardCardProps {
  name: string,
  id: number,
  onDelete: () => void;
  setDesks: Dispatch<SetStateAction<stateDesks>>;
}

export default function BoardCard({ name, id, onDelete, setDesks }: BoardCardProps) {
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);

  const [isChangeModalOpen, setIsChangeModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const toggleTooltip = () => setIsOpenTooltip((prevState) => !prevState);

  const handleEdit = () => {
    setIsOpenTooltip(false);
    setIsChangeModalOpen(true)
  };

  const handleDelete = () => {
    setIsOpenTooltip(false)
    setIsDeleteModalOpen(true)
  };

  const confirmDelete = () => {
    onDelete()
    setIsDeleteModalOpen(false)
  }

  return (
    <Wrapper>
      <p key={id}>{name}</p>
      <Button onClick={toggleTooltip}>Изменить Доску</Button>
      {isOpenTooltip && (
        <TooltipWrapper>
          <TooltipButton onClick={handleEdit}>Редактировать</TooltipButton>
          <TooltipButton onClick={handleDelete}>Удалить</TooltipButton>
        </TooltipWrapper>
      )
      }
      <ChangeModal
        isOpenTooltip={isChangeModalOpen}
        onClose={() => setIsChangeModalOpen(false)}
        name={name}
        deskId={id}
        setDesks={setDesks}
      />
      <DeleteModal
        isOpenTooltip={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </Wrapper>
  );
}
