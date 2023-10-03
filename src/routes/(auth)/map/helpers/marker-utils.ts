import { hideMapFilter } from '../stores/map-filter-store';
import { setSelectedEntity, showMapMenu } from '../stores/map-menu-store';
import {
  addBaseHydratedMarker,
  getBaseHydratedMarkers,
  type HydratedMapMarker,
} from '../stores/map-marker-store';
import type { HydratedMapSite } from '../+page.server';
import { getMap } from '../stores/map-store';
import { getMapMode } from '../stores/map-mode-store';
import { dropAnimation, selectedClickAnimation } from './animation-helpers';
import {
  MAP_MARKER_PIN_CLASS,
  MARKER_PINS,
  changeMarkerPin,
  getMarkerPinElement,
  isMarkerPinOfType,
} from './marker-pin-utils';
import { addToMapRoutes } from '../stores/map-routes-store';

export type Marker = google.maps.marker.AdvancedMarkerElement;

export const markerClickEventListener = (
  hydratedMapMarker: HydratedMapMarker,
  PinElement: typeof google.maps.marker.PinElement,
) => {
  const { marker, site } = hydratedMapMarker;
  const content = marker.content as HTMLElement;

  showMapMenu();
  hideMapFilter();
  selectedClickAnimation(content);
  setSelectedEntity({ site, marker });

  if (getMapMode() === 'routes') {
    const pinElement = getMarkerPinElement(marker.content as HTMLElement);

    if (!isMarkerPinOfType(pinElement, MARKER_PINS.routes.type)) {
      addToMapRoutes(hydratedMapMarker);
      changeMarkerPin(marker, PinElement, MARKER_PINS.routes);
    }
  }
};

interface CreateMarkerArgs {
  site: HydratedMapSite;
  map: google.maps.Map;
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  PinElement: typeof google.maps.marker.PinElement;
  LatLng: typeof google.maps.LatLng;
  intersectionObserver: IntersectionObserver;
}

export const createMarker = ({
  site,
  map,
  AdvancedMarkerElement,
  PinElement,
  LatLng,
  intersectionObserver,
}: CreateMarkerArgs) => {
  const container = document.createElement('div');
  const icon = document.createElement('div');
  icon.innerHTML = MARKER_PINS.default.iconHtml;
  const faPin = new PinElement({
    glyph: icon,
    ...MARKER_PINS.default.pinOptions,
  });
  faPin.element.classList.add(MAP_MARKER_PIN_CLASS);
  container.appendChild(faPin.element);

  const marker = new AdvancedMarkerElement({
    map,
    position: new LatLng(site.location[0], site.location[1]),
    title: site.site_name,
    content: container,
  });
  const hydratedMapMarker: HydratedMapMarker = { id: site.site_id, marker, site };

  const content = marker.content as HTMLElement;
  content.classList.add('map-marker');
  dropAnimation(content, intersectionObserver);
  content.addEventListener('click', () => markerClickEventListener(hydratedMapMarker, PinElement));

  addBaseHydratedMarker(hydratedMapMarker);

  return marker;
};

export const removeMarkerFromMap = (marker: Marker) => {
  marker.map = null;
};

export const addMarkerToMap = (marker: Marker) => {
  marker.map = getMap();
};

export const showAllMarkers = () => {
  getBaseHydratedMarkers().forEach(({ marker }) => addMarkerToMap(marker));
};
