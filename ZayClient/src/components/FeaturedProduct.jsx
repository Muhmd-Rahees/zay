// import React, { useEffect, useState } from "react";
// import axiosInstance from "../config/axiosConfig";
// import { useNavigate } from "react-router-dom";

// import gym from "../assets/gym.jpg";
// import hoodies from "../assets/hoodies.jpg";
// import sports from "../assets/sports.png";

// // const Featured_products = [
// //   {
// //     title: "Gym Equipments",
// //     image: gym,
// //     description:
// //       "Power your gains with high-grade strength training gear. From adjustable dumbbells to Olympic barbells, each piece is crafted for comfort, grip, and control—perfect for beginners and pros alike.",
// //   },
// //   {
// //     title: "Sport Items",
// //     image: sports,
// //     description:
// //       "Engineered for champions. Our elite sports range features precision-crafted equipment and apparel trusted by professionals—now available for your game.",
// //   },
// //   {
// //     title: "Hoodies",
// //     image: hoodies,
// //     description:
// //       "Made with premium cotton blends, our hoodies offer a relaxed fit, durable stitching, and signature branding—built to last and layer with ease.",
// //   },
// // ];

// const FeaturedProduct = () => {
//   const [featured, setFeatured] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFeatured = async () => {
//       try {
//         const response = await axiosInstance.get("/api/product/list-product");

//         if (response.data?.success && Array.isArray(response.data.product)) {
//           const featuredProducts = response.data.product.filter(
//             (item) => item.featuredProducts === true
//           );
//           setFeatured(featuredProducts.slice(0, 3)); // Optional limit
//         }
//       } catch (error) {
//         console.error("Error fetching featured products:", error);
//       }
//     };

//     fetchFeatured();
//   }, []);
//   return (
//     <section className="text-center bg-gray-200 py-16">
//       {featured.length > 0 && (
//         <>
//           <h1 className="text-4xl font-light text-gray-800 mt-12 mx-auto px-4">
//             Featured Products
//           </h1>
//           <p className="text-gray-600 mt-2 mb-12 mx-auto px-4">
//             "Handpicked Favorites Just for You – Discover What’s Trending Now!"
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
//             {featured.map((Products, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden"
//               >
//                 <img
//                   onClick={() => navigate(`/single-product/${Products.pId}`)}
//                   src={Products.images}
//                   alt={Products.name}
//                   className="w-full h-80 object-cover cursor-pointer"
//                 />
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h5 className="text-lg font-semibold text-gray-800 mb-2">
//                     {Products.name}
//                   </h5>
//                   <p className="text-sm text-gray-600 flex-grow">
//                     {Products.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default FeaturedProduct;






import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const FeaturedProduct = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axiosInstance.get("/api/product/list-product");

        if (response.data?.success && Array.isArray(response.data.product)) {
          const featuredProducts = response.data.product.filter(
            (item) => item.featuredProducts === true
          );
          setFeatured(featuredProducts.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="text-center bg-gray-100 py-16 px-4 sm:px-8">
      {featured.length > 0 && (
        <>
          <h1 className="text-4xl font-semibold text-gray-800">Featured Products</h1>
          <p className="text-gray-600 mt-2 mb-12 text-base sm:text-lg">
            "Handpicked Favorites Just for You – Discover What’s Trending Now!"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
            {featured.map((product, index) => (
              <div
                key={index}
                className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  onClick={() => navigate(`/single-product/${product.pId}`)}
                  className="cursor-pointer aspect-[3/4] w-full overflow-hidden"
                >
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h5>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedProduct;
