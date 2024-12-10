import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ApiResponse {
  id: number;
  categoryName?: string;
  categoryImg?: string;
}

interface FilteredCategory {
  id: number;
  categoryName: string;
  categoryImg: string;
}

function FilteredCategories() {
  const [categories, setCategories] = useState<FilteredCategory[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios
      .get<ApiResponse[]>("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        const filteredData: FilteredCategory[] = res.data
          .filter((item) => item.categoryName && item.categoryImg)
          .map((item) => ({
            id: item.id,
            categoryName: item.categoryName!,
            categoryImg: item.categoryImg!,
          }));
        setCategories(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const slideRight = () => {
    if (sliderRef.current) {
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const newScroll = currentScroll + 150;
      sliderRef.current.scrollLeft = Math.min(newScroll, maxScroll);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center mt-8 gap-[45px] mb-4 bg-gray-200 p-2 rounded-lg hide-scrollbar"
        ref={sliderRef}
      >
        {categories.map((item) => (
          <Link key={item.id} to={`/${item.categoryName}`}>
            <button
              style={{
                backgroundImage: `url("${item.categoryImg}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "37px",
                width: "160px",
                color: "#fff",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
              }}
              className="slider-button"
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.21)",
                  filter: "blur(5px)",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                  padding: "10px",
                }}
              >
                <span className="text-lg font-bold">{`#${item.categoryName}`}</span>
              </div>
            </button>
          </Link>
        ))}
      </div>

      <div
        onClick={slideRight}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
      >
        <FaChevronRight color="#000" size={24} />
      </div>
    </div>
  );
}

export default FilteredCategories;
