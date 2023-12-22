import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchTermProps } from '../../utils/interfaces/search';
import { AppDispatch } from '../../store';
import { setSelectedData } from '../../store/slice/data/keep-selected-data';
import Loading from '../loading/loading';

const SearchArea = (props: {
  selectedChildRef: React.RefObject<HTMLDivElement>;
}) => {
  const { selectedChildRef } = props;
  const dispatch = useDispatch<AppDispatch>();

  const filterSelected = (option: SearchTermProps) => {
    dispatch(setSelectedData({ type: 'remove', payload: option }));
    document.getElementById(option.id.toString())?.click();
  };

  const selectedData = useSelector(
    (state: any) => state.keepSelectedData.selectedData
  );

  useEffect(() => {
    const selected = localStorage.getItem('selectedData');
    if (selected) {
      JSON.parse(selected).map((item: SearchTermProps) => {
        document.getElementById(item.id.toString())?.click();
      });
    }
  }, []);

  return (
    <div ref={selectedChildRef} className='flex absolute'>
      {selectedData &&
        selectedData.map((item: SearchTermProps, index: number) => {
          return (
            <div
              key={index}
              className='flex items-center px-2 h-6 m-[4px] gap-1 bg-[#E1E8F0] rounded-md'
            >
              <Suspense fallback={<Loading/>}>
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
              </Suspense>
            </div>
          );
        })}
    </div>
  );
};

export default SearchArea;
