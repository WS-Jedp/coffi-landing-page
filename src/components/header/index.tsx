"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export const Header: React.FC = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState<boolean>(false);

  function handleClickMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => setShouldRenderMenu(false), 300); // Match duration with animation
    } else {
      setShouldRenderMenu(true);
      setTimeout(() => setIsMenuOpen(true), 10); // Delay to ensure animation starts
    }
  }

  const menuOptions = [
  
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/#pricing",
    },
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];

  function handleMenuOption(link: string) {
    setIsMenuOpen(false);
    setTimeout(() => setShouldRenderMenu(false), 300); // Match duration with animation
    router.push(link);
  }
  return (
    <header className="sticky top-0 left-0 w-full h-20 drop-shadow-md bg-white flex flex-row flex-nowrap items-center justify-between px-6 z-[999]">
      <div className="w-full max-w-[1200px] h-full flex items-center justify-between mx-auto">
        <article className="flex flex-row flex-nowrap items-center cursor-pointer text-coffi-black">
          <Image
            src="/assets/images/coffi-logo.svg"
            alt="logo"
            width={45}
            height={45}
            className="mr-1"
          />
          <Link href="/">
          <div className="flex flex-col items-start jusitfy-center h-full border-solid border-black">
            <h1 className="block font-black text-xl md:text-2xl cursor-pointer my-0 py-0">
              Coffi
            </h1>
            <h2 className="font-light text-xs md:text-sm my-0 py-0 pl-[1px] mt-[-3px]">
              Be where you thrive
            </h2>
          </div>
          </Link>

        </article>

        <menu className="relative flex items-center text-coffi-black">
          <ul className="hidden md:flex flex-row flex-nowrap items-center gap-4 ">
            {menuOptions.map((option) => (
              <li
                key={option.name}
                className="font-normal text-xs md:text-sm cursor-pointer hover:text-coffi-purple"
              >
                <Link href={option.link}>{option.name}</Link>
              </li>
            ))}
          </ul>

          <button
            className="block md:hidden p-2 focus:outline-none"
            aria-label="Toggle Navigation"
            onClick={handleClickMenu}
          >
            <div
              className="w-6 h-1 bg-gray-800 my-1 transition-transform transform origin-center"
              id="line1"
            ></div>
            <div
              className="w-6 h-1 bg-gray-800 my-1 transition-opacity"
              id="line2"
            ></div>
            <div
              className="w-6 h-1 bg-gray-800 my-1 transition-transform transform origin-center"
              id="line3"
            ></div>
          </button>

          {shouldRenderMenu && (
            <div
              className={`fixed top-0 left-0 w-full flex flex-col items-center justify-center text-center h-screen 
            bg-white shadow-md transform transition-all duration-500 ease-in-out
              ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0"
              }
            `}
            >
              <h2 className="font-bold text-5xl">Menu</h2>
              <ul className="flex flex-col space-y-4 p-4 w-full">
                {
                  menuOptions.map((option) => (
                    <li
                      key={option.name}
                      className="font-normal text-xl cursor-pointer hover:text-coffi-purple"
                    >
                      <button onClick={() => handleMenuOption(option.link)}>{option.name}</button>
                    </li>
                  ))
                }
                <hr />
                <li>
                  <button
                    className="
                     bg-white hover:bg-coffi-black/30
                      text-md text-coffi-black
                     border-[1px] border-solid border-coffi-black px-9 py-1 rounded-md
                     transition-colors ease-in-out duration-300
                    "
                    onClick={handleClickMenu}
                  >
                    Close
                  </button>
                </li>
              </ul>
            </div>
          )}
        </menu>
      </div>
    </header>
  );
};
