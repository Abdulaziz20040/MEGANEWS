import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import "tailwindcss/tailwind.css";

import "../App.css";
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

const NewPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        const filteredData = res.data.filter(
          (item: any) => item.newpost === true
        );
        setPosts(filteredData);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className=" container_posts mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-gray-800">New Posts</h2>
          </div>
        </h2>
        <>
          <Link to={"allnewpost"}>
            <Button className="flex items-center bg-gray-100 text-gray-500 hover:text-blue-700">
              Show All <AiOutlineArrowRight className="ml-2" />
            </Button>
          </Link>
        </>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
        {posts.slice(0, 6).map((post) => (
          <div
            style={{
              boxShadow: "0px 0px 32px 0px #00000012",
            }}
            key={post.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex p-4"
          >
            <Link to={`/details/${post.id}`}>
              <img
                src={post.img}
                alt={post.title}
                className=" w-[900px] h-[210px] object-cover rounded-lg"
              />
            </Link>
            <div className="w-[100%] h-[210px] p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {post.desc}
                </p>
              </div>
              <div className="bg-gray-100 p-4 mt-4 rounded-lg">
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

export default NewPost;
