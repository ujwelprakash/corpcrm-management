import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../lib/i18n";

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const { t, i18n } = useTranslation("common");
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem("colorTheme") || "orange";
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    if (colorTheme === "orange") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", colorTheme);
    }
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[3];

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <header
      className="h-14 flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      style={{
        background: `rgb(var(--color-surface))`,
        borderBottom: `1px solid rgb(var(--color-border-soft))`,
      }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 rounded-lg transition-colors items-center hover:bg-[rgb(var(--color-bg-muted))]"
        aria-label="Open menu"
      >
        <span className="h-px rounded-full block w-[18px] bg-[rgb(var(--color-text-soft))]" />
        <span className="h-px rounded-full block w-[13px] bg-[rgb(var(--color-text-soft))]" />
        <span className="h-px rounded-full block w-[18px] bg-[rgb(var(--color-text-soft))]" />
      </button>

      {/* Page title — desktop */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-[13px] text-[rgb(var(--color-text-muted))]">/</span>
        <span className="text-[13px] font-semibold text-[rgb(var(--color-text))]">
          {t("dashboard")}
        </span>
      </div>

      {/* Search — center */}
      <div className="flex-1 max-w-sm mx-auto hidden sm:block">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgb(var(--color-text-muted))]"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder={t("search")}
            className="w-full rounded-xl pl-9 pr-10 py-2 text-[13px] outline-none transition-all
              bg-[rgb(var(--color-bg-soft))]
              border border-[rgb(var(--color-border))]
              text-[rgb(var(--color-text-soft))]
              placeholder:text-[rgb(var(--color-text-muted))]
              focus:border-[rgb(var(--accent))]
              focus:ring-2 focus:ring-[rgb(var(--accent)/0.12)]
              focus:bg-[rgb(var(--color-surface))]"
          />
          <kbd
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{
              color: `rgb(var(--color-text-muted))`,
              border: `1px solid rgb(var(--color-border))`,
              background: `rgb(var(--color-surface))`,
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-1.5">

        {/* ── Language Switcher ── */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all hover:bg-[rgb(var(--color-bg-muted))]"
            style={{
              color: `rgb(var(--color-text))`,
              border: `1px solid rgb(var(--color-border))`,
            }}
          >
            {currentLang.code.toUpperCase()}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {langOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] w-44 rounded-xl overflow-hidden z-50"
              style={{
                background: `rgb(var(--color-surface))`,
                border: `1px solid rgb(var(--color-border-soft))`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.10)`,
              }}
            >
              <div className="max-h-72 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left transition-colors hover:bg-[rgb(var(--color-bg-soft))]"
                    style={{
                      color: lang.code === i18n.language
                        ? `rgb(var(--accent))`
                        : `rgb(var(--color-text-soft))`,
                      fontWeight: lang.code === i18n.language ? 600 : 400,
                    }}
                  >
                    {lang.label}
                    {lang.code === i18n.language && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Theme Switcher ── */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => setThemeOpen((prev) => !prev)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-[rgb(var(--color-bg-muted))]"
            aria-label="Change color theme"
          >
            <svg className="w-[18px] h-[18px] text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-soft))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>

          {themeOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] w-36 rounded-xl overflow-hidden z-50 p-2 space-y-1"
              style={{
                background: `rgb(var(--color-surface))`,
                border: `1px solid rgb(var(--color-border-soft))`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.10)`,
              }}
            >
              {[
                { id: "orange", label: "Orange", color: "bg-orange-500" },
                { id: "blue", label: "Blue", color: "bg-blue-500" },
                { id: "emerald", label: "Emerald", color: "bg-emerald-500" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setColorTheme(t.id); setThemeOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors hover:bg-[rgb(var(--color-bg-soft))]"
                  style={{
                    color: t.id === colorTheme ? `rgb(var(--accent))` : `rgb(var(--color-text-soft))`,
                    fontWeight: t.id === colorTheme ? 600 : 400,
                  }}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all
            text-[rgb(var(--color-text-muted))]
            hover:text-[rgb(var(--color-text-soft))]
            hover:bg-[rgb(var(--color-bg-muted))]"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Notification bell */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all
            text-[rgb(var(--color-text-muted))]
            hover:text-[rgb(var(--color-text-soft))]
            hover:bg-[rgb(var(--color-bg-muted))]"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full border-2"
            style={{
              background: `rgb(var(--accent))`,
              borderColor: `rgb(var(--color-surface))`,
            }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-5 mx-0.5" style={{ background: `rgb(var(--color-border))` }} />

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all hover:bg-[rgb(var(--color-bg-muted))]"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: `rgb(var(--accent))` }}
            >
              A
            </div>
            <span className="hidden sm:block text-[12.5px] font-medium text-[rgb(var(--color-text))]">
              Admin
            </span>
            <svg
              className={`w-3 h-3 hidden sm:block text-[rgb(var(--color-text-muted))] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-xl overflow-hidden z-50"
              style={{
                background: `rgb(var(--color-surface))`,
                border: `1px solid rgb(var(--color-border-soft))`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.10)`,
              }}
            >
              <div
                className="px-4 py-3"
                style={{ borderBottom: `1px solid rgb(var(--color-border-soft))` }}
              >
                <p className="text-[12.5px] font-semibold text-[rgb(var(--color-text))]">Admin User</p>
                <p className="text-[11px] text-[rgb(var(--color-text-muted))] mt-0.5">admin@company.com</p>
              </div>

              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors text-left
                  text-[rgb(var(--color-text-soft))]
                  hover:bg-[rgb(var(--color-bg-soft))]
                  hover:text-[rgb(var(--color-text))]"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t("profile")}
              </button>

              <div style={{ height: "1px", background: `rgb(var(--color-border-soft))` }} />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;