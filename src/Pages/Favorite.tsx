import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/Context";
import { FaBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function Favorites() {
  const { favorite, setFavorite, deleteFromFavorite } = useProduct();

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorite(JSON.parse(savedFavorites)); // Favoritlarni o'zgartirish
    }
  };

  const handleDelete = (post: any) => {
    deleteFromFavorite(post.id); // Favoritlarni o'chirish
  };

  useEffect(() => {
    loadFavorites(); // Sahifa yuklanganda faqat bir marta chaqiriladi
  }, []); // Bo'sh dependensiyalar arrayi sahifa birinchi marta yuklanganda ishlaydi

  return (
    <div className="container mx-auto px-4 py-6">
      {favorite.length === 0 ? (
        <p className="text-center text-white text-xl">
          Sevimli mahsulotlar mavjud emas.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorite.map((post) => (
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
                    <div
                      onClick={() => handleDelete(post)} // post ni to'g'ri uzatish
                      className="flex items-center cursor-pointer"
                    >
                      <MdDeleteOutline className="text-[23px] text-red-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
