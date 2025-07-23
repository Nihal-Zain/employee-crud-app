export interface Employee {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}