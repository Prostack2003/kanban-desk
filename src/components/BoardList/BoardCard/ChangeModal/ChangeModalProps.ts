import { Dispatch, SetStateAction } from 'react';

export interface ChangeModalProps {
  isOpenTooltip: boolean;
  onClose: () => void;
  name: string;
  deskId: number;
  setDesks: Dispatch<SetStateAction<{ id: number; name: string; }[]>>;
}
