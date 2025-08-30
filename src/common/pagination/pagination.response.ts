export interface PaginationResponse<T> {
  data: T[];
  metadata: {
    total: number;
    offset: number;
    limit: number;
  };
}
