import React, { FC } from 'react';
import { Wrapper } from './Header.styles';
import { SearchInput } from '../../elements';
import { HeaderProps } from './HeaderProps';

export const Header:FC<HeaderProps> = ({onSearch}: HeaderProps) => {
  return (
    <header>
      <Wrapper>
        <SearchInput onSearch={onSearch} />
      </Wrapper>
    </header>
  );
}
