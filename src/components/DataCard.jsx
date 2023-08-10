// DataCard.jsx
import React, { useState, useEffect } from "react";
import { TbWorldWww } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";
import { BsDiscord, BsMedium } from "react-icons/bs";
import styles from "./DataCard.module.css";
import { useSpring, animated } from "react-spring";
import { useGlobalContext } from "../context";
import CategoryHeader from "../mobile/CategoryHeader";

function DataCard({ data, handleBackClick }) {

  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(null);
  const [show, setShown] = useState(false);

  const { isMobile, selectedCategory } = useGlobalContext();

  useEffect(() => {
    setImgSrc(null);
    if (data.image.length !== 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && data.image.length !== 0) {
      setImgSrc(data.image);
    }
  }, [loading]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImgSrc("/platform/default.png");
  };

  const otherLinksEntries = Object.entries(data["other-links"] || {}).filter(
    ([, value]) => value
  );
  const hasOtherLinks = otherLinksEntries.length > 0;

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <animated.div
      className={styles.container}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      {isMobile && (
        <CategoryHeader
          category={selectedCategory}
          onBackClick={handleBackClick}
        />
      )}
      <div className={styles.imageContainer}>
        <img
          src={loading || data.image.length === 0 ? "" : imgSrc}
          className={styles.cardImage}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className={styles.statusAndPlatform}>
        {Object.keys(data["platform"])?.map((platform) => (
          <div
            key={platform}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={`/platform/${platform}-logo.png`}
              alt={platform}
              className={styles.platformLogo}
            />
            <p style={{ fontStyle: "italic", fontSize: "small" }}>
              {data["platform"][platform]}
            </p>
          </div>
        ))}
      </div>

      <ReactMarkdown className={`${styles.description} prose m-4`}>
        {data?.description}
      </ReactMarkdown>
      <br />

      {hasOtherLinks && (
        <div className={styles.otherLinks}>
          <b>
            Discover more about the <u>{data?.tool}</u> from the research
            conducted by the team of <strong>littlefish Foundation</strong>{" "}
            {otherLinksEntries.map(([key, value]) => (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {data.tool} deep dive.
              </a>
            ))}
          </b>
        </div>
      )}

      <div className={styles.iconLinks}>
        {Object.entries(data["official-links"])
          .filter(([, value]) => value)
          .map(([key, value]) => {
            let IconComponent;
            switch (key) {
              case "website":
                IconComponent = TbWorldWww;
                break;
              case "github":
                IconComponent = AiFillGithub;
                break;
              case "twitter":
                IconComponent = AiFillTwitterCircle;
                break;
              case "discord":
                IconComponent = BsDiscord;
                break;
              case "medium":
                IconComponent = BsMedium;
                break;
              default:
                return null;
            }

            return (
              <a
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <IconComponent size={40} />
              </a>
            );
          })}
      </div>
    </animated.div>
  );
}

export default DataCard;
