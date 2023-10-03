import retry from 'async-retry';
import type { Options } from 'async-retry';

import { client } from '../index';

export const DEFAULT_RETRY_CONFIG: Options = {
  retries: 3,
  maxTimeout: 5000,
};

export const DEFAULT_MUTATE_RETRY_CONFIG: Options = {
  ...DEFAULT_RETRY_CONFIG,
  retries: 0,
};

export const queryDatabase = async <QueryResultType>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig = DEFAULT_RETRY_CONFIG,
) => {
  console.log('\n[QUERY]: ', query);
  return retry(async (_bail) => {
    try {
      const start = Date.now();

      // @ts-ignore
      const res = await client.query<QueryResultType>(query, params);

      console.log(`elapsed: ${Date.now() - start}`);
      if (process.env.NODE_ENV === 'development') {
        console.log('row: ', res.rows);
      }

      return res;
    } catch (e: unknown) {
      console.error(e);
    }
  }, retryConfig);
};

export const getQuery = async <QueryReturnType>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig?: Options,
) => {
  const result = await queryDatabase<QueryReturnType>(query, params, retryConfig);

  if (!result?.rows) {
    return [];
  }

  return result.rows;
};

export const getFirstQuery = async <QueryReturnType>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig?: Options,
) => {
  const result = await queryDatabase<QueryReturnType>(query, params, retryConfig);

  if (!result?.rows) {
    return undefined;
  }

  return result.rows[0];
};

export const mutateAndReturnQuery = async <QueryReturnType>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig = DEFAULT_MUTATE_RETRY_CONFIG,
) => {
  const result = await queryDatabase<QueryReturnType>(query, params, retryConfig);

  return result?.rows ?? [];
};

export const mutateQuery = async (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig = DEFAULT_MUTATE_RETRY_CONFIG,
) => {
  await queryDatabase(query, params, retryConfig);
};
