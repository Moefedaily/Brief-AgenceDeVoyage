import React from 'react';
import { TripCard } from './TripCard';
import { SectionProps } from '../../Utils/types';
import { TripCardContainer } from './TripCardContainer';

export const Section = ({ title, trips }: SectionProps) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <TripCardContainer>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </TripCardContainer>
    </section>
  );
};