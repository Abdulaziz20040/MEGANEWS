import React from "react";
import { FaFax } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

function About() {
  return (
    <div className="container mx-auto mt-8">
      <div className=" bg-[#F5F5F5] p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">
          We pay attention to your needs and do the best design.
        </h2>
        <section className="flex items-start justify-between space-x-10 mt-6">
          <div className="w-1/2">
            <p className="text-md text-[#3E3232] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
              senectus et netus. Mattis pellentesque id nibh tortor id aliquet
              lectus proin. Sapien faucibus et molestie ac feugiat sed lectus
              vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt
              ornare massa eget. Dictum varius duis at consectetur lorem. Nisi
              vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut
              tortor pretium viverra suspendisse potenti nullam. Et molestie ac
              feugiat sed lectus. Non nisi est sit amet facilisis magna.
              Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut
              enim blandit volutpat maecenas volutpat. Ornare lectus sit amet
              lectus proin. Sapien faucibus et molestie ac feugiat sed lectus
              vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt
              ornare massa eget. Dictum varius duis at consectetur lorem. Nisi
              vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut
              tortor pretium viverra suspendisse potenti nullam. Et molestie ac
              placerat in egestas erat.
            </p>
          </div>

          <div className="w-1/2 relative">
            <img
              src="https://www.figma.com/file/NJjwtbj98TLF8h7RIKE1B9/image/0196b16b00ec6b607a7ce18a9a504cbc9c3ded95"
              alt="Video Thumbnail"
              className="w-full h-[350px] rounded-xl"
            />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-opacity-75 rounded-full p-4 text-6xl">
              <IoPlayCircleOutline />
            </button>
          </div>
        </section>
      </div>

      <section className="flex space-x-10 mb-20 mt-10">
        <div className="w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23970.332967010556!2d69.2221813!3d41.32427165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1733428479294!5m2!1sru!2s"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "0px 30px 30px 0px" }}
            loading="lazy"
          ></iframe>
        </div>

        <div className="w-1/2 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Mega News Information</h3>
          <ul className="space-y-4 text-lg text-gray-600">
            <li className=" flex items-center gap-2">
              <MdEmail />
              Email: <span className="font-semibold">Management@Mega.News</span>
            </li>
            <li className=" flex items-center gap-2">
              <IoIosPhonePortrait />
              Phone Number:
              <span className="font-semibold">+1(234) 567-8910</span>
            </li>
            <li className=" flex items-center gap-2">
              <FaFax />
              Fax: <span className="font-semibold">+1(234) 567-8910</span>
            </li>
            <li className=" flex items-center gap-2">
              <LuMapPin />
              Address:
              <span className="font-semibold">
                1234 Forum St, New Lenox, IL 123456
              </span>
            </li>
            <li className=" bg-[#F5F5F5] p-2 rounded-xl px-3 w-[400px]">
              Responding 24 Hours A Day, 7 Days A Week
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-semibold mb-6">Mega News Team</h3>
        <div className="flex space-x-6 justify-center">
          <div className="text-center">
            <img
              src="path_to_image"
              alt="Behdad Pashaei"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p>Designer</p>
          </div>
          <div className="text-center">
            <img
              src="path_to_image"
              alt="Cassie Evans"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p>Programmer</p>
          </div>
          <div className="text-center">
            <img
              src="path_to_image"
              alt="James Hoebrechts"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p>Marketing</p>
          </div>
          <div className="text-center">
            <img
              src="path_to_image"
              alt="Jon Kantner"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p>CEO</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
