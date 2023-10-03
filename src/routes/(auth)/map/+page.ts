import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { Loader } from '@googlemaps/js-api-loader';

export const ssr = false;

export const load = async ({ data }) => {
  const loader = new Loader({
    apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
    version: 'beta',
    libraries: ['core', 'maps', 'marker'],
  });
  const { Map } = await loader.importLibrary('maps');
  const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
  const { LatLng } = await loader.importLibrary('core');

  return {
    ...data,
    Map,
    AdvancedMarkerElement,
    PinElement,
    LatLng,
  };
};
