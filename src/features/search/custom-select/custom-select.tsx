import { useEffect, useRef, useState } from 'react';

import SearchInput from '../../../components/search/search-input';
import SearchSelect from '../../../components/search/search-select';
import SearchArea from '../../../components/search/search-area';
import { useSelector } from 'react-redux';
import SelectByName from '../../../components/search/select-by-name';

const CustomSelect = (props: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [widthOfSelects, setWidthOfSelects] = useState<number>(0);
  const [heightOfSelects, setHeightOfSelects] = useState<number>(0);

  const selectedChildRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openHandler = () => {
    setOpen(!open);
  };

  const selectedData = useSelector(
    (state: any) => state.keepSelectedData.selectedData
  );

  useEffect(() => {
    if (selectedChildRef.current) {
      setWidthOfSelects(selectedChildRef.current.offsetWidth);
      setHeightOfSelects(selectedChildRef.current.offsetHeight);
    }
    inputRef.current?.focus();
  }, [selectedData]);
  
  return (
    <div className='flex flex-col gap-2'>
      <div className={`flex flex-col relative h-full`}>
        <div className='h-full'>
          <SearchArea selectedChildRef={selectedChildRef} />
          <SearchInput inputRef={inputRef} widthOfSelects={widthOfSelects} heightOfSelects={heightOfSelects} />
          {/* <button onClick={openHandler}>
            <img
              className='absolute top-2 right-3'
              src='/icons/caret-down-solid.svg'
              alt='arrow'
            />
          </button>
          {open && (
            <SelectByName
            />
          )} */}
        </div>
      </div>
      <SearchSelect />
    </div>
  );
};

export default CustomSelect;
