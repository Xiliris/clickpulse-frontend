import { forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, name, className }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={name} className="text-primary">
          {placeholder}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          ref={ref}
          className={`border-secondary-200 bg-transparent border-2 rounded-md px-4 py-2 w-full text-emphasis text-xl mt-1`}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
