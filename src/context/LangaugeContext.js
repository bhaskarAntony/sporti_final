import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isKannada, setIsKannada] = useState(false);


  return (
    <LanguageContext.Provider value={{isKannada, setIsKannada}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
