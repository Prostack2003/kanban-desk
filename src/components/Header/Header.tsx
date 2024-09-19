import React, { FC } from 'react';
import { Wrapper } from './Header.styles';
import { SearchInput } from '../../elements/Buttons/Search/Search';
import { HeaderProps } from '../../utils/Props/HeaderProps';

export const Header:FC<HeaderProps> = ({onSearch}: HeaderProps) => {
  return (
    <header>
      <Wrapper>
        <SearchInput onSearch={onSearch} />
      </Wrapper>
    </header>
  );
}
