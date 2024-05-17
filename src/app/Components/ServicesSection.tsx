import React from 'react';
import { FaHome, FaMapMarkerAlt, FaSwimmer, FaWifi, FaParking, FaDumbbell } from 'react-icons/fa';
import Link from 'next/link';
import ServiceCard from './ServicesCard';
import { RiDiscountPercentLine, RiGuideFill } from 'react-icons/ri';
import { MdOutlineTour } from 'react-icons/md';
import { GrMapLocation } from 'react-icons/gr';

const ServicesSection = () => {
  return (
    <div className="bg-white py-28 my-3  rounded-lg overflow-hidden shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3  lg:my-auto mx-auto ">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-primary font-merriweather mb-2">Our Services</h2>
              <p className="text-lg text-gray-600 font-roboto mb-4">What We Offer For Our Great Packages</p>
              <Link href="/contact">
                <button className="bg-primary text-white px-6 py-3 sm:mb-4 rounded-md hover:bg-primary-dark transition-colors duration-300 font-semibold">
                  Schedule a Trip
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-2/3 lg:pl-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <ServiceCard
                icon={<RiDiscountPercentLine/>} 
                title="Best Price Guarantee"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit." 
              />
              <ServiceCard
                icon={<GrMapLocation/>}
                title="Attractive Location"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
              />
              <ServiceCard
                icon={<RiGuideFill />}
                title="Expert Local Guides"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
              />
              <ServiceCard
                icon={<MdOutlineTour/>}
                title="Hand picked Tours"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
              />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;