export type TimeServerInput = { timeZone?: string };

export type TimeServerOutput = {
  formatted: string;
  iso: string;
  timeZone: string;
};
