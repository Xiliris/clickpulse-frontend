import { forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  className?: string;
  onChange?: () => void;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, name, className = "", onChange, required }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={name} className="sr-only">
          {placeholder}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          ref={ref}
          onChange={onChange}
          required={required}
          className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-200 rounded-lg sm:text-lg border-2 border-secondary-200 focus:outline-none focus:ring-2 focus:ring-emphasis focus:border-transparent pr-10 cursor-pointer"
        />
      </div>
    );
  }
);

export default Input;
