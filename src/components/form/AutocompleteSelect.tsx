import React, { FC, useState } from 'react';

interface AutocompleteSelectProps {
  options: string[];
  label: string;
  onChange: (value: string) => void;
}

const AutocompleteSelect: FC<AutocompleteSelectProps> = ({
  options,
  label,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>(
    []
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setFilteredOptions([]);
    onChange(option);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={label}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 list-none p-0 m-0 w-full z-10">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSelect;
