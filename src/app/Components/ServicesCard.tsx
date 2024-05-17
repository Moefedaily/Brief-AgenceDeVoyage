import { ServiceCardProps } from '../../Utils/types';

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-bg rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="text-primary text-2xl mr-4">{icon}</div>
        <h3 className="text-button-start text-xl font-bold">{title}</h3>
      </div>
      <p className="text-primary">{description}</p>
    </div>
  );
};

export default ServiceCard;