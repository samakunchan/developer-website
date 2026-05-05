export type ThemeType = 'nature' | 'dark' | 'light' | 'ocean' | 'desert' | 'guardian' | 'aegis';

export interface ITheme {
  id: ThemeType;
  name: string;
  primary: string;
  secondary: string;
}
