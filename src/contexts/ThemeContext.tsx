import React from 'react';

export interface Theme {
  backgroundColor: string;
  videoPageBackgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  developedByColor: string;
  textLightColor: string;
  textLightOpaqueColor: string;
  textDarkColor: string;
  tabsBackgroundColor: string;
}

interface Props {
  theme: Theme;
}

export const ThemeContext = React.createContext({} as Theme);

export const ThemeContextProvider: React.FC<Props> = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
