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

const Market: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container_posts mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPosts.map((post) => (
          <div
            style={{
              boxShadow: "0px 0px 32px 0px #00000012",
            }}
            key={post.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
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

      <div className="flex justify-start mt-6">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          <FaChevronLeft />
        </Button>
        <div className="flex items-center">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Market;
