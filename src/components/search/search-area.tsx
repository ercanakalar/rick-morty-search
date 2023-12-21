import { SearchTermProps } from '../../utils/interfaces/search';

const SearchArea = (props: {
  selectedChildRef?: React.RefObject<HTMLDivElement>;
  selectedResult: SearchTermProps[];
  filterSelected: (item: SearchTermProps) => void;
}) => {
  const { selectedChildRef, selectedResult, filterSelected } = props;
  
  return (
    <div ref={selectedChildRef} className='flex absolute'>
      {selectedResult &&
        selectedResult.map((item: SearchTermProps, index: number) => {
          return (
            <div
              key={index}
              className='flex items-center px-2 h-6 m-[4px] gap-1 bg-[#E1E8F0] rounded-md'
            >
              <p className='min-w-max text-xs text-[#314154]'>{item.name}</p>
              <div className='flex items-center w-4 bg-[#92A3B7]  rounded'>
                <button
                  key={index}
                  className='w-full text-xs text-white'
                  onClick={() => filterSelected(item)}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchArea;
