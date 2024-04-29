import { TripCardProps } from '../../Utils/types';
import Link from 'next/link';

export const TripCard = ({ trip }: TripCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
        <p className="text-sm mb-4">{trip.description}</p>
        <Link className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
            href={`/trips/${trip.id}`}>
            Book Now
        </Link>
      </div>
    </div>
  );
};