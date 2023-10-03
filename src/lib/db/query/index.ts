/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Options } from 'async-retry';

import { getFirstQuery, getQuery, mutateAndReturnQuery, mutateQuery } from './pg';

type QueryDB = {
  /**
   * Returns the first item from the DB query
   */
  findFirst: <T>(query: string, params?: any[], retryConfig?: Options) => Promise<T | undefined>;

  /**
   * Returns an array of items from the DB query
   */
  findMany: <T>(query: string, params?: any[], retryConfig?: Options) => Promise<T[]>;

  /**
   * Update DB queries that don't return a value
   */
  update: (query: string, params?: any[], retryConfig?: Options) => Promise<void>;

  /**
   * Update DB queries that do return a value
   */
  updateAndReturn: <T>(query: string, params?: any[], retryConfig?: Options) => Promise<T[]>;

  /**
   * Delete DB queries
   */
  delete: (query: string, params?: any[], retryConfig?: Options) => Promise<void>;
};

export const queryDb: QueryDB = {
  findMany: async (...args) => getQuery(...args),
  findFirst: async (...args) => getFirstQuery(...args),
  update: async (...args) => mutateQuery(...args),
  updateAndReturn: async (...args) => mutateAndReturnQuery(...args),
  delete: async (...args) => mutateQuery(...args),
};
