import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { CgColorPicker } from "react-icons/cg";
import { FaAlignLeft, FaCode, FaLink, FaRegEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import Market from "./Market";
import Posts from "./Posts";
import YourPosts from "./YourPosts";
import { useNavigate } from "react-router-dom";

const Profil: React.FC = () => {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [activtab, setActivtab] = useState("Marked");
  const [selectedPost, setSelectedPost] = useState<string>("post");
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("/edit-profile");
  };

  const handlePostClick = (type: string) => {
    setSelectedPost(type);
  };
  useEffect(() => {
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.error("API error:", e);
      });
  }, []);
  return (
    <div className="container mt-6">
      <div className=" bg-[#F5F5F5] p-3 rounded-xl">
        <div className="  rounded-lg shadow-md">
          <img
            src="https://www.figma.com/file/NJjwtbj98TLF8h7RIKE1B9/image/0196b16b00ec6b607a7ce18a9a504cbc9c3ded95"
            alt="Banner"
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </div>

        <div className=" flex items-center justify-between">
          {posts.slice(0, 1).map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.userImg || "https://via.placeholder.com/100"}
                alt="User"
                className="w-20 h-20 rounded-xl border-4 border-white"
              />
              <div>
                <h1 className="text-xl font-semibold">
                  {item.userName || "No Name"}
                </h1>
              </div>
            </div>
          ))}
          <div className="mt-20 flex justify-center space-x-8">
            <div className=" flex items-center gap-5">
              {["Marked", "SendPost", "Posts"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivtab(tab)}
                  className={`px-4 py-2 ${
                    activtab === tab
                      ? "border-b-2 border-red-500 w-20 border-spacing-4"
                      : "border-b-2 border-transparent w-20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <button
            className=" border-[#F81539BF] text-[#F81539BF] px-4 py-2 rounded-md shadow-md"
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Content */}
      {activtab === "Marked" && (
        <div>
          <Market />
        </div>
      )}
      {activtab === "SendPost" && (
        <>
          <div className=" mt-20 rounded-lg ">
            <div className="flex space-x-4">
              <button
                className={`px-6 py-2 rounded-lg ${
                  selectedPost === "post" ? "bg-[#F5F5F5]" : ""
                }`}
                onClick={() => handlePostClick("post")}
              >
                Send Post
              </button>
              <button
                className={`px-6 py-2 rounded-lg ${
                  selectedPost === "video" ? "bg-[#F5F5F5]" : ""
                }`}
                onClick={() => handlePostClick("video")}
              >
                Send Video
              </button>
            </div>
            <div className=" flex items-start justify-between w-full gap-10 mt-10">
              <div className=" w-[80%]">
                <div>
                  <div className="flex justify-between gap-6">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="title"
                        className="text-sm font-semibold mb-1"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 "
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="tags"
                        className="text-sm font-semibold mb-1"
                      >
                        Add Tags
                      </label>
                      <input
                        id="tags"
                        type="text"
                        placeholder="Add Tags"
                        className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2 "
                      />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold mt-4">Explanation</h2>

                  <div
                    style={{
                      boxShadow: "0px 0px 32px 0px #00000012",
                    }}
                    className=" mt-4 p-4 rounded-lg bg-white"
                  >
                    <div className=" flex items-center gap-6">
                      <button className=" bg-[#F5F5F5] px-4 py-2 rounded-lg flex items-center gap-2">
                        <BsImage />
                        Image
                      </button>
                      <button className=" bg-[#F5F5F5] px-4 py-2 rounded-lg flex items-center gap-2">
                        <CgColorPicker />
                        Color
                      </button>
                      <button className=" bg-[#F5F5F5] px-4 py-2 rounded-lg flex items-center gap-2">
                        <FaCode />
                        Text
                      </button>
                      <button className=" bg-[#F5F5F5] px-4 py-2 rounded-lg flex items-center gap-2">
                        <FaAlignLeft />
                        Algn
                      </button>
                      <button className=" bg-[#F5F5F5] px-4 py-2 rounded-lg flex items-center gap-2">
                        <FaLink />
                        Link
                      </button>
                    </div>

                    <textarea
                      placeholder="type..."
                      className="w-full h-[277px] outline-none  mt-6 rounded-lg px-4 py-2 bg-[#F5F5F5]"
                    />
                  </div>
                  {selectedPost === "video" && (
                    <div
                      style={{
                        boxShadow: "0px 0px 32px 0px #00000012",
                      }}
                      className="flex items-center justify-between gap-10 bg-white mt-10 rounded-xl p-4"
                    >
                      {/* Left Side Content */}
                      <div>
                        <h2 className="text-lg w-[130px] font-semibold mb-2 mt-4">
                          Image gallery
                        </h2>
                        <div
                          style={{
                            backgroundImage:
                              'url("https://www.mariposakids.co.nz/wp-content/uploads/2014/08/image-placeholder2.jpg")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "300px",
                            height: "280px",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                          className="rounded-lg p-6 relative border border-dashed border-black"
                        >
                          {/* Select Button */}
                          <button className="bg-gray-200 absolute bottom-8 right-[36%] px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-300">
                            <IoMdAdd />
                            Select
                          </button>
                        </div>
                      </div>

                      {/* Right Side Gallery */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 h-[230px] lg:grid-cols-5 gap-6">
                        {/* Repeating Images */}
                        {Array(10)
                          .fill(
                            "https://www.mariposakids.co.nz/wp-content/uploads/2014/08/image-placeholder2.jpg"
                          )
                          .map((imgUrl, index) => (
                            <img
                              key={index}
                              src={imgUrl}
                              alt="Image"
                              className="w-full cursor-pointer h-[127px] object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <div className="w-[20%]">
                    <h2 className="text-lg w-[100px] font-semibold mb-2">
                      {selectedPost === "post" ? "Add Image" : "Add Video"}
                    </h2>
                    <div
                      style={{
                        backgroundImage:
                          selectedPost === "post"
                            ? "url('https://www.mariposakids.co.nz/wp-content/uploads/2014/08/image-placeholder2.jpg')"
                            : "url('https://img.freepik.com/free-vector/movie-time-cinema-poster-hand-drawn-sketch-vector-illustration_460848-14407.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "300px",
                        height: "280px",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                      className="rounded-lg p-6 relative border border-dashed border-black"
                    >
                      <button className="bg-gray-200 absolute bottom-8 right-[36%] px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-300">
                        <IoMdAdd />
                        Select
                      </button>
                    </div>
                    <div className="mt-6 flex space-x-4">
                      <button className="bg-gray-200 px-2 py-2 rounded-xl text-[#3E3232BF] hover:bg-gray-300 flex items-center gap-1">
                        <MdOutlineInsertDriveFile />
                        Draft
                      </button>
                      <button className="bg-gray-200 px-2 py-2 rounded-xl text-[#3E3232BF] hover:bg-gray-300 flex items-center gap-1">
                        <FaRegEye />
                        Preview
                      </button>
                      <button className="bg-red-500 text-white px-2 py-2 rounded-xl hover:bg-red-600 flex items-center gap-1">
                        <LuSend />
                        Public
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {activtab === "Posts" && (
        <div>
          <Posts />
          <YourPosts />
        </div>
      )}
    </div>
  );
};

export default Profil;
