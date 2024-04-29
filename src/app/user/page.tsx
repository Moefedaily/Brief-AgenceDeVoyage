"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Section } from '../Components/Section';
import Hero from '../Components/Hero';    


export default function HomePage () {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8000/trips')
        setTrips(response.data)
      } catch (error) {
        console.error('Failed to fetch latest trips:', error)
      }
    }

    fetchTrips()
  }, [])

    return (
      <div>
        <Header />
        <Hero/>
        <div className="container mx-auto">
          <Section title="Trending 2024" trips={trips} />
          <Section title="Top Destinations" trips={trips} />
        </div>
        <Footer />
      </div>
    );
  };
  

