"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Section } from '../Components/Section';
import Hero from '../Components/Hero';    
import { getAllTrips, getTripsByCategory, searchTrips } from '../Services/trip'
import { SearchForm } from '../Components/SearchForm'


export default function HomePage () {
  const [trips, setTrips] = useState([])
  const [trendingTrips, setTrendingTrips] = useState([])
  const [topDestinationTrips, setTopDestinationTrips] = useState([])

 useEffect(() => {
    getAllTrips().then((res: any) => {
      setTrips(res.data)
    })
}, [])

useEffect(() => {
  getTripsByCategory('Trending').then((res: any) => {
    setTrendingTrips(res.data)
  })
  
  getTripsByCategory('Top Destinations').then((res: any) => {
    setTopDestinationTrips(res.data) 
  })
}, [])

function handleSearch(params: { category: string, country: string, duration: number }) {
  searchTrips(params.category, params.country, params.duration)
    .then(data => setTrips(data))
    .catch(error => console.error('Error searching trips:', error));
}

    return (
      <div>
        <Header />
        <Hero/>
        <div className="container mx-auto">
        <SearchForm onSearch={handleSearch} />
        <Section title="All Trips" trips={trips} />
        <Section title="Trending 2024" trips={trendingTrips} />
        <Section title="Top Destinations" trips={topDestinationTrips} />
        </div>
        <Footer />
      </div>
    );
  };
  

