"use client"
import React, { useState, useEffect } from 'react';
import { getCategories } from '../Services/category';
import { SearchParams, categoryProps } from '../../Utils/types';
import { useRouter } from 'next/navigation'

export function SearchForm(){
    const { push } = useRouter()
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getCategories().then((res:any)=>{   
        setCategories(res.data);
  })
        }, []);

 
  function handleSearch() {
    const durationValue = duration ? parseInt(duration) : 0;
    if (durationValue >= 0) {
      const searchParams: SearchParams = {
        category,
        country,
        duration: durationValue,
      };

      const searchQuery = new URLSearchParams();

      if (searchParams.category !== '') {
        searchQuery.append('category', searchParams.category);
      }

      if (searchParams.country !== '') {
        searchQuery.append('country', searchParams.country);
      }

      if (searchParams.duration !== 0) {
        searchQuery.append('duration', searchParams.duration.toString());
      }

      const queryString = searchQuery.toString();
      push(`/user/search?${queryString}`);
    }
  }
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
      <input
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Where to?"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="number"
        placeholder="Duration (in days)"
        value={duration}
        min="0"
        onChange={(e) => setDuration(e.target.value)}
      />
      <div className="relative">
        <div
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{category === null ? 'Select Type' : category}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isDropdownOpen && (
          <div className="absolute mt-2 bg-white rounded-md shadow-lg z-10">
            <div
              key="any"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setCategory('');
                setIsDropdownOpen(false);
              }}
            >
              Any
            </div>
            {categories.map((category:categoryProps) => (
              <div
                key={category.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCategory(category.name);
                  setIsDropdownOpen(false);
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
        onClick={handleSearch}
      >
        Find Now
      </button>
    </div>
  );
}