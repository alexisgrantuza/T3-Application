import React from "react";
import type { NavbarProps } from "~/types/props";
import { navLinks } from "~/constants";
import NavLinks from "~/components/ui/navlinks";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getUserInitials } from "~/lib/utils";
import Link from "next/link";
import Fingerprint from "~/components/icons/fingerprint";

const MobileLayout = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  session,
  fingerprintRef,
  isHovering,
  handleSignOut,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  session: NavbarProps["session"];
  fingerprintRef: React.RefObject<SVGSVGElement | null>;
  isHovering: boolean;
  handleSignOut?: () => void;
}) => {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <NavLinks navLinks={navLinks} />
          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              {session?.user ? (
                // Mobile Avatar Section
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user.image ?? ""}
                      alt={session.user.name ?? "User"}
                    />
                    <AvatarFallback className="bg-gray-700 text-white">
                      {session.user.name
                        ? getUserInitials(session.user.name ?? "")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {session.user.email}
                    </span>
                  </div>
                </div>
              ) : (
                // Mobile Login Button
                <Link
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  href="/login"
                >
                  <Fingerprint
                    fingerprintRef={fingerprintRef}
                    isHovering={isHovering}
                  />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu items for authenticated users */}
            {session?.user && (
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileLayout;
