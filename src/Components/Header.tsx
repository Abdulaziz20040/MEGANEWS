import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { IoBookmarkOutline } from "react-icons/io5";

const { Option } = Select;

const Header: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((response) => response.json())
      .then((data) => {
        const categoryList = data
          .map((item: { categoryName: string }) => item.categoryName)
          .filter((category: string) => category && category.trim() !== "");
        setCategories(categoryList);
      });

    fetch("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCategoryChange = (value: string) => {
    navigate(`/${value}`);
  };

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter(
        (product) =>
          product.title &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setSearchTerm("");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="mt-3">
      <div className="flex flex-wrap justify-between items-center">
        <ul className="flex items-center gap-6 mt-2">
          <Link to="/">
            <li className="text-[#FC4308] font-bold">
              <span className="font-semibold">MEGA</span>.news
            </li>
          </Link>
          <li>
            <Select
              defaultValue="Categories"
              style={{ width: 120 }}
              variant="filled" // `bordered` o'rniga yangi API ishlatilmoqda
              onChange={handleCategoryChange}
            >
              {categories.length > 0 ? (
                categories.map((categoryName, index) => (
                  <Option key={index} value={categoryName}>
                    {categoryName}
                  </Option>
                ))
              ) : (
                <Option value="none" disabled>
                  No categories available
                </Option>
              )}
            </Select>
          </li>
          <li>
            <Select defaultValue="Pages" style={{ width: 90 }} variant="filled">
              <Option value="Pages">Pages</Option>
              <Option value="Food">Food</Option>
              <Option value="Animal">Animal</Option>
              <Option value="Car">Car</Option>
            </Select>
          </li>
          <Link to="/contact">
            <li>Contact Us</li>
          </Link>
          <Link to="/about">
            <li>About Us</li>
          </Link>
        </ul>

        <ul className="flex items-center gap-6">
          <li className="relative">
            <BsThreeDotsVertical
              style={{ fontSize: "20px" }}
              className="absolute top-5 left-4 cursor-pointer"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search anything"
              className="bg-gray-100 py-2 w-[250px] md:w-[300px] rounded-lg outline-none pl-[45px]"
            />
            <RiSearchLine
              style={{ fontSize: "20px" }}
              className="absolute top-5 right-5 cursor-pointer"
            />
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 w-[300px] z-10 bg-white shadow-lg mt-2 rounded-lg max-h-60 overflow-auto">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/details/${product.id}`}>
                    <div className="flex items-start p-2 hover:bg-gray-100 cursor-pointer">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-10 h-10 mr-2 rounded-lg"
                      />
                      <span className="line-clamp-2 text-stone-600">
                        {product.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li className="flex items-center gap-2">
            <Link to="/profil">
              <img
                className="rounded-lg w-[35px] h-[35px]"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
                alt="User"
              />
            </Link>
            <Select
              defaultValue="Behzad"
              style={{ width: 120 }}
              variant="filled"
            >
              <Option value="Behzad">
                <Link to="/profil">Behzad</Link>
              </Option>
            </Select>
          </li>
          <li>
            <Link to={"/favortes"}>
              <button className="bg-[#F5F5F5] p-3 rounded-lg">
                <IoBookmarkOutline className="text-[18px]" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
