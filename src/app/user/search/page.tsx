"use client"
import { useEffect, useState } from 'react';
import { searchTrips } from '../../Services/trip';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Section } from '../../Components/Section';
import { useSearchParams } from 'next/navigation';
import { Oval } from 'react-loader-spinner'
import Hero from '@/app/Components/Hero';
import { SearchResultsSection } from '@/app/Components/SearchResultsSection';


export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tripsPerPage, setTripsPerPage] = useState(4);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const country = searchParams.get('country') || '';
    const duration = parseInt(searchParams.get('duration') || '0', 10);
  
    setIsLoading(true);
  
    searchTrips(category, country, duration)
      .then((res: any) => {
        setSearchResults(res.data);
      })
      .catch((error) => {
        console.error('Error searching trips:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <div>
      <Header />
      <Hero
        subtitle="Search Results for : "
        image="https://altours-html.asdesignsgalaxy.com/assets/images/Home/Home-2.jpg"
      />
      <div className="container mx-auto">
        {isLoading ? (
           <div className="flex justify-center items-center h-screen">
           <Oval
             height={80}
             width={80}
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
          <>
            {searchResults.length > 0 ? (
              <SearchResultsSection title="Search Results" trips={searchResults} tripsPerPage={tripsPerPage}/>
            ) : (
              <p>No search results found.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}