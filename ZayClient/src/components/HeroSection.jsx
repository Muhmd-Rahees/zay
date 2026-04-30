// import React, { useEffect, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// import bg1 from "../assets/bg.jpg";
// import bg2 from "../assets/bg3.jpg";
// import bg3 from "../assets/bg2.jpeg";

// const slides = [
//   {
//     image: bg1,
//     title: "Illuminate Your Space",
//     subtitle: "Modern Elegance, Timeless Glow",
//     description:
//       "Discover the perfect blend of style and functionality with designer table lamps. Crafted for cozy corners and productive workspaces, each piece adds a warm, inviting touch to any room. Shop now and brighten up your moments.",
//   },
//   {
//     image: bg2,
//     title: "Eco-Friendly Ambience",
//     subtitle: "Natural Design, Green Future",
//     description:
//       "Bring sustainability to your home with our eco-conscious lighting collections. Crafted for beauty and responsibility.",
//   },
//   {
//     image: bg3,
//     title: "Step into Style",
//     subtitle: "Minimalist Comfort Meets Function",
//     description:
//       "Our footwear collection is perfect for daily wear with unmatched simplicity and sophistication.",
//   },
// ];

// const HeroSection = () => {
//   const [index, setIndex] = useState(0);

//   const preSlide = () => {
//     setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section
//       className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen bg-cover bg-center bg-no-repeat text-white shadow-md transition-all duration-500"
//       style={{ backgroundImage: `url(${slides[index].image})` }}
//     >
//       {/* Overlay for better text readability */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       <div className="relative z-10 container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-8 h-full">

//         {/* Left Chevron */}
//         <div className="flex items-center">
//           <FaChevronLeft
//             onClick={preSlide}
//             className="text-white text-3xl sm:text-5xl cursor-pointer hover:text-gray-300 hidden md:block transition-colors duration-300"
//           />
//         </div>

//         {/* Text Content */}
//         <div className="max-w-xl text-left space-y-4 md:ml-auto px-4 py-8 md:py-16">
//           <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight">
//             {slides[index].title}
//           </h1>
//           <h2 className="text-base sm:text-xl md:text-2xl font-light">
//             {slides[index].subtitle}
//           </h2>
//           <p className="text-sm sm:text-base md:text-lg">
//             {slides[index].description}
//           </p>
//         </div>

//         {/* Right Chevron */}
//         <div className="flex items-center">
//           <FaChevronRight
//             onClick={nextSlide}
//             className="text-white text-3xl sm:text-5xl cursor-pointer hover:text-gray-300 hidden md:block transition-colors duration-300"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

/* HeroSection.jsx */
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";

import bg1 from "../assets/bg.jpg";
import bg2 from "../assets/bg3.jpg";
import bg3 from "../assets/bg2.jpeg";

const slides = [
  {
    image: bg1,
    title: "Illuminate Your Space",
    subtitle: "Modern Elegance, Timeless Glow",
    description:
      "Discover the perfect blend of style and functionality with designer table lamps. Crafted for cozy corners and productive workspaces, each piece adds a warm, inviting touch to any room. Shop now and brighten up your moments.",
    cta: "Shop Lighting",
    accent: "from-amber-500 to-orange-600",
  },
  {
    image: bg2,
    title: "Eco-Friendly Ambience",
    subtitle: "Natural Design, Green Future",
    description:
      "Bring sustainability to your home with our eco-conscious lighting collections. Crafted for beauty and responsibility.",
    cta: "Go Green",
    accent: "from-green-500 to-emerald-600",
  },
  {
    image: bg3,
    title: "Step into Style",
    subtitle: "Minimalist Comfort Meets Function",
    description:
      "Our footwear collection is perfect for daily wear with unmatched simplicity and sophistication.",
    cta: "Shop Footwear",
    accent: "from-blue-500 to-indigo-600",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const prevSlide = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const nextSlide = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  const toggleAutoplay = () => setIsPlaying((p) => !p);

  /* autoplay */
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [isPlaying]);

  return (
    <section className="relative isolate w-full">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-[6000ms] ease-out will-change-transform"
        style={{
          backgroundImage: `url(${slides[index].image})`,
          transform: "scale(1.08)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/60 sm:bg-black/50 lg:bg-black/40" />

      {/* MAIN GRID */}
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-32 min-h-[60vh] lg:min-h-screen">
        {/* text column */}
        <div className="flex flex-col justify-center lg:col-span-7 order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-5">
            {slides[index].title}
          </h1>
          <h2
            className={`text-lg sm:text-xl md:text-2xl font-light bg-clip-text text-transparent bg-gradient-to-r ${slides[index].accent} mb-4`}
          >
            {slides[index].subtitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mb-8">
            {slides[index].description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              className={`relative px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r ${slides[index].accent} shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60`}
            >
              {slides[index].cta}
            </button>

            <button
              onClick={toggleAutoplay}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/60 text-white"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        {/* navigation column (desktop) */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-end order-3">
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="group p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <FaChevronLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={nextSlide}
              className="group p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <FaChevronRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* mobile navigation (sticks under text) */}
        <div className="flex lg:hidden order-1 justify-between items-center w-full mb-6 sm:mb-0">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur text-white focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur text-white focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-8 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
