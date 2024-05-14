import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContact } from '../Services/contact';
import { ContactFormProps, Trip } from '../../Utils/types';
import toast from 'react-hot-toast';



const ContactForm = ({ trips }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTripId, setSelectedTripId] = useState<number>(0);
  const { push } = useRouter();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_ = token ? JSON.parse(atob(token.split('.')[1])).id : null;
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2 font-bold text-gray-700">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2 font-bold text-gray-700">
          Message:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="trip_id" className="block mb-2 font-bold text-gray-700">
          Trip:
        </label>
        <select
          id="trip_id"
          value={selectedTripId}
          onChange={(e) => setSelectedTripId(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a trip</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;