import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";

interface Card {
  id: number;
  title: string;
  desc: string;
  img: string;
  categorya: string;
  categoryImg: string;
  postDate: string;
  userName: string;
  userImg: string;
}

const SelectCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    axios
      .get<Card[]>("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((response) => {
        const filteredCards = response.data.filter(
          (card) => card.categorya === categoryName
        );
        setCards(filteredCards);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [categoryName]);

  return (
    <div className="container">
      <div className=" container_posts mt-6">
        <div className="flex justify-between items-center mb-6"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300  p-4"
            >
              <Link to={`/details/${post.id}`}>
                <img
                  src={post.img}
                  alt={post.title}
                  className=" w-[310px] h-[200px] object-cover rounded-lg"
                />
              </Link>
              <div className="w-[100%] h-[180px] p-3 flex flex-col justify-between">
                <div className="">
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
                        className="h-8 w-8 rounded-full mr-2"
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
    </div>
  );
};

export default SelectCategory;
