"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Get current locale from the URL
  const currentLocale = pathname.split("/")[1] || "en";

  const changeLanguage = (newLocale: string) => {
    // Update the URL with the new locale
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Language Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center px-3 py-1 text-gray-700 bg-transparent shadow-sm border rounded-md  hover:bg-gray-200 transition"
      >
        <span className="font-medium text-xs uppercase">
            {languages.find((lang) => lang.code === currentLocale)?.code}
        </span>
        {/* <span className="ml-1 text-sm">▼</span> */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-0 w-28 mt-2 drop-shadow-md bg-white/80 backdrop-blur-md border rounded-md shadow-md">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition text-left"
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
