// import { sql } from '@vercel/postgres';
import {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '$env/static/private';
import pg from 'pg';

const { Client } = pg;

export const client = new Client({
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
});

client.connect();
