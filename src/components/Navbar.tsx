"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import IconLogo from "~/components/icons/logo";
import ArrowLogo from "./icons/arrow";
import Fingerprint from "./icons/fingerprint";
import Hamburger from "./icons/hamburger";
import Close from "./icons/close";
import { navLinks } from "~/constants";
import NavLinks from "./ui/navlinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";
import { handleSignOut } from "~/server/actions/auth";
import { getUserInitials } from "~/lib/utils";
import MobileLayout from "./layout/mobile-layout";
import type { NavbarProps } from "~/types/props";

const Navbar = ({ session }: NavbarProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] =
    useState<boolean>(false);
  const fingerprintRef = useRef<SVGSVGElement | null>(null);

  // Clean up animation timeouts
  useEffect(() => {
    const fingerprintElement = fingerprintRef.current;
    return () => {
      if (fingerprintElement) {
        const paths = fingerprintElement.querySelectorAll("path");
        paths.forEach((path) => {
          path.style.animation = "none";
        });
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <nav className="border-b border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <IconLogo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Features Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsFeatureDropdownOpen(!isFeatureDropdownOpen)
                    }
                    onMouseEnter={() => setIsFeatureDropdownOpen(true)}
                    onMouseLeave={() => setIsFeatureDropdownOpen(false)}
                    className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300"
                  >
                    Features
                    <ArrowLogo isFeatureDropdownOpen={isFeatureDropdownOpen} />
                  </button>
                </div>

                {/* Other navigation items */}
                <NavLinks navLinks={navLinks} />
              </div>
            </div>
          </div>

          {/* Authentication Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {session?.user ? (
                // Avatar Dropdown for authenticated users
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 cursor-pointer rounded-full p-0 text-gray-300 hover:bg-gray-700 focus:outline-none"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.user.image ?? ""}
                          alt={session.user.name ?? "User"}
                        />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {session.user.name
                            ? getUserInitials(session.user.name)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 border-gray-700 bg-gray-900"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal text-gray-300">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium text-white">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-gray-400">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Login button for unauthenticated users
                <Link
                  href="/login"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Fingerprint
                    fingerprintRef={fingerprintRef}
                    isHovering={isHovering}
                  />
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? <Hamburger /> : <Close />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileLayout
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        fingerprintRef={fingerprintRef}
        session={session}
        isHovering={isHovering}
      />
    </nav>
  );
};

export default Navbar;
