import { HeroProps } from '@/Utils/types';
import React from 'react';
import { SearchForm } from './SearchForm';

const Hero = ({ title, subtitle, image, fullHeight = false, showSearchBar = false }: HeroProps) => {
  const heroHeight = fullHeight ? 'h-screen' : 'h-[400px]';

  return (
    <div className={`relative ${heroHeight}`}>
      <img src={image} alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-bl from-button-start to-button-end opacity-35"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <div className='my-auto mx-auto'>
          <h1 className="text-5xl font-bold mt-20 text-white font-merriweather ">{title}</h1>
          <p className="text-xl  text-bg font-montserrat">{subtitle}</p>
        </div>
        {showSearchBar && (
          <div className="mb-8 w-full lg:w-2/3 mt-auto">
            <SearchForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;