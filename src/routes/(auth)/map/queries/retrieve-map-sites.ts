import { queryDb } from '$lib/db/query';
import type { Address, City, Client, Country, Site, State, Status, ZipCode } from '@prisma/client';

export type MapSite = Pick<
  Site,
  | 'site_id'
  | 'job_number'
  | 'site_name'
  | 'estimated_hours'
  | 'location'
  | 'scheduled_start_date_time'
  | 'scheduled_finished_date_time'
> &
  Pick<Status, 'status_name'> &
  Pick<Client, 'client_name'> &
  Pick<Address, 'street'> &
  Pick<City, 'city'> &
  Pick<State, 'state'> &
  Pick<Country, 'country'> &
  Pick<ZipCode, 'zip_code'>;

export const retrieveMapSites = async (customerId: string) =>
  queryDb.findMany<MapSite>(
    `
      SELECT 
        site.site_id, 
        site.job_number, 
        site.site_name,
        site.estimated_hours,
        site.location,
        site.scheduled_start_date_time,
        site.scheduled_finished_date_time,
        status.status_name,
        client.client_name,
        address.street,
        city.city,
        state.state,
        country.country,
        zip_code.zip_code
      FROM site
      LEFT JOIN client
        ON site.client_id = client.client_id
      LEFT JOIN status
        ON site.status_id = status.status_id
      LEFT JOIN address
        ON site.address_id = address.address_id
      LEFT JOIN city
        ON address.city_id = city.city_id
      LEFT JOIN state
        ON address.state_id = state.state_id
      LEFT JOIN zip_code
        ON address.zip_code_id = zip_code.zip_code_id
      LEFT JOIN country
        ON address.country_id = country.country_id
      WHERE site.customer_id = $1
    `,
    [customerId],
  );
