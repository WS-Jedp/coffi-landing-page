"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale(); // Use next-intl's locale detection

  const changeLanguage = (newLocale: string) => {
    // Set a cookie to remember the user's language preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    if (pathname === "/") {
      // For root path, reload the page so middleware can pick up the new cookie
      window.location.href = "/";
    } else if (newLocale === 'en') {
      // For English (default locale), navigate to root path or remove locale prefix
      if (pathname.startsWith('/es')) {
        const newPath = pathname.replace('/es', '') || '/';
        router.push(newPath);
      } else {
        router.push('/');
      }
    } else if (newLocale === 'es') {
      // For Spanish, ensure we have the /es prefix
      if (pathname.startsWith('/en')) {
        const newPath = pathname.replace('/en', '/es');
        router.push(newPath);
      } else if (!pathname.startsWith('/es')) {
        router.push(`/es${pathname === '/' ? '' : pathname}`);
      }
    }
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
