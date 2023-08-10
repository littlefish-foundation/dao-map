// // // CategoryCard.jsx
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import styles from "./CategoryCard.module.css";
// import { useSpring, animated } from "react-spring";
// import Pulsating from "../mobile/Pulsating";
// import { useGlobalContext } from "../context";

// const CategoryCard = ({ data, onCategorySelect }) => {
//   const [show, setShown] = useState(false);
//   const { isMobile } = useGlobalContext();

//   const props3 = useSpring({
//     transform: show ? "scale(1.03)" : "scale(1)",
//     boxShadow: show
//       ? "0 20px 25px rgb(0 0 0 / 25%)"
//       : "0 2px 10px rgb(0 0 0 / 8%)",
//   });

//   const animation = useSpring({
//     transform: show ? "scale(1.03)" : "scale(1)",
//     boxShadow: show
//       ? "0 20px 25px rgb(0 0 0 / 25%)"
//       : "0 2px 10px rgb(0 0 0 / 8%)",
//     // Add a pulse animation
//     config: { duration: 500 },
//     onRest: () => setShown(!show),
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setShown((prev) => !prev);
//     }, 1500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <animated.div className={styles.container}>
//       <div onClick={onCategorySelect} style={{ cursor: "pointer" }}>
//         {isMobile && <Pulsating />}
//         <h1 className={styles.title}>{data?.name}</h1>

//         <div className={styles.imageContainer}>
//           <img
//             src={`/categories/${data.name}.png`}
//             alt={data?.name}
//             className={styles.image}
//           />
//         </div>
//         <ReactMarkdown className={`${styles.description} prose m-4`}>
//           {data?.description}
//         </ReactMarkdown>

//         {data?.gitbook && (
//           <div className={styles.gitbook}>
//             <b>
//               Discover more about the <u>{data?.name} Category</u> from the
//               knowledge database of the <strong>littlefish Foundation</strong>{" "}
//               on the{" "}
//               <a
//                 href={data.gitbook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.link}
//               >
//                 GitBook platform.
//               </a>
//             </b>
//           </div>
//         )}
//       </div>
//     </animated.div>
//   );
// };

// export default CategoryCard;

// CategoryCard.jsx
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./CategoryCard.module.css";
import { useSpring, animated } from "react-spring";
import Pulsating from "../mobile/Pulsating";
import { useGlobalContext } from "../context";

const CategoryCard = ({ data, onCategorySelect }) => {
  const [show, setShown] = useState(false);
  const { isMobile } = useGlobalContext();

  const animation = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
    config: { duration: 500 },
    onRest: () => setShown(!show),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setShown((prev) => !prev);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const CardContent = (
    <div onClick={onCategorySelect} style={{ cursor: "pointer" }}>
      <h1 className={styles.title}>{data?.name}</h1>

      <div className={styles.imageContainer}>
        <img
          src={`/categories/${data.name}.png`}
          alt={data?.name}
          className={styles.image}
        />
      </div>
      <ReactMarkdown className={`${styles.description} prose m-4`}>
        {data?.description}
      </ReactMarkdown>

      {data?.gitbook && (
        <div className={styles.gitbook}>
          <b>
            Discover more about the <u>{data?.name} Category</u> from the
            knowledge database of the <strong>littlefish Foundation</strong> on
            the{" "}
            <a
              href={data.gitbook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitBook platform.
            </a>
          </b>
        </div>
      )}
    </div>
  );

  return (
    <>
      {" "}
      {isMobile ? (
        <Pulsating>
          <animated.div className={styles.container}>
            {CardContent}
          </animated.div>
        </Pulsating>
      ) : (
        <animated.div className={styles.container}>
          {CardContent}
        </animated.div>
      )}
    </>
  );
};

export default CategoryCard;
