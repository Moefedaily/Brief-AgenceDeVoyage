import { ButtonProps } from '@/Utils/types';
import React from 'react';

export const Button = ({ title, bgColor, color, functionToPlay, disabled = false }: ButtonProps) => {
  return (
    <button
      className={`px-6 py-3 rounded-md font-montserrat transition duration-300 ease-in-out
      ${bgColor}
      ${color}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary  hover:shadow-lg'}
      `}
      onClick={functionToPlay}
      disabled={disabled}
    >
      {title}
    </button>
  );
};