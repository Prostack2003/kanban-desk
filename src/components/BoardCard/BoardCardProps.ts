import { Dispatch, SetStateAction } from 'react';

type stateDesks = {id: number; name: string;}[]

export interface BoardCardProps {
  name: string,
  id: number,
  onDelete: () => void;
  setDesks: Dispatch<SetStateAction<stateDesks>>;
}
