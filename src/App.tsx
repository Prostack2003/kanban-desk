import { FC } from 'react';
import { Header } from './components/Header/Header';
import { BoardList } from './components/BoardList/BoardList';

export const App: FC = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Header onSearch={handleSearch}/>
      <BoardList />
    </>
  )
}
