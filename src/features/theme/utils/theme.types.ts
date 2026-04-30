export type ThemeType = 'nature' | 'dark' | 'light' | 'ocean' | 'desert';

export interface ITheme {
  id: ThemeType;
  name: string;
  primary: string;
  secondary: string;
}
