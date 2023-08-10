import React, { useState } from "react";
import "./Header.css";
import { useGlobalContext } from "../../context";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const { isMobile } = useGlobalContext();
  const [isNavVisible, setNavVisible] = useState(false);
  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <div className="header">
      <a href="/">
        <img
          src={"/littlefish.png"}
          alt="Abstract Collection Logo"
          className="logo"
        />
      </a>

      {!isMobile && (
        <nav>
          <a href="https://littlefish.foundation/" className="nav-link">
            Home
          </a>
          <a
            href="https://tools.littlefish.foundation/littlefish-research-hub/"
            className="nav-link"
          >
            Tools
          </a>
          <a href="https://map.littlefish.foundation/" className="nav-link">
            Map
          </a>
        </nav>
      )}

      {/* <button onClick={toggleNav} className="menu-icon">
        {isMobile && !isNavVisible ? <AiOutlineMenu /> : <AiOutlineClose />}
      </button> */}

      {isMobile && !isNavVisible && (
        <button onClick={toggleNav} className="menu-icon">
          <AiOutlineMenu />
        </button>
      )}

      {isMobile && isNavVisible && (
        <button onClick={toggleNav} className="menu-icon">
          <AiOutlineClose />
        </button>
      )}

      {isMobile && isNavVisible && (
        <nav className="navigation">
          {/* <AiOutlineClose onClick={toggleNav} className="close-icon" /> */}
          <a href="https://littlefish.foundation/" className="nav-link">
            Home
          </a>
          <a
            href="https://tools.littlefish.foundation/littlefish-research-hub/"
            className="nav-link"
          >
            Tools
          </a>
          <a href="https://map.littlefish.foundation/" className="nav-link">
            Map
          </a>
        </nav>
      )}
    </div>
  );
};

export default Header;

// import React, { Fragment } from "react";
// import { NavLink } from "react-router-dom";
// import "./Header.css";

// const Header = (props) => {
//   return (
//     <Fragment>
//       <nav
//         className="navbar navbar-expand-lg wrapper__navbar position-relative z-2"
//         data-aos="fade-down"
//         data-aos-duration="1000"
//         data-aos-delay="300"
//       >
//         <div className="container position-relative">
//           <NavLink to="/" exact className="navbar-brand">
//             <img src="/littlefish.png" alt="" />
//           </NavLink>

//           <button
//             className="navbar-toggler nav__button position-relative"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>

//           <div
//             className="collapse navbar-collapse wrapper__navbar-menu ml-lg-5"
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav menu__center">
//               <li className="nav-item">
//                 <a
//                   href="https://littlefish.foundation/"
//                   className="nav-link bold font__size--14 text__14-1024 active"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   href="https://tools.littlefish.foundation/littlefish-research-hub/"
//                   className="nav-link bold font__size--14 text__14-1024"
//                 >
//                   Tools
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   href="https://map.littlefish.foundation/"
//                   className="nav-link bold font__size--14 text__14-1024"
//                 >
//                   Map
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </Fragment>
//   );
// };

// export default Header;
