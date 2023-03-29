import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import { OutlineButton } from "../button/Button";
import { MovieCard } from "../MovieCard/MovieCard";
import { MoviesSearch } from "../MoviesSearch/MoviesSearch";
import './Movies.scss';


export const Movies = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { search } = useParams();

  const getList = async () => {
    let response = null;
    if (search === undefined) {
      const params = {};
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        query: search,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems(response.results);
    setTotalPage(response.total_pages);
  };

  const loadMore = async () => {
    let response = null;
    if (search === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: search,
      };
      response = await tmdbApi.search(props.category, { params });
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    getList();
  }, [props.category, search]);

  return (

    <>
      <div className="section">
        <MoviesSearch category={props.category} search={search} />
      </div>

      <div className="movies-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      
      {page < totalPage && (
        <div className="movies-grid__more">
          <OutlineButton className="small" onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      )}

    </>

  )
};
