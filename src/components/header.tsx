import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Home, FolderKanban, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { CircleUser } from "lucide-react";

const Header: React.FC = () => {
  const { authLogout, isAuthenticated } = useAuth();
  const nav = useNavigate();
  const route = useLocation().pathname.slice(1);

  const links = [
    {
      key: "home",
      label: "Home",
      href: "/home",
      icon: Home,
      show: !isAuthenticated,
    },
    {
      key: "user/home",
      label: "Home",
      href: "/user/home",
      icon: Home,
      show: isAuthenticated,
    },
    {
      key: "projects",
      label: "Projects",
      href: "/projects",
      icon: FolderKanban,
      show: !isAuthenticated,
    },
    {
      key: "form",
      label: "Form",
      href: "/form",
      icon: FileText,
      show: isAuthenticated,
    },
    {
      key: "submit-your-proposal",
      label: "Submit",
      href: "/submit-your-proposal",
      icon: FileText,
      show: !isAuthenticated,
    },
  ];

  const logout = () => {
    authLogout();
    nav("/user/login");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full items-center">
        {/* Logo always visible */}
        <div className="mr-4 flex items-center gap-3">
          <ZambiaLogo />
          <Link to="/user/home" className="px-5 self-center text-2xl">
            <span className="hidden lg:inline text-2xl">
              Zambia Green Investment Portal
            </span>
          </Link>
        </div>

        {/* Nav */}
        <div className="ml-auto flex gap-2">
          {links
            .filter((x) => x.show)
            .map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.key}
                  to={link.href}
                  data-active={link.key === route}
                  className="
                  group
                  inline-flex
                  h-9
                  w-9
                  md:w-auto
                  items-center
                  justify-center
                  rounded-md
                  bg-white
                  px-0
                  md:px-4
                  text-sm
                  font-medium
                  transition-colors
                  hover:bg-gray-100
                  data-[active=true]:bg-gray-100
                "
                >
                  {/* Icon on mobile */}
                  <Icon className="h-5 w-5 md:hidden" />

                  {/* Text on desktop */}
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="border-black">
                  <CircleUser className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => nav("/user/proposals")}>
                  My Proposals
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => nav("/user/profile")}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 focus:text-red-600"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="justify-self-end">
              <Link to={"/user/login"}>Login</Link>
            </Button>
          )}
        </div>
      </header>
    </div>
  );
};

export function ZambiaLogo() {
  return (
    <a href="/">
      <img
        className="h-10 w-10"
        src="/images/ZM_Coat_of_Arms.png"
        alt="Zambia Coat of Arms"
      />
    </a>
  );
}

export default Header;
