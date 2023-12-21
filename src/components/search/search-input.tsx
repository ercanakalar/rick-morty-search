import { useEffect } from 'react';

import { SearchInputProps } from '../../utils/interfaces/search';

const SearchInput = (props: SearchInputProps) => {
  const {
    searchTerm,
    handleSearch,
    widthOfSelects,
    inputRef,
    heightOfSelects,
  } = props;

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.style.paddingLeft = `${widthOfSelects!}px`;
      inputRef.current.style.height = heightOfSelects ? `${heightOfSelects}px` : '32px';
    }
  }, [inputRef, widthOfSelects,heightOfSelects]);

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
