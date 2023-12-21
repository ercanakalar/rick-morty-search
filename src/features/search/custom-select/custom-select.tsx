import { ChangeEvent, useEffect, useRef, useState } from 'react';

import SearchInput from '../../../components/search/search-input';
import SearchSelect from '../../../components/search/search-select';
import SearchArea from '../../../components/search/search-area';

import { SearchTermProps } from '../../../utils/interfaces/search';

const CustomSelect = (props: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<Array<SearchTermProps>>(
    []
  );
  const [widthOfSelects, setWidthOfSelects] = useState<number>(0);
  const [heightOfSelects, setHeightOfSelects] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const selectedChildRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const selectData = (
    event: ChangeEvent<HTMLInputElement>,
    option: SearchTermProps
  ) => {
    option.isSelected = !option.isSelected;
    if (option.isSelected) {
      setSelectedResult((prev) => [...prev, option]);
    } else {
      setSelectedResult((prev) => prev.filter((item) => item.id !== option.id));
    }
  };

  const filterSelected = (option: SearchTermProps) => {
    setSelectedResult((prev) => prev.filter((item) => item.id !== option.id));
    document.getElementById(option.id.toString())?.click();
  };

  const openHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (selectedChildRef.current) {
      setWidthOfSelects(selectedChildRef.current.offsetWidth);
      setHeightOfSelects(selectedChildRef.current.offsetHeight);
    }
    inputRef.current?.focus();
  }, [selectedResult]);

  useEffect(() => {
    localStorage.setItem('selectedResult', JSON.stringify(selectedResult));
  }, [selectedResult]);

  return (
    <div className='flex flex-col gap-2'>
      <div className={`flex flex-col relative h-full`}>
        <div className='h-full'>
          <SearchArea
            selectedChildRef={selectedChildRef}
            selectedResult={selectedResult}
            filterSelected={filterSelected}
          />
          <SearchInput
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            widthOfSelects={widthOfSelects}
            inputRef={inputRef}
            heightOfSelects={heightOfSelects}
          />
          <button onClick={openHandler}>
            <img
              className='absolute top-2 right-3'
              src='/icons/caret-down-solid.svg'
              alt='arrow'
            />
          </button>
          {/* {open && (
            <SelectByName
              searchTerm={searchTerm}
              errors={errors}
              options={searchResults}
              selectData={selectData}
            />
          )} */}
        </div>
      </div>
      <SearchSelect
        searchTerm={searchTerm}
        selectData={selectData}
        selectedResult={selectedResult}
      />
    </div>
  );
};

export default CustomSelect;
