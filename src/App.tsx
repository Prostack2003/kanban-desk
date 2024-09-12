import Header from './components/Header/Header';

export default function App() {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Header onSearch={handleSearch}/>
    </>
  )
}
