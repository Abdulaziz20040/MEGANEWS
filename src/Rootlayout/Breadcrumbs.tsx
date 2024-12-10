import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const isDetailsPage = pathnames[index - 1] === "details";
        const displayValue = isDetailsPage ? decodeURIComponent(value) : value;
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;

        return index === pathnames.length - 1 ? (
          <Breadcrumb.Item key={url}>{displayValue}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{displayValue}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
