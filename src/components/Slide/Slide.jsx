import { useState, useEffect, useRef } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import { apiConfig } from "../../api/apiConfig";

import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { ModalContent } from "../Modal/ModalContent";
import "./Slide.scss";
import { Button, OutlineButton } from "../button/Button";

export const Slide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);

  const getMovies = async () => {
    const params = { page: 1 };

    try {
      const response = await tmdbApi.getMoviesList(movieType.popular, { params });
      setMovieItems(response.results.slice(7, 11));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <HeroSlideItem item={item} className={`${isActive ? "active" : ""}`} />}
            </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {

  const item = props.item;

  let navigate = useNavigate();

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal.querySelector(".modal__content > iframe").setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div className={`hero-slide__item ${props.className}`} style={{ backgroundImage: `url(${background})` }}>
      <div className="hero-slide__item__content">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button className="btns__btn" onClick={() => navigate("/movie/" + item.id)}>Watch now</Button>
            <OutlineButton className="btns__btn-outline" onClick={setModalActive}>Watch trailer</OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} loading="lazy" width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};
