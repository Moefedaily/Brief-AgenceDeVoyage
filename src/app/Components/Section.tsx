import React, { useState, useEffect } from 'react';
import { SectionProps } from '../../Utils/types';
import { TripCardContainer } from './TripCardContainer';
import { Pagination } from './Pagination';

export const Section = ({ title, trips,sectionTitle}: SectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 4;

  const [currentTrips, setCurrentTrips] = useState<any[]>([]);

  useEffect(() => {
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
    setCurrentTrips(trips.slice(indexOfFirstTrip, indexOfLastTrip));
  }, [currentPage, trips, tripsPerPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(trips.length / tripsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="py-8 bg-bg rounded-lg shadow-md">
    <div className="container mx-auto px-4">
      <div>  
    <h3 className="text-center text-3xl font-bold text-primary py-6 font-merriweather mb-6">
    {sectionTitle}
    </h3>
         </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className=" text-2xl font-bold text-gray-600 font-montserrat">{title}</h2>
       
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(trips.length / tripsPerPage)}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
      </div>
     
        <TripCardContainer trips={currentTrips} />
      
      </div>
    </section>
  );
};