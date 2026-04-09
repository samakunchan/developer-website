export type DbStatus = {
  status: 'online' | 'offline';
  details?: Record<string, string>;
  error?: string;
};
