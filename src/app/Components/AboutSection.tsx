import { AboutSectionProps } from '@/Utils/types';
import React from 'react';
import { Button } from './Button';

const AboutSection = ({
  verticalImage1,
  verticalImage2,
  horizontalImage1,
  horizontalImage2,
  title,
  description,
  buttonLink,
}: AboutSectionProps) => {
  const handleButtonClick = () => {
    window.open(buttonLink, '_blank');
  };

  return (
    <div className="bg-bg mx-auto p-8">
      <div className="flex flex-col md:flex-row my-12 gap-4">
        <div className="md:w-2/4 grid grid-cols-2 grid-rows-1 gap-2 p-10">
          <div className="col-span-1 row-span-2">
            <img
              src={verticalImage1}
              alt="About Us"
              className="h-full w-full object-cover rounded-lg shadow-lg "
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={horizontalImage1}
              alt="About Us"
              className="h-52 w-full object-cover rounded-lg shadow-lg "
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={verticalImage2}
              alt="About Us"
              className="h-36 w-full object-cover rounded-lg shadow-lg "
            />
          </div>
          <div className="col-span-2 row-span-1">
            <img
              src={horizontalImage2}
              alt="About Us"
              className="h-36 w-full object-cover rounded-lg shadow-lg "
            />
          </div>
        </div>
        <div className="md:w-3/5 flex flex-col justify-center">
          <div className="p-8 bg-white rounded-lg shadow-lg ">
            <h2 className="text-3xl font-bold text-primary font-merriweather mb-4">
              {title}
            </h2>
            <p className="text-teratery font-roboto text-lg mb-6">{description}</p>
            <Button
              title="Read More"
              bgColor="bg-primary"
              color="text-white"
              functionToPlay={handleButtonClick}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;