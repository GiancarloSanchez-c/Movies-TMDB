import { Link } from "react-router-dom";
import { Slide, MovieList } from "../components";
import { category, movieType, tvType } from "../api/tmdbApi";
import "./Home.scss";
import { OutlineButton } from "../components/button/Button";

export const Home = () => {
  return (
    <>
      <Slide />
      <div className="home">
        <div className="section">
          <div className="section__header">
            <h2 className="home__h2"> Trending Movies</h2>
            <Link to="/movie" title="movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section">
          <div className="section__header">
            <h2 className="home__h2"> Top Rated Movies </h2>
            <Link to="/movie" title="movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section">
          <div className="section__header">
            <h2 className="home__h2"> Top Rated Series </h2>
            <Link to="/movie" title="movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.popular} />
        </div>

        <div className="section">
          <div className="section__header">
            <h2 className="home__h2"> Top Rated Tv </h2>
            <Link to="/movie" title="movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.top_rated} />
        </div>
      </div>
    </>
  );
};
