import React, { useState } from "react";
import "./FilterComponent.css";

const FilterComponent = ({ onFilter }) => {
  const [activeFilter, setActiveFilter] = useState("");

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) {
      // If the same filter is clicked again, remove the active state
      onFilter(""); // Clear the filter
      setActiveFilter(""); // Clear the activeFilter state
    } else {
      onFilter(filter);
      setActiveFilter(filter);
    }
  };

  return (
    <div className="filter">
      <button
        onClick={() => handleFilterClick("cardano")}
        className={`filternav ${activeFilter === "cardano" ? "active" : ""}`}
      >
        <img
          src={`/platform/cardano-logo.png`}
          className="platformLogo"
          alt="Cardano logo"
        />
      </button>
      <button
        onClick={() => handleFilterClick("blockchain")}
        className={`filternav ${activeFilter === "blockchain" ? "active" : ""}`}
      >
        <img
          src={`/platform/Blockchain-Logo.png`}
          className="platformLogoB"
          alt="Blockchain logo"
        />
      </button>
    </div>
  );
};

export default FilterComponent;
