import { useState } from 'react';

export const useSetNextId = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);

  const setNewValue = () => {
    setValue(prevValue => prevValue + 1);
  };

  return [value, setNewValue] as const;
}
