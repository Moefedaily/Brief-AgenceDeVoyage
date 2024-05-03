import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchFormProps {
  onSearch: (params: { category: string | null, country: string, duration: number }) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  function handleSearch() {
    const durationValue = duration ? parseInt(duration) : 0;
    if (durationValue >= 0) {
      onSearch({ category, country, duration: durationValue });
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
                setCategory(null);
                setIsDropdownOpen(false);
              }}
            >
              Any
              
            </div>
            {categories.map((category) => (
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