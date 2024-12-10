import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Breadcrumbs from "./Breadcrumbs";
import "../App.css";

const RootLayout: React.FC = () => {
  return (
    <div className="">
      <div className="container">
        <Header />
        <Breadcrumbs />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
