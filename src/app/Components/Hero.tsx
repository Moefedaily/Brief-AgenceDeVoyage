import { HeroProps } from '@/Utils/types';
import React from 'react';

const Hero = ({ title, subtitle, image, fullHeight = false }: HeroProps) => {
    const heroHeight = fullHeight ? 'h-screen' : 'h-[400px]';
  
    return (
      <div className={`relative ${heroHeight}`}>
        <img src={image} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-35"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl">{subtitle}</p>
        </div>
      </div>
    );
  };

export default Hero;



