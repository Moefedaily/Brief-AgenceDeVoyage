import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CarouselProps } from '../../Utils/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export const Carousel = ({ children }: CarouselProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
       >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};