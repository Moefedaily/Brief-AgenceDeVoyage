'use client';

import { useEffect, useState } from 'react';
import { getTripDetails } from '../../Services/trip';
import { Trip } from '../../../Utils/types';
import { Oval } from 'react-loader-spinner';
import Header from '@/app/Components/Header';
import Footer from '@/app/Components/Footer';
import Hero from '@/app/Components/Hero';

const TripDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTripDetails(params.id)
      .then((res: any) => {
        setTrip(res.data);
      })
      .catch((error) => {
        console.error('Error fetching trip details:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#f49d0c"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f49d0c"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  function getDurationInDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMilliseconds = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  return (
    <div>
      <Header />
      {trip && (
        <Hero
          title={trip.destinations && trip.destinations.map((country) => country.name).join(', ')}
          subtitle={trip.title}
          image="/trip-hero.jpg"
          fullHeight
        />
      )}
      <div className="container w-11/12 mx-auto">
        {trip ? (
          <div className="mt-12">
            <div className="mb-8 flex items-baseline">
              <h1 className="text-4xl font-bold mr-4 text-button-start font-merriweather">{trip.title}</h1>
              <p className="text-2xl text-teratery">£ {trip.price}</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 md:pr-8">
                <img src={trip.image} alt={trip.title} className="w-full mb-8 rounded-lg shadow-lg" />
                <p className="text-lg leading-relaxed mb-8 text-primary">{trip.description}</p>
              </div>
              <div className="md:w-1/3">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 text-primary font-merriweather">Basic Information</h2>
                  <p className="text-lg mb-2 text-button-start">
                    <span className="font-semibold text-teratery">Destination: </span>
                    {trip.destinations && trip.destinations.map((country) => country.name).join(', ')}
                  </p>
                  <p className="text-lg mb-2 text-button-start">
                    <span className="font-semibold text-teratery">Duration: </span>
                    {getDurationInDays(trip.startDate, trip.endDate)} days
                  </p>
                  <p className="text-lg mb-4 text-button-start">
                    <span className="font-semibold text-teratery">Departure: </span>
                    {new Date(trip.startDate).toLocaleDateString('FR')}
                  </p>
                  <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No trip details found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TripDetailsPage;