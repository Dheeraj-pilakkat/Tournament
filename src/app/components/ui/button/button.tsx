// components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string|number;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`disabled:bg-gray-400 transition-all ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
