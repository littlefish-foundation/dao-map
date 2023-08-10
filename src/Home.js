// Home.js
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import InteractiveObject from "./components/InteractiveObject";
import Carroussel from "./mobile/Carousel";
import CategoryCard from "./components/CategoryCard";
import DataCard from "./components/DataCard";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const {
    isSidebarOpen,
    openSidebarWithCategory,
    setSelectedCategory,
    openSidebarWithTool,
    categoryData,
    closeSidebar,
    selectedCategoryData,
    isMobile,
  } = useGlobalContext();

  const [renderedTools, setRenderedTools] = useState([]);
  const [isPulsating, setIsPulsating] = useState(false);
  const [activeTool, setActiveTool] = useState(false);
  const [imageStyle, setImageStyle] = useState({});
  const [inverseImageStyle, setInverseImageStyle] = useState({});

  const handleCategoryClick = (category) => {
    openSidebarWithCategory(category.name, [x0, y0]);
    // Decide your transform based on category
    let translateX = category.x;
    let translateY = category.y;
    let scale = (1.4, 1.8);

    // Compute inverse transform parameters and store in state
    let inverseTranslateX = 1 / translateX;
    let inverseTranslateY = 1 / translateY;
    let inverseScale = (1, 1);

    setInverseImageStyle({
      transform: `translate(${inverseTranslateX}px, ${inverseTranslateY}px) scale(${inverseScale})`,
      transition: "transform 0.5s ease-out",
    });

    setImageStyle({
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      transition: "transform 0.5s ease-out",
    });
  };

  // Reset image style when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      setImageStyle(inverseImageStyle);
    }
  }, [isSidebarOpen, inverseImageStyle]);

  // Reset renderedTools when selectedCategoryData changes
  useEffect(() => {
    setRenderedTools([]);
    setActiveTool(false);
  }, [selectedCategoryData]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebar = document.querySelector(".right-side");
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen, selectedCategoryData]);

  useEffect(() => {
    if (isSidebarOpen && selectedCategoryData) {
      let timerId = null;
      selectedCategoryData.forEach((tool, index) => {
        timerId = setTimeout(() => {
          setRenderedTools((tools) => [...tools, tool]);
        }, index * 150); // Change delay as needed
      });

      const totalRenderTime = selectedCategoryData.length * 150;
      setTimeout(() => {
        setIsPulsating(true);
      }, totalRenderTime);

      return () => {
        clearTimeout(timerId);
        setIsPulsating(false);
      };
    }
  }, [isSidebarOpen, selectedCategoryData]);

  const x0 = isSidebarOpen ? 25 : 50;
  const y0 = 50;
  const r = isSidebarOpen ? 15 : 30;

  return (
    <>
      <img
        src={"/cardano-background.png"}
        alt="background"
        style={{
          objectFit: "cover",
          top: "0",
          filter: "brightness(60%)",
          height: "100vh",
          width: "100vw",
          
          ...imageStyle,
        }}
      />
      {!isSidebarOpen && (
        <>
          {categoryData.map((category, i) => (
            <InteractiveObject
              key={i}
              // left={x0 + r * Math.cos((2 * Math.PI * i) / categoryData.length)}
              // top={y0 + r * Math.sin((2 * Math.PI * i) / categoryData.length)}
              // left="20"
              // top="20"
              left={category.x}
              color={category.color}
              top={category.y}
              scale={category.scale}
              handleClick={() => handleCategoryClick(category)}
              name={category.name}
              isPulsating={true}
            />
          ))}
        </>
      )}
      {isSidebarOpen && selectedCategoryData && (
        <div className="right-side">
          {renderedTools.map((tool, i) => (
            <InteractiveObject
              key={i}
              left={
                x0 +
                r * Math.cos((2 * Math.PI * i) / selectedCategoryData.length)
              }
              top={
                y0 +
                r * Math.sin((2 * Math.PI * i) / selectedCategoryData.length)
              }
              handleClick={() => {
                openSidebarWithTool(tool.tool, [x0, y0]);
                setActiveTool(tool.tool);
              }}
              name={tool.tool}
              isActive={activeTool === tool.tool}
              isPulsating={isPulsating}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
