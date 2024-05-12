import React from 'react';
import { FaHome, FaMapMarkerAlt, FaSwimmer, FaWifi, FaParking, FaDumbbell } from 'react-icons/fa';
import Link from 'next/link';
import ServiceCard from './ServicesCard';

const ServicesSection = () => {
  return (
    <div className="bg-gray-200 p-8 my-10 mx-2 rounded-lg overflow-hidden shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3  lg:my-auto mx-auto ">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-primary font-montserrat mb-2">Our Services</h2>
              <p className="text-lg text-gray-600 font-roboto mb-4">What We Offer For Our Great Packages</p>
              <Link href="/contact">
                <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300 font-semibold">
                  Schedule a Trip
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-2/3 lg:pl-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <ServiceCard
                icon={<FaHome />}
                title="Luxury Hotel"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit." 
              />
              <ServiceCard
                icon={<FaMapMarkerAlt />}
                title="Attractive Location"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
              />
              <ServiceCard
                icon={<FaSwimmer />}
                title="Swimming Pool"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
              />
              <ServiceCard
                icon={<FaWifi />}
                title="Fast Speed WI-FI"
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