import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../../api/tmdbApi";
import { Button } from "../button/Button";
import { Form } from "../Form/Form";

export const MoviesSearch = (props) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(props.search ? props.search : '');

  const searchMovie = useCallback(() => {
    if (search.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${search}`);
    }
  }, [search, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        searchMovie();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [search, searchMovie]);

  return (
    <div className="movie-search">
      <Form type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button className="small" onClick={searchMovie} >
        Search
      </Button>
    </div>
  );
};
