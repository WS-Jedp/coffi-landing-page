"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

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
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-coffi-black hover:bg-coffi-purple-50 transition"
      >
        <Globe size={16} strokeWidth={2} />
        <span className="font-semibold text-xs uppercase">
          {languages.find((lang) => lang.code === currentLocale)?.code}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-0 w-32 mt-2 p-1 drop-shadow-md bg-white/90 backdrop-blur-md border border-white/60 rounded-xl shadow-lg shadow-coffi-purple/10">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full px-3 py-2 rounded-lg text-left text-sm transition hover:bg-coffi-purple-50 ${
                  lang.code === currentLocale
                    ? "text-coffi-purple font-semibold"
                    : "text-coffi-black"
                }`}
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
