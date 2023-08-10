// Sidebar.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useGlobalContext } from "./context";
import DataCard from "./components/DataCard";
import CategoryCard from "./components/CategoryCard";
import "./styles.css";

const Sidebar = () => {
  const {
    isSidebarOpen,
    closeSidebar,
    selectedCategory,
    selectedTool,
    allData,
    categoryData,
  } = useGlobalContext();

  const selectedCategoryData = categoryData?.find(
    (item) => item.name === selectedCategory
  );
  const selectedToolData = allData?.find((item) => item.tool === selectedTool);

  return (
    <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : ""}`}>
      <div className="sidebar-header">
        <BsFillArrowLeftSquareFill className="back-btn" onClick={closeSidebar} />
        {selectedToolData ? <h2>{selectedCategory}</h2> : <h2></h2>}
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      <div className="cardContainer">
        {selectedToolData && <DataCard data={selectedToolData} />}
        {!selectedToolData && selectedCategoryData && (
          <CategoryCard data={selectedCategoryData} />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
