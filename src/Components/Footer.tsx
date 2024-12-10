import React from "react";
import "../App.css";
import { MdEmail } from "react-icons/md";
import { SlSocialInstagram } from "react-icons/sl";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  const footerData = {
    categories: [
      "Culture",
      "Fashion",
      "Featured",
      "Food",
      "Healthy Living",
      "Technology",
    ],
    comments: [
      {
        name: "Ellsmartx",
        text: "how nice does this look 😍 I feel it should be delicious, thank",
      },
      { name: "Cassia", text: "cheer up you again in 2 next game go go go" },
      { name: "Amanda", text: "you were stunning💗 today, jan!great👍🏽👍🏽" },
      {
        name: "Denis Simonassi",
        text: "It was a great match today Janzi! You did great😉🇩🇪",
      },
    ],
    topPosts: [
      "https://images.unsplash.com/photo-1614687153862-b0e115ebcef1?fm=jpg&q=60&w=3000",
      "https://img.freepik.com/free-photo/ai-generated-labrador-retriever-dog-picture_23-2150644908.jpg",
      "https://cdn.beta.qalampir.uz/uploads/OS/f_SVgoXbP3CpMxbBeDPkvVLCZEq80kTE.jpg",
      "https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200",
      "https://lt2.pigugroup.eu/colours/633/176/88/63317688/sony-wh-ch510-bt-50-d3ed5_original.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Two_dancers.jpg/250px-Two_dancers.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/028/217/911/small/cute-dog-rests-on-the-ground-photo.jpg",
      "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?cs=srgb&dl=pexels-jerome031-2114365.jpg&fm=jpg",
      "https://img.freepik.com/free-photo/male-boxer-boxing-punching-bag_155003-6125.jpg",
    ],
  };

  return (
    <footer className="py-8">
      <div className="flex container items-center justify-between gap-6">
        {/* Mega News Section */}
        <div
          style={{
            borderRadius: "0px 30px 30px 0px",
          }}
          className="bg-[#F5F5F5] p-8"
        >
          <div className="flex items-center gap-32">
            {/* Mega News */}
            <div className="w-[330px]">
              <Header title="Mega News" />
              <p className="text-gray-700 mt-2">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do
                Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
                Egestas Purus Vivera Accumsan In Nisi Nisi. Arcu Cursus Vitae
                Congue Mauris Rhoncus Aenean Vel Elit Scelerisque.
              </p>
              <div className="mt-4">
                <Header title="Newsletters" />
                <div className="flex mt-2 relative">
                  <input
                    type="email"
                    placeholder="Write Your Email..."
                    className="flex-1 border border-gray-300 bg-white rounded-l-md px-4 py-3"
                  />
                  <button className="px-4 py-2 rounded-r-md absolute right-0 top-3">
                    <MdEmail className="size-[25px] text-[#3E3232BF]" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Section title="Categories">
                <ul className="text-gray-700 mt-2 space-y-1">
                  {footerData.categories.map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              </Section>
              <Section title="Social Network" className="mt-8 w-[150px]">
                <div className="flex space-x-3 mt-3">
                  <button
                    className=" p-2 px-3 flex items-center gap-3 text-white rounded-lg"
                    style={{
                      background:
                        "linear-gradient(262.85deg, #F45C9F 5.57%, #FF7563 73.65%)",
                    }}
                  >
                    <SlSocialInstagram />
                    instagram
                  </button>
                  <button
                    className="p-2 px-3 flex items-center gap-3 text-white rounded-xl"
                    style={{
                      background:
                        "linear-gradient(227.96deg, #2CA5E0 11.38%, #67C9F5 84.07%)",
                    }}
                  >
                    <FaTwitter />
                  </button>
                </div>
              </Section>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 bg-[#3E32320D] p-4 text-center text-sm rounded-r-xl">
            <p>Privacy Policy | Terms & Conditions</p>
            <p>All Copyright © 2022 Reserved</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Section title="New Comments">
              <ul className="text-gray-700 mt-3 space-y-4">
                {footerData.comments.map(({ name, text }, index) => (
                  <li
                    key={index}
                    className="p-3 bg-[#F5F5F5] w-full rounded-xl"
                  >
                    <h1 className="font-semibold mb-1">{name}:</h1>
                    <span className="line-clamp-1">{text}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
          <div>
            <Section title="Top Posts">
              <div className="grid grid-cols-3 mt-5 gap-[24px]">
                {footerData.topPosts.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Instagram"
                    className="rounded-[15px] w-[130px] object-cover h-[100px]"
                  />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Header = ({ title }: { title: string }) => (
  <div className="flex items-center">
    <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const Section = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={` ${className}`}>
    <Header title={title} />
    {children}
  </div>
);

export default Footer;
