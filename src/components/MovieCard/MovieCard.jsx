import { Link } from "react-router-dom";
import { apiConfig } from "../../api/apiConfig";
import { category } from "../../api/tmdbApi";
import { Button } from "../button/Button";
import "./MovieCard.scss";

export const MovieCard = (props) => {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button className="movie-card__btn">
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3 className="movie-card__title">{item.title || item.name}</h3>
    </Link>
  );
};
