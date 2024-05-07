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

  return (
    <div>
      <Header />
      {trip && (
        <Hero
          title={trip.country.name}
          subtitle={trip.title}
          image="https://altours-html.asdesignsgalaxy.com/assets/images/Home/Home-2.jpg"
        />
      )}
      <div className="container mx-auto">
        {trip ? (
          <div>
            <h1>{trip.title}</h1>
            <img src={trip.image} alt={trip.title} />
            <p>{trip.description}</p>
            <p>Price: {trip.price}</p>
          </div>
        ) : (
          <p>No similar trips found.<p/>
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TripDetailsPage;