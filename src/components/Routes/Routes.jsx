import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";

import Profile from "../Profile/Profile";
import SingleProduct from "../Products/SingleProduct";
import { ROUTES } from "../../utils/routes";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import Favourite from "../Favourites/Favourites";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.FAVOURITE} element={<Favourite />} />
    </Routes>
  );
};

export default AppRoutes;
