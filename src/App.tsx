import { FC, useState } from 'react';
import { Header } from './components/Header';
import { BoardList } from './components/BoardList';

export const App: FC = () => {
  const [search, setSearch] = useState('')

  const handleSearch = (value: string) => {
    setSearch(value)
  };

  return (
    <>
      <Header onSearch={handleSearch}/>
      <BoardList search={search} />
    </>
  )
}
