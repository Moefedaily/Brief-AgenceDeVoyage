// Section.tsx
import React, { useState, useEffect } from 'react';
import { SectionProps } from '../../Utils/types';
import { TripCardContainer } from './TripCardContainer';
import { TripCard } from './TripCard';
import { Pagination } from './Pagination';

export const Section = ({ title, trips, isSearchResults = false }: SectionProps & { isSearchResults?: boolean }) => {
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
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {!isSearchResults && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(trips.length / tripsPerPage)}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        )}
      </div>
      {isSearchResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <TripCardContainer trips={currentTrips} />
      )}
    </section>
  );
};