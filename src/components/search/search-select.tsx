import { ChangeEvent, useEffect, useState } from 'react';
import { SearchTermProps } from '../../utils/interfaces/search';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedData } from '../../store/slice/data/keep-selected-data';

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
      })
      setSearchResults(newResults);
    }
  }, [getCharactersByName]);

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
  }, [inputValue])

  if (error.length) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (loading) {
    return <div className='text-blue-500'>Loading...</div>;
  }

  return (
    <div>
      <div>
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
                    <input
                      type='checkbox'
                      checked={option.isSelected}
                      onChange={() => {}}
                    />
                  </button>
                </div>
                <div className='flex'>
                  <img
                    className='h-8 w-8 rounded'
                    src={option.character_image_url}
                    alt={option.name}
                  />
                </div>

                <div className='flex flex-col'>
                  {option.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) && (
                    <label
                      className='text-xs font-bold'
                      htmlFor={option.id.toString()}
                    >
                      {option.name}
                    </label>
                  )}
                  <p className='text-xs text-[#62748A]'>
                    {option.episode_number} Episodes
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchSelect;
