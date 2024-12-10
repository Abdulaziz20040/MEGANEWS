import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  title: string;
  desc: string;
  img: string;
}

const Slider: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((response) => setNews(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mx-auto mt-10">
      <div className="flex flex-wrap gap-4">
        {news.slice(1, 3).map((item, index) => (
          <div
            key={item.id}
            className="relative rounded-lg overflow-hidden"
            style={{ width: "25%" }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover cursor-pointer"
            />
            <div className="absolute inset-0 flex bg-black/20 flex-col justify-end p-4">
              <div className="bg-slate-200/40 p-3 rounded-xl">
                <Link to={`/details/${item.id}`}>
                  <h2 className="text-lg font-bold text-white">{item.title}</h2>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {item.desc}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {news[currentIndex] && (
          <div
            className="relative shadow-lg rounded-lg overflow-hidden"
            style={{ width: "47%" }}
          >
            <img
              src={news[currentIndex].img}
              alt={news[currentIndex].title}
              className="w-full h-[380px] object-cover cursor-pointer"
            />
            <div className="absolute inset-0 flex bg-black/20 flex-col justify-end p-4">
              <div className="bg-slate-200/40 p-3 rounded-xl">
                <Link to={`/details/${news[currentIndex].id}`}>
                  <h2 className="text-lg font-bold text-white">
                    {news[currentIndex].title}
                  </h2>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {news[currentIndex].desc}
                  </p>
                </Link>
              </div>
            </div>
            {/* Left Icon */}
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FaChevronLeft />
            </button>
            {/* Right Icon */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .flex > div {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;
