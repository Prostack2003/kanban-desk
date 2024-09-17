import React from 'react';
import { Wrapper } from './BoardCard.styles';
import { Button } from '../../elements/Buttons/MainButton/Button.styles';

interface BoardCardProps {
  name: string,
  key: number
}

export default function BoardCard({ name, key }: BoardCardProps) {
  return (
    <Wrapper>
      <p key={key}>{name}</p>
      <Button>Изменить Доску</Button>
    </Wrapper>
  );
}
