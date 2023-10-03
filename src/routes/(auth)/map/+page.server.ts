import { STATUS_ENUM } from '$lib/constants/status.js';
import { retrievePhasesBySite, type MapPhase } from './queries/retreive-phases-by-site.js';
import { retrieveMapSites, type MapSite } from './queries/retrieve-map-sites.js';

const findCurrentPhase = (phase: MapPhase) => phase.status_name === STATUS_ENUM.IN_PROGRESS;

export type HydratedMapSite = MapSite & {
  currentPhase: MapPhase | null;
  phases: MapPhase[];
  address: string;
};

const buildAddress = (
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
) => `${street} ${city}, ${state}, ${zipCode}, ${country}`;

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
  const {
    employee: { customer_id: customerId },
  } = await parent();

  const sites = await retrieveMapSites(customerId);

  const mapSitesWithPhases = await Promise.all(
    sites.map(async (site) => {
      const phases = await retrievePhasesBySite(site.site_id);

      const currentPhase = phases.find(findCurrentPhase) || null;

      return {
        ...site,
        address: buildAddress(site.street, site.city, site.state, site.zip_code, site.country),
        currentPhase,
        phases,
      };
    }),
  );

  return { sites: mapSitesWithPhases };
}
