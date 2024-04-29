import React from 'react';
import Link from 'next/link';

export default function Nav(){
  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div>
            <Link href="/" className="text-white text-xl font-bold">Travel Agency</Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white">Home</Link>
            </li>
            <li>
              <Link href="/trips" className="text-white">All Trips</Link>
            </li>
            <li>
              <Link href="/contact" className="text-white">Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};

