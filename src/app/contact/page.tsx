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
        image="/contact-hero.jpg"
        fullHeight
      />

      <div className=" px-10 mx-auto bg-bg w-full py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon={<FaMapMarkerAlt className="text-primary" />}
            title="Office Address"
            description="10 Diego Armando Maradona street Lanús, IN 1960"
          />
          <ServiceCard
            icon={<FaPhone className="text-primary" />}
            title="Phone Call"
            description="+98 234 (4567) 890 +98 234 (4567) 890"
          />
          <ServiceCard
            icon={<FaEnvelope className="text-primary" />}
            title="E-Mail Us"
            description="Maradona.10@gmail.com Diego.10@gmail.com"
          />
          <ServiceCard 
            icon={<FaHeadset className="text-primary" />}
            title="Supports"
            description="24/7 any time support team ready for supports."
          />
        </div>
      </div>

      <div className="mx-auto bg-bg rounded shadow-md py-32">
        <h2 className="text-3xl font-bold mb-8 text-center font-merriweather text-primary">Contact Form</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Oval
              height={40}
              width={40}
              color="#f49d0c"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#f49d0c"
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

      <div className=" w-10/12 rounded-md shadow-lg mx-auto  pt-10 pb-10">
        <h2 className="text-3xl font-bold mb-8 text-center font-merriweather text-primary">Our Location</h2>
        <Map />
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;