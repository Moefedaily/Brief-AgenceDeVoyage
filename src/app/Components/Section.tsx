// src/components/Section.tsx
import React, { useState } from 'react';
import { SectionProps } from '../../Utils/types';
import { TripCardContainer } from './TripCardContainer';
import { Pagination } from './Pagination';

export const Section = ({ title, trips }: SectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 4;

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

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
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(trips.length / tripsPerPage)}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      </div>
      <TripCardContainer trips={currentTrips} />
    </section>
  );
};