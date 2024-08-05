import { forwardRef, useState } from "react";

interface PasswordInputProps {
  placeholder: string;
  name: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, name, className = "", onChange }, ref) => {
    const [showPassword, setShowPassword] = useState<string>("password");
    const [showIcon, setShowIcon] = useState<string>("fa-eye-slash");

    function toggleInput() {
      if (showPassword === "password") {
        setShowPassword("text");
        setShowIcon("fa-eye");
      } else {
        setShowPassword("password");
        setShowIcon("fa-eye-slash");
      }
    }

    return (
      <div className={`w-full ${className}`}>
        <label htmlFor={name} className="text-primary">
          {placeholder}
        </label>
        <div
          className={`border-secondary-200 bg-transparent border-2 rounded-md px-4 py-2 w-full text-emphasis text-xl mt-1 flex justify-between items-center text-center ${className}`}
        >
          <input
            type={showPassword}
            placeholder={placeholder}
            name={name}
            ref={ref}
            onChange={onChange}
            className="w-full bg-transparent cursor-pointer focus:outline-none"
          />
          <i
            className={`fa-regular ${showIcon} text-secondary-100 cursor-pointer w-6`}
            onClick={() => toggleInput()}
          ></i>
        </div>
      </div>
    );
  }
);

export default PasswordInput;
