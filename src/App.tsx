import Header from './components/Header/Header';
import BoardList from './components/BoardList/BoardList';

export default function App() {
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
