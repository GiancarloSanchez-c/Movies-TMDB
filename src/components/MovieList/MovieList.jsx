import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../../api/tmdbApi";
import { MovieCard } from "../MovieCard/MovieCard";
import './MovieList.scss';

export const MovieList = (props) => {
  const [items, setItems] = useState([]);

  const getList = async () => {
    let response = null;
    const params = {};

    if (props.type !== "similar") {
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(props.type, { params });
          break;
        default:
          response = await tmdbApi.getTvList(props.type, { params });
      }
    } else {
      response = await tmdbApi.similar(props.category, props.id )
    }

    setItems(response.results)
  };

  useEffect(() => {
    getList();
  },[])

  return (
    <div className="movie-list">
      <Swiper grabCursor={true}  slidesPerView={'auto'}>
        {items.map((item,id) => (
          <SwiperSlide key={id}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
};
