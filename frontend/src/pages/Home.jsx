import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import TypesOfProducts from "../components/Product/TypesOfProducts";
import NewArrivals from "../components/Product/NewArrivals";
import ProductDetails from "../components/Product/ProductDetails";
import ProductGrid from "../components/Product/ProductGrid";
import FeaturedCollection from "../components/Product/FeaturedCollection";
import FeaturesSection from "../components/Product/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";


const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Unisex",
        category: "Furniture",
        limit: 8,
      })
    );
    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
          setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch])
  return (
    <div>
      <Hero />
      <TypesOfProducts />
      <NewArrivals />

      {/* Best Seller Section */}
      <section className="my-10">
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
        {bestSellerProduct ? (<ProductDetails productId = {bestSellerProduct._id} />)
        :(
          <p className="text-center"> Loading best seller product ...</p>
        )}
      </section>

      {/* Top Furniture Section */}
      <section className="container mx-auto my-10">
        
        <ProductGrid products={products} loading={loading} error={error} />
      </section>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
