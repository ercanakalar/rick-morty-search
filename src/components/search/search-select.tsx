import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SearchTermProps } from '../../utils/interfaces/search';
import { DataRequest } from '../../hooks/data-request';

const SearchSelect = (props: {
  selectData: (
    event: ChangeEvent<HTMLInputElement>,
    option: SearchTermProps
  ) => void;
  searchTerm: string;
  selectedResult: SearchTermProps[];
}) => {
  const { selectData, searchTerm, selectedResult } = props;

  const [searchResults, setSearchResults] = useState<SearchTermProps[]>([]);

  const selectRef = useRef<HTMLInputElement>(null);

  const { doRequest, errors } = DataRequest({
    url: `https://rickandmortyapi.com/api/character?name=${searchTerm}`,
    method: 'get',
  });

  const fetch = async () => {
    setSearchResults([]);
    const response = await doRequest();
    if (!response) return;
    response.results.map(
      (item: {
        id: number;
        name: string;
        episode: Array<string>;
        image: string;
      }) => {
        setSearchResults((prev) => [
          ...prev,
          {
            id: item.id,
            name: item.name,
            episode_number: item.episode.length,
            character_image_url: item.image,
            isSelected: false,
          },
        ]);
      }
    );
  };

  useEffect(() => {
    fetch();
    const searched = localStorage.getItem('selectedResult');
    if (searched) {
      const result = JSON.parse(searched);
      result.forEach((item: SearchTermProps) => {
        if (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.isSelected
        ) {
          setSearchResults((prev) => [
            ...prev,
            {
              id: item.id,
              name: item.name,
              episode_number: item.episode_number,
              character_image_url: item.character_image_url,
              isSelected: true,
            },
          ]);
        }
      });
    }

    console.log(searchResults);
  }, [searchTerm]);

  if (errors.length > 0) {
    return (
      <div>
        <p>Could find character!</p>
      </div>
    );
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
                    className='cursor-none'
                    value={option.name}
                    id={option.id.toString()}
                    onClick={(event: any) => selectData(event, option)}
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

                <div className='flex flex-col'>
                  {option.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) && (
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
