import React from 'react';
import { Button } from './Button';
import { PaginationProps } from '@/Utils/types';

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
}: PaginationProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        title="Prev"
        bgColor="bg-button-start"
        color="text-secondary"
        functionToPlay={onPrevClick}
        disabled={currentPage === 1}
      />
      <Button
        title="Next"
        bgColor="bg-button-start"
        color="text-secondary"
        functionToPlay={onNextClick}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};