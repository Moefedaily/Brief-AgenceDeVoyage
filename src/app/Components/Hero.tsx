import React from 'react';

const Hero = () => {
  return (
    <div className="relative">
           <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the beauty of nature</h1>
        <p className="text-xl md:text-2xl">Discover the new you</p>
      </div>
      <div className="relative">
        <img src="https://altours-html.asdesignsgalaxy.com/assets/images/Home/Home-2.jpg" alt="Hero" className="w-full h-screen object-cover" />
        <div className="absolute inset-0 bg-black opacity-35"></div>
      </div>
      </div>
    
  );
};

export default Hero;