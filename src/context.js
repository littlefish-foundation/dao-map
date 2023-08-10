// context.js
import React, { useState, useEffect, useContext, createContext } from "react";
import { db, storage } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// import { isMobile } from "react-device-detect";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clickedObjectPosition, setClickedObjectPosition] = useState(null);
  const [allData, setAllData] = useState([]);
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isMobile, setIsMobile] = useState(null);

  const logosRef = ref(storage, "logos/aiLawyer.png");

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const openSidebarWithCategory = (category, position) => {
    setSelectedCategory(category);
    setSelectedTool(null);
    setClickedObjectPosition(position);
    openSidebar();

    let filteredData = allData.filter((data) =>
      data.category.includes(category)
    );

    if (filter === "cardano") {
      filteredData = filteredData.filter((data) =>
        data.platform.includes("cardano")
      );
    } else if (filter === "blockchain") {
      filteredData = filteredData.filter(
        (data) => !data.platform.includes("cardano")
      );
    }
    setSelectedCategoryData(filteredData);
  };

  const openSidebarWithTool = (tool, position) => {
    setSelectedTool(tool);
    setClickedObjectPosition(position);
    openSidebar();
  };

  // useEffect(() => {
  //   fetch("/newnewtools.json")
  //     .then((response) => response.json())
  //     .then((data) => setAllData(data))
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    const getTools = async () => {
      const toolsCol = collection(db, "newtools");
      const toolSnapshot = await getDocs(toolsCol);
      const toolList = toolSnapshot.docs.map((doc) => doc.data());
      setAllData(toolList);
    };

    getTools().catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/categories.json")
      .then((response) => response.json())
      .then((category) => setCategoryData(category))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      // Call handleResize to set the initial state correctly
      handleResize();

      window.addEventListener("resize", handleResize);

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        filter,
        setFilter,
        allData,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        selectedCategory,
        setSelectedCategory,
        openSidebarWithCategory,
        clickedObjectPosition,
        setClickedObjectPosition,
        selectedCategoryData,
        categoryData,
        openSidebarWithTool,
        selectedTool,
        isMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
