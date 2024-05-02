"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Section } from '../Components/Section';
import Hero from '../Components/Hero';    
import { getAllTrips } from '../Services/trip'


export default function HomePage () {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    getAllTrips().then((res: any) => {
      setTrips(res.data)
    })
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
  

