export type ThemeType = 'dark' | 'light' | 'forest' | 'ocean' | 'desert' | 'guardian' | 'aegis';

export interface ITheme {
  id: ThemeType;
  name: string;
  primary: string;
  secondary: string;
  category: string;
}
