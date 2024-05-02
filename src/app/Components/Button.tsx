import { ButtonProps } from '@/Utils/types';
import React from 'react';


export const Button = ({ title, bgColor , color , functionToPlay , disabled = false,}: ButtonProps) => {
  
    return (
    <button
      className={`px-4 py-2 rounded-md 
      ${bgColor}
      ${color} 
      ${ disabled ? 'opacity-50' : ''}`}
      onClick={functionToPlay}
      disabled={disabled}>
      {title}
    </button>
  );
};