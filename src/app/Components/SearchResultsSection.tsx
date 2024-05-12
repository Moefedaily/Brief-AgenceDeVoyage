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
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
      {!showAllSearchResults && trips.length > tripsPerPage && (
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-600">
            Showing {currentTrips.length} of {trips.length} results
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2"
            onClick={handleShowAllSearchResults}
          >
            Show All Results
          </button>
        </div>
      )}
    </section>
  );
};