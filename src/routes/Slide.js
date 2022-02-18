import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/autoplay";
import {IMAGE_BASE_URL } from '../config';
import { Link } from 'react-router-dom';

export default function Slide({trending}) {
 
  return (
    <Swiper
    modules={[Pagination, Autoplay]}
    
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      
    >
     {trending && trending.map(movie=> (
        <SwiperSlide key={movie.id}
        style={{position:'relative'}}      
        >
           <Link to={`/movie=${movie.id}`} >
           <img alt={movie.original_title}
            src={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
            className='slideImg'
            >
            </img>
            <h1 style={{
                position:'absolute',
                bottom:'20%',
                left:'5%',
                color:'white'
            }}>{movie.title}
            </h1>
            </Link>
        </SwiperSlide>
     ))}
    </Swiper>
  )
}
