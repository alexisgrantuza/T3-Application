import React from "react";
import Link from "next/link";

const NavLinks = ({
  navLinks,
}: {
  navLinks: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}) => {
  return (
    <>
      {navLinks.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.href}
          className="block gap-8 px-3 py-2"
        >
          <span className="block sm:hidden">{navLink.icon}</span>
          <span className="rounded-md text-base font-medium text-gray-300 md:text-sm">
            {navLink.name}
          </span>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
