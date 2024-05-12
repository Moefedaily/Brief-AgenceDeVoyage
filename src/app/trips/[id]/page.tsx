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
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
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
          title= {trip.destinations && trip.destinations.map((country) => country.name).join(', ')}
          subtitle={trip.title}
          image="https://altours-html.asdesignsgalaxy.com/assets/images/Home/Home-2.jpg"
        />
      )}
      <div className="container w-11/12 mx-auto">
      {trip ? (
          <div className='mt-12'>
            <div className="mb-8 flex items-baseline">
              <h1 className="text-4xl font-bold mr-4">{trip.title}</h1>
              <p className="text-2xl text-gray-600">£ {trip.price}</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 md:pr-8">
                <img src={trip.image} alt={trip.title} className="w-full mb-8 rounded-lg shadow-md " />
                <p className="text-lg leading-relaxed mb-8">{trip.description}</p>
              </div>
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Destination: </span> 
                    {trip.destinations && trip.destinations.map((country) => country.name).join(', ')}
                  </p>
                <p className="text-lg mb-2">
                <span className="font-semibold">Duration: </span>
                {getDurationInDays(trip.startDate, trip.endDate)} days
                </p>
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Departure: </span>
                    {new Date(trip.startDate).toLocaleDateString('FR')} 
                  </p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
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