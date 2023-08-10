import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import styles from "./Carousel.module.css";
import { useSwipeable } from "react-swipeable";

function Lines({
  slides,
  activeSlide,
  handleBackClick,
  visibility,
  setGoToSlide,
}) {
  const handleClick = (index) => {
    setGoToSlide(index);
  };
  return (
    <div className={styles.lines}>
      {slides?.map((slide, index) => (
        <span
          key={index}
          className={`${styles.line} ${
            index === activeSlide ? styles.active : ""
          }`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export default function Carroussel(props) {
  const [goToSlide, setGoToSlide] = useState(props.idx || 0);
  const [offsetRadius, setOffsetRadius] = useState(props.offset || 1);
  const [showArrows, setShowArrows] = useState(props.showArrows || true);
  const [direction, setDirection] = useState(null);

  // const slides = (props.cards || []).map((element, index) => {
  //   return {
  //     ...element,
  //     onClick: () => {
  //       setGoToSlide(index);
  //       if (element.content.props.onCategorySelect) {
  //         element.content.props.onCategorySelect();
  //       }
  //     },
  //     style: {
  //       opacity: goToSlide === index ? 1 : 0.1,
  //     },
  //   };
  // });

  const slides = (props.cards || []).map((element, index) => {
    return {
      ...element,
      onClick: () => {
        if (goToSlide === index) {
          setGoToSlide(index);
          if (element.content.props.onCategorySelect) {
            element.content.props.onCategorySelect();
          }
        }
      },
      style: {
        opacity: goToSlide === index ? 1 : 0.5,
      },
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => setDirection("left"),
    onSwipedRight: () => setDirection("right"),
  });

  useEffect(() => {
    if (direction === "left") {
      const nextSlide = (goToSlide + 1) % slides.length;
      setGoToSlide(nextSlide);
      props.setActiveSlide(nextSlide); // Add this
    } else if (direction === "right") {
      const nextSlide = (goToSlide - 1 + slides.length) % slides.length;
      setGoToSlide(nextSlide);
      props.setActiveSlide(nextSlide); // Add this
    }
    // Reset direction to null after the update has happened.
    setTimeout(() => setDirection(null), 0);
  }, [direction, slides.length]);

  useEffect(() => {
    if (props.offset !== undefined) {
      setOffsetRadius(props.offset);
    }
    if (props.showArrows !== undefined) {
      setShowArrows(props.showArrows);
    }
  }, [props.offset, props.showArrows]);

  return (
    <div
      {...handlers}
      style={{
        width: "100%",
        height: "-webkit-fill-available",
        margin: props.margin,
      }}
    >
      <Lines
        slides={slides}
        activeSlide={goToSlide}
        onClick={setGoToSlide}
        handleBackClick={props.handleBackClick}
        setGoToSlide={setGoToSlide}
      />

      <Carousel
        style={{ position: "unset" }}
        slides={slides}
        goToSlide={goToSlide}
        goToSlideDelay={0.0}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        offsetFn={(offsetFromCenter, index) => ({
          opacity: 1 - Math.abs(offsetFromCenter) / 1,
          // disabled: (offsetFromCenter = 0),
        })}
      />
    </div>
  );
}
