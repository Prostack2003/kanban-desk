import React from 'react';
import { Wrapper } from './Header.styles';
import SearchInput from '../../elements/Buttons/Search/Search';

interface HeaderProps {
  onSearch: (value: string) => void;
}

export default function Header({onSearch}: HeaderProps) {
  return (
    <header>
      <Wrapper>
        <SearchInput onSearch={onSearch} />
      </Wrapper>
    </header>
  );
}
