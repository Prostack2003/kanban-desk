import React, { FC, useState } from 'react';
import { Search } from './Search.styles';
import { SearchProps } from '../../../utils/Props/SearchProps';

export const SearchInput:FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <Search
      placeholder="Найти Доску..."
      onChange={handleInputChange}
      value={searchText}
    />
  );
}
