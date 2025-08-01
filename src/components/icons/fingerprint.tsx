import React from "react";

interface FingerprintProps {
  fingerprintRef: React.RefObject<SVGSVGElement | null>;
  isHovering: boolean;
}

const Fingerprint: React.FC<FingerprintProps> = ({
  fingerprintRef,
  isHovering,
}) => {
  return (
    <svg
      ref={fingerprintRef}
      className="mr-2 h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`fingerprint-path ${isHovering ? "animate" : ""}`}
        d="M6.23454 19.3052C6.42429 18.8483 6.59884 18.3835 6.75758 17.9114"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={`fingerprint-path ${isHovering ? "animate" : ""} `}
        d="M14.4235 21.0018C14.6981 20.2273 14.9417 19.4381 15.1528 18.6357C15.3443 17.9077 15.5091 17.1689 15.646 16.4204"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={`fingerprint-path ${isHovering ? "animate" : ""}`}
        d="M19.6893 17.2526C20.0652 15.2266 20.2617 13.1377 20.2617 11.0028C20.2617 6.44492 16.5668 2.75 12.0089 2.75C10.7138 2.75 9.48836 3.04832 8.39758 3.57999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={`fingerprint-path ${isHovering ? "animate" : ""}`}
        d="M3.26172 15.1545C3.58481 13.8235 3.75605 12.4332 3.75605 11.0028C3.75605 9.20753 4.32931 7.54611 5.30276 6.19165"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={`fingerprint-path ${isHovering ? "animate" : ""}`}
        d="M12.0093 11.0028C12.0093 13.8505 11.5478 16.5903 10.6955 19.1517C10.4762 19.8107 10.231 20.458 9.9611 21.0922"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={`fingerprint-path ${isHovering ? "animate" : ""}`}
        d="M7.67682 14C7.8124 13.0204 7.88247 12.0198 7.88247 11.0028C7.88247 8.72388 9.72993 6.87642 12.0089 6.87642C14.2878 6.87642 16.1353 8.72388 16.1353 11.0028C16.1353 11.5049 16.1229 12.004 16.0985 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Fingerprint;
