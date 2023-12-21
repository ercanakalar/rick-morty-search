import { useDispatch, useSelector } from 'react-redux';
import { SearchTermProps } from '../../utils/interfaces/search';
import { AppDispatch } from '../../store';
import { ChangeEvent, useEffect, useState } from 'react';
import { getCharacterByName } from '../../libs/characters/get-by-name';
import { setSelectedData } from '../../store/slice/data/keep-selected-data';

const SelectByName = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selects, setSelects] = useState<SearchTermProps[]>([]);

  const inputValue = useSelector(
    (state: any) => state.setInputValue.setInputValue
  );

  const { getCharactersByName, error, loading } = useSelector(
    (state: {
      getCharactersByName: {
        error: string[];
        getCharactersByName: any;
        loading: boolean;
      };
    }) => state.getCharactersByName
  );

  const fetch = async () => {
    await dispatch(getCharacterByName(inputValue));
  };

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement>,
    option: SearchTermProps
  ) => {
    event.preventDefault();
    option.isSelected = !option.isSelected;
    if (option.isSelected) {
      dispatch(setSelectedData({ type: 'add', payload: option }));
    } else {
      dispatch(setSelectedData({ type: 'remove', payload: option }));
    }
  };

  useEffect(() => {
    fetch();
    setSelects(getCharactersByName.results);
  }, [inputValue]);


  return (
    <div className='absolute w-full'>
      <div className='bg-[#62748A] first:rounded-t-lg last:rounded-b-lg'>
        {selects &&
          selects.map((option: SearchTermProps, index: number) => {
            return (
              <div
                className='flex items-center p-2 gap-2 border hover:bg-[#E1E8F0] first:rounded-t-lg last:rounded-b-lg'
                key={option.id + index.toString()}
              >
                <div className='flex'>
                <button
                    className='cursor-auto'
                    value={option.name}
                    id={option.id.toString()}
                    onClick={(event: any) => handleSearch(event, option)}
                  >
                    <input
                      type='checkbox'
                      checked={option.isSelected}
                      onChange={() => {}}
                    />
                  </button>
                </div>

                <div className='flex flex-col'>
                  {option.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) && (
                    <label className='text-xs' htmlFor={option.id.toString()}>
                      {option.name}
                    </label>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SelectByName;
