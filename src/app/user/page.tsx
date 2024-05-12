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
        title="Explore the beauty of nature"
        subtitle="Discover the new you"
        image="https://altours-html.asdesignsgalaxy.com/assets/images/Home/Home-2.jpg"
        fullHeight
        showSearchBar
      />

        <AboutSection
        verticalImage1="https://travelpro-wp.laralink.com/wp-content/uploads/2024/03/video_block_2.jpeg"
        verticalImage2="https://travelpro-wp.laralink.com/wp-content/uploads/2024/03/video_block_2.jpeg"
        horizontalImage1="https://travelpro-wp.laralink.com/wp-content/uploads/2024/03/video_block_2.jpeg"
        horizontalImage2="https://travelpro-wp.laralink.com/wp-content/uploads/2024/03/video_block_2.jpeg"
        title="We are Professional Planners For your"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium delectus accusamus mollitia rem expedita dolore laboriosam ipsum aliquid nobis deserunt, sed aspernatur facere quidem eos enim perferendis harum atque dolor ducimus non! Fugiat quisquam sunt illo consequuntur. Ratione ea dolores ullam porro ab. Animi vero ratione dolor adipisci explicabo nulla!"

        buttonLink="https://trovatrip.com"
      />

      <ParallaxSection
        image="https://travelpro-wp.laralink.com/wp-content/uploads/2024/03/video_block_2.jpeg"
        title="Ready to Travel With Real Adventure And Enjoy Natural"
      />

        <div className="container mx-auto">
        <Section title="Trending 2024" trips={trendingTrips} sectionTitle='Popular Tours Packages'/>
        <Section title="Top Destinations" trips={topDestinationTrips} />
        </div>
        <ServicesSection />
        <Footer />
      </div>
    );
  };
  

