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

function Details() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const [follow, setFollow] = useState<boolean>(() => {
    const saved = localStorage.getItem("followStatus");
    return saved ? JSON.parse(saved) : false;
  });

  const handleFollow = () => {
    setFollow((prev) => {
      const newStatus = !prev;
      localStorage.setItem("followStatus", JSON.stringify(newStatus));
      return newStatus;
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://df2174b8e5e5a31d.mokky.dev/MEGA_news/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError("Ma'lumotlarni olishda xatolik yuz berdi!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Yuklanmoqda...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">{error}</div>
    );
  }

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
              <span className=" flex items-center gap-3">
                <CiCalendar />
                {data.postDate || "Sana mavjud emas"}
              </span>
              <span className=" flex items-center gap-3">
                <BiMessageRoundedDots />
                {data.commentsCount || 0} Kommentariya
              </span>
              <span className=" flex items-center gap-3">
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

          {/* Second Image with Description */}
          {/* <div className="mt-6">
            <img
              src={data.postimg || "https://via.placeholder.com/1200x600"}
              alt="Secondary"
              className="w-[900px] h-90 object-cover rounded-lg mx-auto"
            />
            <div className="flex flex-col gap-2 items-start text-gray-800">
              <h3 className="text-[19px] text-[#3E3232] font-semibold  mt-6">
                {data.authorName}
              </h3>
            </div>
            <p className="text-gray-800 mt-2">{data.additionalDesc}</p>
          </div> */}

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
              <button className="bg-gray-200 text-stone-500 p-2 rounded-xl flex items-center gap-2">
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
                src={data.userImg}
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
                  <span className="-mt-1">
                    {follow ? "Following" : "Follow"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#F5F5F5] p-4 shadow rounded-lg">
            <div className="flex items-center mb-2">
              <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
              <h3 className="text-lg font-semibold">tags</h3>
            </div>
            <span className=" text-[#3E3232BF]">
              Montenegro Visit Croatia Luxury Travel
              <br />
              Travel Log Paradise Island Travel Info
            </span>
            <div className="flex flex-wrap gap-2"></div>
          </div>

          {/* Top Posts */}
          <div className="bg-[#F5F5F5] p-4 shadow rounded-lg">
            <div className="flex items-center">
              <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
              <h3 className="text-lg font-semibold">Top Posts</h3>
            </div>
            <div className=" mt-4">
              <ToppostDetails />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <img
                src="https://www.figma.com/file/NJjwtbj98TLF8h7RIKE1B9/image/bcaa1998c061dfefe4e2504912040d61133515da"
                alt="Ad 1"
                className="w-full h-[150px] object-cover rounded-[12px] blur-sm"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-base font-semibold rounded-lg">
                Advertisement <br />
                360 px * 180 px
              </span>
            </div>
            <div className="relative">
              <img
                src="https://www.figma.com/file/NJjwtbj98TLF8h7RIKE1B9/image/0196b16b00ec6b607a7ce18a9a504cbc9c3ded95"
                alt="Ad 2"
                className="w-full h-[150px] object-cover rounded-[12px] blur-sm"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-base font-semibold rounded-lg">
                Advertisement <br />
                360 px * 180 px
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-20">
        <ReletedPost />
      </div>
    </div>
  );
}

export default Details;
