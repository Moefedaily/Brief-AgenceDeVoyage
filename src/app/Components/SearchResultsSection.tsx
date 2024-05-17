import React, { useState, useEffect } from 'react';
import { TripCard } from './TripCard';
import { SearchResultsSectionProps } from '@/Utils/types';

export const SearchResultsSection = ({
  title,
  trips,
  tripsPerPage,
}: SearchResultsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllSearchResults, setShowAllSearchResults] = useState(false);
  const [currentTrips, setCurrentTrips] = useState<any[]>([]);

  useEffect(() => {
    const indexOfLastTrip = showAllSearchResults
      ? trips.length
      : currentPage * tripsPerPage;
    const indexOfFirstTrip = showAllSearchResults
      ? 0
      : indexOfLastTrip - tripsPerPage;
    setCurrentTrips(trips.slice(indexOfFirstTrip, indexOfLastTrip));
  }, [currentPage, showAllSearchResults, trips, tripsPerPage]);

  const handleShowAllSearchResults = () => {
    setShowAllSearchResults(true);
    setCurrentPage(1);
  };

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary font-merriweather">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
      {!showAllSearchResults && trips.length > tripsPerPage && (
        <div className="flex flex-col items-center mt-8">
          <p className="text-gray-700 text-lg font-roboto">
            Showing {currentTrips.length} of {trips.length} results
          </p>
          <button
            className="bg-primary text-white py-3 px-6 font-roboto rounded-lg mt-4 font-medium"
            onClick={handleShowAllSearchResults}
          >
            Show All Results 
          </button>
        </div>
      )}
    </section>
  );
};