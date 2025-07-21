import React from "react";

interface ArrowLogoProps {
  isFeatureDropdownOpen: boolean;
}

const ArrowLogo: React.FC<ArrowLogoProps> = ({ isFeatureDropdownOpen }) => {
  return (
    <svg
      className={`ml-1 h-4 w-4 transform transition-transform ${
        isFeatureDropdownOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default ArrowLogo;
