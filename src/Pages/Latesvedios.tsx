import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import "tailwindcss/tailwind.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
  userName: string;
  userImg: string;
  postDate: string;
}

const Latesvedios: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        const filteredData = res.data.filter(
          (item: any) => item.latestVideos === true
        );
        setPosts(filteredData);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-[#F5F5F5] py-10">
      <div className="container ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            <div className="flex items-center">
              <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
              <h2 className="text-xl font-semibold text-gray-800">
                Latest Videos
              </h2>
            </div>
          </h2>
          <div className="flex gap-2 items-center">
            <Button
              className="border-none bg-gray-200 text-gray-500"
              onClick={handlePrev}
            >
              <FaChevronLeft />
            </Button>
            <Button
              className="border-none bg-gray-200 text-gray-500"
              onClick={handleNext}
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="col-span-3">
            {posts.slice(currentIndex, currentIndex + 1).map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
              >
                <div className="relative">
                  <IoPlayCircleOutline className="absolute top-[33%] left-[45%] cursor-pointer text-white text-7xl" />
                  <Link to={`/details/${post.id}`}>
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-[900px] h-[400px] object-cover rounded-lg"
                    />
                  </Link>

                  <div className="absolute left-5 bottom-3 bg-gray-300 w-[95%] p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm font-semibold">{post.title}</p>
                          <p className="text-xs text-gray-700 mt-2">
                            {post.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
            }}
            className=" "
          >
            {posts.slice(currentIndex + 1, currentIndex + 3).map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg w-[544px] flex rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
              >
                <Link to={`/details/${post.id}`}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-[180px] object-cover rounded-lg"
                  />
                </Link>
                <div className="w-full h-[120px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2  line-clamp-6">
                      {post.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latesvedios;
