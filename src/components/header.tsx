import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Home, FolderKanban, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";

const Header: React.FC = () => {
  const links = [
    {
      key: "home",
      label: "Home",
      href: "/home",
      icon: Home,
    },
    {
      key: "projects",
      label: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      key: "form",
      label: "Form",
      href: "/form",
      icon: FileText,
    },
  ];
  const nav = useNavigate();
  const route = useLocation().pathname.slice(1);
  const { authLogout, isAuthenticated } = useAuth();

  const logout = () => {
    authLogout();
    nav("/home");
  };

  const login = () => {
    nav("/user/login");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full items-center">
        {/* Logo always visible */}
        <div className="mr-4 flex items-center gap-3">
          <ZambiaLogo />
          <a href="/">
            <span className="hidden lg:inline text-2xl">
              Zambia Green Investment Portal
            </span>
          </a>
        </div>

        {/* Nav */}
        <div className="ml-auto flex gap-2">
          {links.map((link) => {
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
            <Button
              variant="outline"
              className="justify-self-end"
              onClick={logout}
            >
              Log Out
            </Button>
          ) : (
            <Button className="justify-self-end" onClick={login}>
              Log In / Register
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
