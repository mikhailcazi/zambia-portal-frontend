import React from "react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router";

const Header: React.FC = () => {
  const links = [
    {
      key: "home",
      label: "Home",
      href: "/home",
      active: false,
    },
    {
      key: "projects",
      label: "Projects",
      href: "/projects",
      active: false,
    },
    {
      key: "form",
      label: "Form",
      href: "/form",
      active: false,
    },
  ];

  const route = useLocation().pathname.slice(1);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <div className="mr-6 hidden lg:flex">
          <ZambiaLogo />
          <a href="/" className="px-5 self-center text-2xl">
            Zambia Green Investment Portal
          </a>
        </div>
        <div className="ml-auto flex gap-2">
          {links.map((link) => (
            <Link
              data-active={link.key === route}
              key={link.key}
              id={link.key}
              to={link.href}
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-gray-100 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              {link.label}
            </Link>
          ))}

          <Button variant="outline" className="justify-self-end">
            Sign in
          </Button>
          <Button className="justify-self-end">Sign Up</Button>
        </div>
      </header>
    </div>
  );
};

export function ZambiaLogo() {
  return (
    <>
      <a href="#">
        <img className="h-12 w-12" src="/images/ZM_Coat_of_Arms.png" />
      </a>
    </>
  );
}
export default Header;
