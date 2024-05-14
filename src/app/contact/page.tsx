'use client'
import React, { useState, useEffect } from 'react';
import { getAllTrips } from '../Services/trip';
import { Trip } from '../../Utils/types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import ContactForm from '../Components/ContactForm';
import ServiceCard from '../Components/ServicesCard';
import Map from '../Components/Map';
import { Oval } from 'react-loader-spinner';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { FaHeadset } from 'react-icons/fa6';

const ContactPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await getAllTrips();
        setTrips(res.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <Header />
      <Hero
        title="Contact Us"
        image="path/to/contact-hero-image.jpg"
      />
     <div className="container mx-auto py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <ServiceCard
      icon={<FaMapMarkerAlt />}
      title="Office Address"
      description="10 Diego Armando Maradona street Lanús, IN 1960"
    />
    <ServiceCard
      icon={<FaPhone />}
      title="Phone Call"
      description="+98 234 (4567) 890 +98 234 (4567) 890"
    />
    <ServiceCard
      icon={<FaEnvelope />}
      title="E-Mail Us"
      description="Maradona.10@gmail.com Diego.10@gmail.com"
    />
    <ServiceCard
      icon={<FaHeadset/>}
      title="Supports"
      description="24/7 any time support team ready for supports."
    />
  </div>
</div>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Form</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Oval
              height={40}
              width={40}
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
        ) : (
          <div className="max-w-3xl mx-auto">
            <ContactForm trips={trips} />
          </div>
        )}
      </div>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
        <Map />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;