import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
  userName: string;
  userImg: string;
  postDate: string;
}

const YourPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        const filteredData = res.data.filter(
          (item: any) => item.yourpost === true
        );
        setPosts(filteredData);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="container_posts mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            Your posts
          </div>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {posts.slice(0, 4).map((post) => (
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
                <div className=" flex items-center justify-between">
                  <div className=" flex items-center gap-2">
                    <button className=" flex items-center gap-1">
                      <FaRegEye className=" text-[#3E323280]" />
                      15 k
                    </button>
                    <button className=" flex items-center gap-1">
                      <CiStar className=" text-[#3E323280]" />
                      4.5
                    </button>
                  </div>
                  <div className=" flex items-center gap-2">
                    <button>
                      <FaRegEdit className=" text-[#3E323280]" />
                    </button>
                    <button>
                      <RiDeleteBin6Line className=" text-[#3E323280]" />
                    </button>
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

export default YourPosts;
