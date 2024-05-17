"use client"
import { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Section } from '../Components/Section';
import Hero from '../Components/Hero';    
import { getAllTrips, getTripsByCategory, searchTrips } from '../Services/trip'
import AboutSection from '../Components/AboutSection';
import ParallaxSection from '../Components/ParallaxSection';
import ServicesSection from '../Components/ServicesSection';
import { useRouter } from 'next/router';


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

    return (
      <div>
        <Header />

        <Hero
        title="Be a Traveler not a Tourist"
        subtitle="Travel to the any corner of the world, without going around in circles"
        image="/hero.jpg"
        fullHeight
        showSearchBar
      />

        <AboutSection
        verticalImage1="/paris.jpg"
        verticalImage2="/vinece.jpg"
        horizontalImage1="/london.jpg"
        horizontalImage2="/lisbon.jpg"
        title="About Us"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium delectus accusamus mollitia rem expedita dolore laboriosam ipsum aliquid nobis deserunt, sed aspernatur facere quidem eos enim perferendis harum atque dolor ducimus non! Fugiat quisquam sunt illo consequuntur. Ratione ea dolores ullam porro ab. Animi vero ratione dolor adipisci explicabo nulla!"

        buttonLink="https://trovatrip.com"
      />

      <ParallaxSection
        image="https://travelpro-wp.laralink.com/wp-content/uploads/2024/03/video_block_2.jpeg"
        title="Ready to Travel With Real Adventure And Enjoy Natural"
      />

        <div className=" mx-auto">
        <Section title="Trending 2024" trips={trendingTrips} sectionTitle='Popular Tours Packages'/>
        <Section title="Top Destinations" trips={topDestinationTrips} />
        </div>
        <ServicesSection />
        <Footer />
      </div>
    );
  };
  

