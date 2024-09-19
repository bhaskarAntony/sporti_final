// TranslationContext.js
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationContext = createContext();

export const TranslationHOC = ({ children }) => {
  const { t, i18n } = useTranslation();

  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <TranslationContext.Provider value={{ t, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => useContext(TranslationContext);