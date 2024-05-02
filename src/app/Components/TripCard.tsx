import { TripCardProps } from '../../Utils/types';
import Link from 'next/link';

export const TripCard = ({ trip }: TripCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg py-6 px-4">
      <img src={trip.image} alt={trip.title} className="w-full h-250 rounded-lg object-cover" />
        <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            <span className="text-sm">From</span>
            <span className="text-lg font-semibold"> £ {trip.price}</span>
          </p>
    
        </div>
        <div className="mt-4">
          <Link
            href={`/trips/${trip.id}`}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-8 rounded-lg text-sm font-medium"
          >
            Book Now →
          </Link>
      </div>
    </div>
  );
};