import React from 'react'

export const TripCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  )
}