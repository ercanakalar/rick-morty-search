import { ChangeEvent } from 'react';
import { SearchTermProps } from '../../utils/interfaces/search';

const SelectByName = (props: {
  options: Array<SearchTermProps>;
  selectData: (
    event: ChangeEvent<HTMLInputElement>,
    option: SearchTermProps
  ) => void;
  errors: string[];
  searchTerm: string;
}) => {
  const { options, selectData, errors, searchTerm } = props;

  if (errors.length > 0) {
    return (
      <div>
        <p>Could find character!</p>
      </div>
    );
  }

  return (
    <div className='absolute w-full'>
      <div className='bg-[#62748A] first:rounded-t-lg last:rounded-b-lg'>
        {options &&
          options.map((option: SearchTermProps, index: number) => {
            return (
              <div
                className='flex items-center p-2 gap-2 border hover:bg-[#E1E8F0] first:rounded-t-lg last:rounded-b-lg'
                key={option.id + index.toString()}
              >
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='checkbox'
                    value={option.name}
                    id={option.id.toString()}
                    onChange={(event) => selectData(event, option)}
                  />
                </div>

                <div className='flex flex-col'>
                  {option.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) && (
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
