import React from "react";
import { useGlobalContext } from "../../context";
import Header from "./Header";
import FilterComponent from "../FilterComponent";
import { BrowserRouter } from "react-router-dom";

const Layout = ({ children }) => {
  const { setFilter, isSidebarOpen } = useGlobalContext();

  return (
    <div>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      {/* {!isSidebarOpen && <FilterComponent onFilter={setFilter} />} */}
      <main className="min-h-screen lg:px-48 ">{children}</main>
    </div>
  );
};

export default Layout;
