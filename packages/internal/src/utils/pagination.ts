/***
 * DO NOT EDIT THIS PAGE
 */

export interface Page<T> {
  data: T[];
  page: number;
  totalPages: number;
  next: number | null;
  size: number;
  total: number;
  prev: number | null;
}

/**
 *
 * Returns the given array paginated
 */
export const paginate = <T>(arr: T[], page = 1, perPage = 15): Page<T> => {
  let p = page < 2 ? 0 : page - 1;
  const data = arr.slice(p * perPage, p * perPage + perPage);

  const totalPages = Math.round(arr.length / perPage);

  let next: number | null = Math.floor(Math.min(page + 1, totalPages));
  let prev: number | null = Math.floor(Math.max(page - 1, 0));
  console.log({ prev, next });

  if (next === totalPages) {
    next = null;
  }

  if (prev <= 0) {
    prev = null;
  }

  return {
    page,
    data,
    prev,
    next,
    size: data.length,
    total: arr.length,
    totalPages,
  };
};
