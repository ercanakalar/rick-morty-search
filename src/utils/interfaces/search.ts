import { ChangeEvent } from 'react';

export interface SearchTermProps {
  id: number;
  name: string;
  episode_number: number;
  character_image_url: string;
  isSelected: boolean;
}

export interface SearchInputProps {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  widthOfSelects: number;
  inputRef: React.RefObject<HTMLInputElement>;
  heightOfSelects: number;
}
