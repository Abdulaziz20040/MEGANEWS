import React from "react";
import { BsImage } from "react-icons/bs";
import { CgColorPicker } from "react-icons/cg";
import { FaAlignLeft, FaCode, FaLink, FaRegFile } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { LuSend } from "react-icons/lu";

function Contact() {
  return (
    <div className=" container mt-6">
      <div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="first-name"
                className="text-sm font-semibold mb-1"
              >
                Subject
              </label>
              <input
                id="first-name"
                type="text"
                className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="last-name" className="text-sm font-semibold mb-1">
                Name
              </label>
              <input
                id="last-name"
                type="text"
                className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="user-name" className="text-sm font-semibold mb-1">
                Email
              </label>
              <input
                id="user-name"
                type="text"
                className="w-full border outline-none border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <h1 className=" mt-6">Explanation</h1>
          <div className=" flex items-start justify-center w-full gap-8">
            <div
              style={{
                boxShadow: "0px 0px 32px 0px #00000012",
              }}
              className="  mt-2 p-4 rounded-lg bg-white w-[80%]"
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
            <div className="w-[20%]  relative">
              <h2 className="text-lg w-[100px] font-semibold mb-2">Add File</h2>
              <div
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/736x/c5/2f/f3/c52ff39c19b55070a5613871fb2419a6.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "300px",
                  height: "345px",
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
              <button className="bg-red-500 text-white absolute -right-6 px-2 py-2 rounded-xl mt-4 hover:bg-red-600 flex items-center gap-1">
                <LuSend />
                Send
              </button>
              <div className=" mb-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
