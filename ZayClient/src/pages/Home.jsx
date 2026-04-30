import React from "react";
import HeroSection from "../components/HeroSection";
import CategoriesOfMonth from "../components/CategoriesOfMonth";
import FeaturedProduct from "../components/FeaturedProduct";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesOfMonth />
      <FeaturedProduct />
      <Footer />
    </div>
  );
};

export default Home;
