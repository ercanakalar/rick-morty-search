import './search-select.css';

import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchTermProps } from '../../utils/interfaces/search';
import { AppDispatch } from '../../store';
import { setSelectedData } from '../../store/slice/data/keep-selected-data';
import Loading from '../loading/loading';

const SearchSelect = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchResults, setSearchResults] = useState<SearchTermProps[]>([]);

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

  const selectedData = useSelector(
    (state: any) => state.keepSelectedData.selectedData
  );

  const inputValue = useSelector(
    (state: any) => state.keepSelectedData.inputValue
  );

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
      selectedData.map((item: SearchTermProps) => {
        newResults.map((option: SearchTermProps) => {
          if (item.id === option.id) {
            option.isSelected = true;
          }
        });
      });
      setSearchResults(newResults);
    }
  }, [getCharactersByName, selectedData]);

  useEffect(() => {
    localStorage.setItem('selectedData', JSON.stringify(selectedData));
  }, [selectedData]);

  useEffect(() => {
    if (searchResults) {
      const newResults = searchResults.map((option: SearchTermProps) => {
        if (selectedData.length) {
          selectedData.map((item: SearchTermProps) => {
            if (item.id === option.id) {
              option.isSelected = true;
            }
          });
        }
        return option;
      });
      setSearchResults(newResults);
    }
  }, [inputValue]);

  if (error.length) {
    return <div className='text-red-500'>{error}</div>;
  }

  const haveLetter = (option: SearchTermProps) => {
    if (!inputValue) return true;
    return option.name
      .split('')
      .some((letter: string) =>
        inputValue.toLowerCase().includes(letter.toLowerCase())
      );
  };

  const checkLetter = (option: SearchTermProps) => {
    if (!inputValue) return option.name;
    return option.name.split(' ').map((word: string, index: number) =>
      word.split('').map((letter: string) =>
        word.toLowerCase().includes(inputValue.toLowerCase()) &&
        inputValue.toLowerCase().includes(letter.toLowerCase()) ? (
          <b className='font-bold' key={index}>
            {letter}
          </b>
        ) : (
          <p key={index}>{letter}</p>
        )
      )
    );
  };

  return (
    <div className='h-72 overflow-y-auto list'>
      {searchResults &&
        searchResults.map((option: SearchTermProps, index: number) => {
          return (
            <div
              className='flex items-center p-2 gap-2 border first:rounded-t-lg last:rounded-b-lg'
              key={option.name + index.toString()}
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
              <div className='flex'>
                <img
                  className='h-8 w-8 rounded'
                  src={option.character_image_url}
                  alt={option.name}
                />
              </div>
              <Suspense fallback={<Loading />} key={index}>
                <div className='flex flex-col'>
                  {haveLetter(option) && (
                    <label
                      className='flex text-xs'
                      htmlFor={option.id.toString()}
                    >
                      {checkLetter(option)}
                    </label>
                  )}
                  <p className='text-xs text-[#62748A]'>
                    {option.episode_number} Episodes
                  </p>
                </div>
              </Suspense>
            </div>
          );
        })}
    </div>
  );
};

export default SearchSelect;
