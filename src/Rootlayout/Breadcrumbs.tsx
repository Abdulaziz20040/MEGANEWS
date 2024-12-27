import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: "/",
    },
    ...pathnames.map((value, index) => {
      const isDetailsPage = pathnames[index - 1] === "details";
      const displayValue = isDetailsPage ? decodeURIComponent(value) : value;
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;

      return {
        title:
          index === pathnames.length - 1 ? (
            displayValue
          ) : (
            <Link to={url}>{displayValue}</Link>
          ),
        key: url,
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default Breadcrumbs;
