import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../locales/en/common.json";
import enEmployees from "../locales/en/employees.json";
import enSidebar from "../locales/en/sidebar.json";

import arCommon from "../locales/ar/common.json";
import arEmployees from "../locales/ar/employees.json";
import arSidebar from "../locales/ar/sidebar.json";

import esCommon from "../locales/es/common.json";
import esEmployees from "../locales/es/employees.json";
import esSidebar from "../locales/es/sidebar.json";

export const LANGUAGES = [
  { code: "en", label: "English", rtl: false },
  { code: "ar", label: "Arabic", rtl: true },  
  { code: "es", label: "Spanish", rtl: false },
];

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      employees: enEmployees,
      sidebar: enSidebar,
    },
    ar: {
      common: arCommon,
      employees: arEmployees,
      sidebar: arSidebar,
    },
    es: {
      common: esCommon,
      employees: esEmployees,
      sidebar: esSidebar,
    },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  ns: ["common", "employees", "sidebar"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

const applyDirection = (lng: string) => {
  const isRtl = LANGUAGES.find((l) => l.code === lng)?.rtl ?? false;
  document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
};
applyDirection(i18n.language);
i18n.on("languageChanged", applyDirection);

export default i18n;