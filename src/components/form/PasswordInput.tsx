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
        <label htmlFor={name} className="sr-only">
          {placeholder}
        </label>
        <div className="relative block w-full">
          <input
            type={showPassword}
            placeholder={placeholder}
            name={name}
            ref={ref}
            onChange={onChange}
            className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-200 rounded-lg sm:text-lg border-2 border-secondary-200 focus:outline-none focus:ring-2 focus:ring-emphasis focus:border-transparent pr-10 cursor-pointer"
          />
          <i
            className={`fa-regular ${showIcon} text-secondary-100 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2`}
            onClick={toggleInput}
          ></i>
        </div>
      </div>
    );
  }
);

export default PasswordInput;
