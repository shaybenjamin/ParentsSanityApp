export type Locale = 'en' | 'he';

export interface BilingualField {
  en: string;
  he: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
}
