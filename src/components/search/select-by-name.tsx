import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchTermProps } from '../../utils/interfaces/search';
import { AppDispatch } from '../../store';
import { setSelectedData } from '../../store/slice/data/keep-selected-data';
import Loading from '../loading/loading';

const SelectByName = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selects, setSelects] = useState<SearchTermProps[]>([]);

  const { getCharactersByName, error, loading } = useSelector(
    (state: {
      getCharactersByName: {
        error: string[];
        getCharactersByName: any;
        loading: boolean;
      };
    }) => state.getCharactersByName
  );

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

  const inputValue = useSelector(
    (state: any) => state.keepSelectedData.inputValue
  );

  const selectedData = useSelector(
    (state: any) => state.keepSelectedData.selectedData
  );

  const names = (option: SearchTermProps) => {
    return option.name.toLowerCase().includes(inputValue.toLowerCase()) && (
      <label className='text-xs' htmlFor={option.id.toString()}>
        {option.name}
      </label>
    );
  };

  useEffect(() => {
    if (getCharactersByName.results) {
      const newResults = getCharactersByName.results.map(
        (option: {
          id: number;
          name: string;
          image: string;
          episode: string[];
        }) => {
          return {
            id: option.id,
            name: option.name,
            character_image_url: option.image,
            episode_number: option.episode.length,
            isSelected: false,
          };
        }
      );
      console.log(selectedData);

      selectedData.map((item: SearchTermProps) => {
        newResults.map((option: SearchTermProps) => {
          if (item.id === option.id) {
            option.isSelected = true;
          }
        });
      });
      setSelects(newResults);
    }
  }, [getCharactersByName]);

  if (error.length) {
    return <div className='text-red-500'>{error}</div>;
  }

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
                    <input type='checkbox' checked={option.isSelected} />
                  </button>
                </div>

                <div className='flex flex-col'>
                  {names(option)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SelectByName;
