import { ChangeEvent, useEffect, useState } from 'react';

import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { getCharacterByName } from '../../libs/characters/get-by-name';
import { setInputValue } from '../../store/slice/data/keep-selected-data';

const SearchInput = (props: {
  inputRef: any;
  widthOfSelects: number;
  heightOfSelects: number;
}) => {
  const { inputRef, heightOfSelects, widthOfSelects } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    dispatch(setInputValue(event.target.value));
  };

  const fetch = async () => {
    await dispatch(getCharacterByName(searchTerm));
  };

  useEffect(() => {
    fetch();
  }, [searchTerm]);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.style.paddingLeft = `${widthOfSelects!}px`;
      inputRef.current.style.height = heightOfSelects
        ? `${heightOfSelects}px`
        : '32px';
    }
  }, [inputRef, widthOfSelects, heightOfSelects]);

  return (
    <input
      ref={inputRef}
      className='border selection:bg-white focus:font-bold outline-none rounded-md w-96 h-full pl-2'
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
