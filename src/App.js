import React, { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "./context";
import Carroussel from "./mobile/Carousel";
import CategoryCard from "./components/CategoryCard";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Header from "./components/layout/Header";
import Layout from "./components/layout/layout";
import DataCard from "./components/DataCard";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./App.module.css"; // Assuming you create a new styles file
import Pulsating from "./mobile/Pulsating";
import CategoryHeader from "./mobile/CategoryHeader";

function App({ children }) {
  const {
    isMobile,
    isSidebarOpen,
    setSelectedCategory,
    selectedCategory,
    selectedCategoryData,
    categoryData,
    allData,
  } = useGlobalContext();

  const [showDataCardCarousel, setShowDataCardCarousel] = useState(false);
  const [renderedTools, setRenderedTools] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0); // Add this state
  // ...
  const handleCategoryCardClick = useCallback(
    (categoryName, index) => {
      if (index !== activeSlide) {
        return; // If the clicked card is not the active one, do nothing
      }

      const selectedCategoryData = allData.filter((item) =>
        item.category.includes(categoryName)
      );

      setSelectedCategory(categoryName);
      setRenderedTools(selectedCategoryData);
      setShowDataCardCarousel(true);
    },
    [
      allData,
      setSelectedCategory,
      setShowDataCardCarousel,
      setRenderedTools,
      activeSlide,
    ] // Add activeSlide here
  );

  const handleBackClick = () => {
    setShowDataCardCarousel(false);
  };

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = allData.filter((item) =>
        item.category.includes(selectedCategory)
      );
      setRenderedTools(selectedCategoryData);
    }
  }, [selectedCategory, allData]);

  useEffect(() => {
    if (isSidebarOpen && selectedCategoryData) {
      let timerId = null;
      selectedCategoryData.forEach((tool, index) => {
        timerId = setTimeout(() => {
          setRenderedTools((tools) => [...tools, tool]);
        }, index * 150);
      });

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isSidebarOpen, selectedCategoryData]);

  const idx = categoryData?.findIndex((item) => item.name === selectedCategory);

  return (
    <Layout>
      {!isMobile && (
        <>
          <Home />
          <Sidebar />
        </>
      )}
      {isMobile && (
        <>
          {!isSidebarOpen && !showDataCardCarousel && (
            <Carroussel
              idx={idx !== -1 ? idx : 0}
              cards={categoryData?.map((category, index) => ({
                key: uuidv4(),
                content: (
                  <CategoryCard
                    data={category}
                    onCategorySelect={() =>
                      handleCategoryCardClick(category.name, index)
                    }
                  />
                ),
              }))}
              height="500px"
              width="30%"
              margin="0 auto"
              offset={1}
              setActiveSlide={setActiveSlide} // Add this prop
              showArrows={false}
            />
          )}

          {showDataCardCarousel && (
            <>
              <Carroussel
                cards={renderedTools?.map((tool) => ({
                  key: uuidv4(),
                  content: (
                    <DataCard data={tool} handleBackClick={handleBackClick} />
                  ),
                }))}
                height="500px"
                width="30%"
                margin="0 auto"
                offset={1}
                showArrows={false}
                setActiveSlide={setActiveSlide}
              />
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default App;
