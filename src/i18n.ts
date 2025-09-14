import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// JSON fayllarni import qilish
import enTranslation from './locales/en/translation.json';
import uzTranslation from './locales/uz/translation.json';

// Resurslarni aniqlash
const resources = {
  en: {
    translation: enTranslation,
  },
  uz: {
    translation: uzTranslation,
  },
};

i18n
  .use(LanguageDetector) // Brauzer tilini aniqlash
  .use(initReactI18next) // React bilan integratsiya
  .init({
    resources,
    fallbackLng: 'en', // Agar til aniqlanmasa, ingliz tili ishlatiladi
    detection: {
      order: ['localStorage', 'navigator'], // Birinchi localStorage, keyin brauzer tili
      lookupLocalStorage: 'i18nextLng', // localStorage da tilni saqlash uchun kalit
      caches: ['localStorage'], // Tilni localStorage da keshlash
    },
    interpolation: {
      escapeValue: false, // React o'zi xavfsiz tarzda ma'lumotlarni boshqaradi
    },
    lng: localStorage.getItem('i18nextLng') || 'en', // Dastlabki tilni localStorage dan olish
  });

export default i18n;