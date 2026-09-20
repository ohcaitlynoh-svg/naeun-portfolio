"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "ko" | "en";
export type Theme = "light" | "dark";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
}>({ language: "ko", setLanguage: () => {} });

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function SiteProviders({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");
  const [theme, setThemeState] = useState<Theme>("light");

  // Sync from the attributes the blocking <head> script already set,
  // before paint — avoids a visible flash and any hydration mismatch.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const domTheme = root.getAttribute("data-theme");
    if (domTheme === "light" || domTheme === "dark") {
      setThemeState(domTheme);
    }
    const domLang = root.getAttribute("lang");
    if (domLang === "ko" || domLang === "en") {
      setLanguageState(domLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    try {
      localStorage.setItem("site-language", l);
    } catch {
      // localStorage unavailable (private mode, etc.) — state still updates
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("site-theme", t);
    } catch {
      // localStorage unavailable — state still updates
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}
