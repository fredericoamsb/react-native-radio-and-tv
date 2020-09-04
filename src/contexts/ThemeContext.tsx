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

export const theme = {
  backgroundColor: '#eee',
  videoPageBackgroundColor: '#000',
  primaryColor: '#FF1965',
  secondaryColor: '#38A0FC',
  developedByColor: '#5B5EA0',
  textLightColor: '#fff',
  textLightOpaqueColor: '#ffffffb3',
  textDarkColor: '#000',
  tabsBackgroundColor: '#38A0FC',
};

interface Props {
  theme: Theme;
}

export const ThemeContext = React.createContext({} as Theme);

export const ThemeContextProvider: React.FC<Props> = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
