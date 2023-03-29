import { Route, Routes } from "react-router-dom";

import { Home, Detail, Catalogo } from "../pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/:category/search/:search" element={<Catalogo />} />

      <Route path="/:category" element={<Catalogo />} />

      <Route path="/:category/:id" element={<Detail />} />

      <Route path="/" exact element={<Home />} />
    </Routes>
  );
};
