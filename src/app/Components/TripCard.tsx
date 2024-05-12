import { GiWorld } from 'react-icons/gi';
import { TripCardProps } from '../../Utils/types';
import Link from 'next/link';

export const TripCard = ({ trip }: TripCardProps) => {
  const getDurationInDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMilliseconds = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg mx-1 my-2">
      <div className="absolute top-0 left-0 p-2 bg-slate-900 bg-opacity-50 rounded-br-lg">
        <p className="text-yellow-100 font-semibold">
          {getDurationInDays(trip.startDate, trip.endDate)} Days
        </p>
      </div>
      <img src={trip.image} alt={trip.title} className="w-full h-96 object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-white p-4">
        <h3 className="text-xl font-semibold mb-2 ">{trip.title}</h3>
          <div className="flex justify-between items-center">
          <div className="flex items-center mb-4">
            <GiWorld className="mr-2 text-gray-500" />
            <span className="text-gray-600 text-lg font-semibold">
            {trip.destinations && trip.destinations.map((country) => country.name).join(', ')}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">
              <span className="text-base font-semibold"> £ {trip.price}</span>
            </p>
          </div>
          <Link
            href={`/trips/${trip.id}`}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};