import React, { useState, useRef, useEffect } from "react";

interface SelectProps {
  options: string[];
  label: string;
}

const Select: React.FC<SelectProps> = ({ options }) => {
  const [selected, setSelected] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative inline-block w-64">
      <button
        className="w-full bg-default-100 border border-default-100 rounded-lg shadow-md p-2 text-left focus:outline-none text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className="absolute right-2 top-2 transform transition-transform duration-200">
          {isOpen ? (
            <i className="fa-solid fa-chevron-up cursor-pointer duration-200"></i>
          ) : (
            <i className="fa-solid fa-chevron-up -rotate-180 cursor-pointer transition-all duration-200"></i>
          )}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-default-100 border border-default-100 rounded-lg shadow-lg text-primary">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-default-300 cursor-pointer transition-all duration-200"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
