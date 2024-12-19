import axios from "axios";
import { useEffect, useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GoFileDirectory, GoPlus } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import ToppostDetails from "./ToppostDetails";
import Commment from "./Comment";
import ReletedPost from "../User/RelatedPosts";

const Details = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const [follow, setFollow] = useState<boolean>(() => {
    const saved = localStorage.getItem("followStatus");
    return saved ? JSON.parse(saved) : false;
  });

  const [favorite, setFavorite] = useState<any[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleFollow = () => {
    setFollow((prev) => {
      const newStatus = !prev;
      saveToLocalStorage("followStatus", newStatus);
      return newStatus;
    });
  };

  const handleFavorite = (item: any) => {
    const isAlreadyFavorite = favorite.some((fav) => fav.id === item.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorite, item];
      setFavorite(updatedFavorites);
      saveToLocalStorage("favorites", updatedFavorites);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://df2174b8e5e5a31d.mokky.dev/MEGA_news/${id}`)
      .then((res) => setData(res.data))
      .catch(() => setError("Ma'lumotlarni olishda xatolik yuz berdi!"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="text-center mt-10 text-xl">Yuklanmoqda...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 text-xl">{error}</div>
    );

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <div className="flex-1">
          <div className="relative">
            <img
              src={data.img || "https://via.placeholder.com/1200x600"}
              alt="Main"
              className="w-full h-[500px] object-cover rounded-xl mt-[1px]"
            />
            <div className="flex justify-center gap-20 items-center mt-4 text-sm text-[#3E3232BF]">
              <span className="flex items-center gap-3">
                <CiCalendar />
                {data.postDate || "Sana mavjud emas"}
              </span>
              <span className="flex items-center gap-3">
                <BiMessageRoundedDots />
                {data.commentsCount || 0} Kommentariya
              </span>
              <span className="flex items-center gap-3">
                <GoFileDirectory />
                {data.categoryName || "Kategoriya"}
              </span>
            </div>
          </div>

          <div className="mt-10 text-gray-800 leading-relaxed">
            <h1 className="text-[19px] text-[#3E3232] font-semibold mb-2">
              {data.title}
            </h1>
            <p className="text-md text-[#3E3232]">{data.desc}</p>
          </div>

          <div className="mt-6">
            <Commment />
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="rounded-lg">
            <div className="flex space-x-4">
              <button className="bg-gray-200 text-stone-500 p-2 rounded-xl flex items-center gap-2">
                <FiSend />
                Share
              </button>
              <button
                onClick={() => handleFavorite(data)}
                className={`bg-gray-200 text-stone-500 p-2 rounded-xl flex items-center gap-2 ${
                  favorite.some((fav) => fav.id === data.id)
                    ? "bg-red-400 text-white"
                    : ""
                }`}
              >
                <IoBookmarkOutline />
                Marking
              </button>
              <button className="bg-gray-200 text-stone-500 p-2 rounded-xl flex items-center gap-2">
                <BiMessageRoundedDots />
                Comment
              </button>
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-4 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={data.userImg || "https://via.placeholder.com/150"}
                alt="User"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">
                    {data.userName || "Foydalanuvchi"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {data.userPosts || 0} ta post
                  </p>
                </div>
                <button
                  onClick={handleFollow}
                  className={`mt-2 p-2 flex items-center justify-between gap-2 text-sm font-medium text-white bg-[#F81539BF] rounded-lg transition ${
                    follow ? "bg-gray-400" : ""
                  }`}
                >
                  <GoPlus />
                  <span>{follow ? "Following" : "Follow"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Tags</h3>
            <p className="text-[#3E3232BF] mt-2">
              Montenegro Visit Croatia Luxury Travel Paradise Island
            </p>
          </div>

          <div className="bg-[#F5F5F5] p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Top Posts</h3>
            <ToppostDetails />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <ReletedPost />
      </div>
    </div>
  );
};

export default Details;
