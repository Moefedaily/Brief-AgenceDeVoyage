import { ParallaxSectionProps } from '@/Utils/types';
import React from 'react';
import { Parallax } from 'react-parallax';



const ParallaxSection = ({
  image,
  title,
}
:ParallaxSectionProps
) => {

   
  return (
    <Parallax className="rounded-lg  h-96 mb-8" bgImage={image} >
    <div className="container mx-30 py-40 flex items-center ">
        <div className="max-w-md ml-48">
        <h2 className="text-4xl font-bold font-montserrat text-white mb-4">{title}</h2>
      </div>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;