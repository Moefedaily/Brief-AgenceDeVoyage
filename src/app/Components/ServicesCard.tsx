import { ServiceCardProps } from '@/Utils/types';
import React from 'react';



const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col items-center">
          <div className="text-4xl text-primary mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        </div>
      );
    };

export default ServiceCard;