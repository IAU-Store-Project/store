import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import BasketPage from "./Pages/BasketPage";
import ProfilePage from "./Pages/ProfilePage";
import CategoryPage from "./Pages/CategoryPage";
import AboutPage from "./Pages/AboutPage";
import ProductPage from "./Pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/category/:category_name" element={<CategoryPage />} />
        <Route path="/product/:pname/:pid" element={<ProductPage />} exact={true} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
