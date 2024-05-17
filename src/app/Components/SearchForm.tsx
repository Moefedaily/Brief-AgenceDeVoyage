"use client"
import React, { useState, useEffect } from 'react';
import { getCategories } from '../Services/category';
import { SearchParams, categoryProps } from '../../Utils/types';
import { useRouter } from 'next/navigation'
import { FiChevronDown } from 'react-icons/fi';

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
    <div className=" flex justify-between items-center py-2 px-10 bg-teratery bg-opacity-15 rounded-full" >
      <div className="grid grid-cols-4 gap-4 text-secondary">
        <input
          className="col-span-1 bg-transparent px-6 py-3 rounded-lg border border-secondary focus:outline-none focus:ring-2 focus:ring-button-end text-secondary font-medium text-lg placeholder-secondary"
          type="text"
          placeholder="Where to?"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          className="col-span-1 bg-transparent px-6 py-3 rounded-lg border border-secondary focus:outline-none focus:ring-2 focus:ring-button-end text-secondary font-medium text-lg placeholder-secondary"
          type="number"
          placeholder="Duration(days)"
          value={duration}
          min="0"
          onChange={(e) => setDuration(e.target.value)}
        />
        <div className="col-span-1 relative">
          <div
            className="flex items-center px-6 py-3 rounded-lg border border-secondary cursor-pointer text-secondary font-medium text-lg "
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="truncate">{category === '' ? 'Select Type' : category}</span>
            <FiChevronDown className="h-6 w-6 ml-2 text-secondary" />
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white text-primary rounded-md shadow-lg z-10 w-full  ">
              <div
                key="any"
                className="px-4 py-2 cursor-pointer hover:bg-secondary truncate"
                onClick={() => {
                  setCategory('');
                  setIsDropdownOpen(false);
                }}
              >
                Any
              </div>
              {categories.map((category: categoryProps) => (
                <div
                  key={category.id}
                  className="px-4 py-2 cursor-pointer hover:bg-secondary truncate"
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
          className="col-span-1 px-6 py-3 bg-button-start text-white rounded-lg hover:bg-teratery transition duration-300 font-semibold text-lg"
          onClick={handleSearch}
        >
          Find Now
        </button>
      </div>
    </div>
  );
}