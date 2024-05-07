import React from 'react';
import { Carousel } from './Carousel';
import { TripCard } from './TripCard';
import { Trip } from '../../Utils/types';

type TripCardContainerProps = {
  trips: Trip[];
};

export const TripCardContainer = ({ trips }: TripCardContainerProps) => {
  return (
    <Carousel>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </Carousel>
  );
};

 