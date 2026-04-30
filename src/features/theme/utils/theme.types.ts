export type ThemeType = 'nature' | 'dark' | 'light';

export interface ITheme {
  id: ThemeType;
  name: string;
  primary: string;
  secondary: string;
}
