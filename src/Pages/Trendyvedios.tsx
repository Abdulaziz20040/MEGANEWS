import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight, FaBookmark } from "react-icons/fa";
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

const Trendyvedios: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        const filteredData = res.data.filter(
          (item: any) => item.trendyPosts === true
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
    <div className="container_posts mt-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            Trendy vedios
          </div>
        </h2>
        <div className="flex justify-between items-center gap-2 mt-6">
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.slice(currentIndex, currentIndex + 4).map((post) => (
          <div
            style={{
              boxShadow: "0px 0px 32px 0px #00000012",
            }}
            key={post.id}
            className="bg-white  rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
          >
            <Link to={`/details/${post.id}`}>
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-[200px] object-cover rounded-lg"
              />
            </Link>
            <div className="w-full h-[180px] p-3 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {post.desc}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.userImg}
                      alt={post.userName}
                      className="h-8 w-8 rounded-full object-cover mr-2"
                    />
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">
                        {post.userName}
                      </p>
                      <p className="text-xs text-gray-400">{post.postDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaBookmark className="text-gray-400 hover:text-blue-500 cursor-pointer text-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trendyvedios;
