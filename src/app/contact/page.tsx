'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createContact } from '../Services/contact';
import { Trip } from '../../Utils/types';

import toast from 'react-hot-toast';
import { getAllTrips } from '../Services/trip';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

 
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

  const handleSubmit = async () => {
      try {
      const token = localStorage.getItem('token');      
      const user_ = token ? JSON.parse(atob(token.split('.')[1])).id : null;      
    //  atob use to decode the (payload) who was at the first position in the token data which seperated by (.)
      const contactData = {
        name,
        email,
        phone,
        message,
        trip: selectedTripId,
        user_,
      };
      await createContact(contactData);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      toast.success('Thank you for contacting us!');
      setTimeout(() => {
        push('/user');
      }, 900);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="trip_id">Trip:</label>
        <select
          id="trip_id"
          value={selectedTripId}
          onChange={(e) => setSelectedTripId(Number(e.target.value))}
          required
        >
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.title}
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default ContactForm;