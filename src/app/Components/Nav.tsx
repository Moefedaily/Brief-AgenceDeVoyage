import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 mt-4">
      <div className="container mx-auto flex justify-between items-center py-4 px-8 bg-slate-300 bg-opacity-20 rounded-full">
        <div>
          <Link href="/" className="text-white text-xl font-bold font-merriweather">
            Travel Agency
          </Link>
        </div>
        <ul className="flex space-x-4 font-merriweather font-medium">
          <li>
            <Link href="/" className="text-white hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link href="/user" className="text-white hover:text-primary">
              Trips
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-primary">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}