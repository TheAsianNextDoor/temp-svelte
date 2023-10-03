import type { Marker } from './marker-utils';

export const MAP_MARKER_PIN_CLASS = 'map-marker-pin';

export type PinOptions = Omit<google.maps.marker.PinElementOptions, 'glyph'>;

interface PinElementConfig {
  type: string;
  iconHtml: string;
  pinOptions: PinOptions;
}

type MarkerPinTypes = 'default' | 'routes';

export const MARKER_PINS: Record<MarkerPinTypes, PinElementConfig> = {
  default: {
    type: 'default',
    iconHtml: '<i class="fa-solid fa-circle"></i>',
    pinOptions: {
      glyphColor: 'white',
      background: 'rgb(95, 142, 231)',
      borderColor: 'rgb(230, 221, 102)',
    },
  },
  routes: {
    type: 'routes',
    iconHtml: '<i class="fa-solid fa-road fa-lg"></i>',
    pinOptions: {
      glyphColor: 'black',
      background: 'yellow',
      borderColor: 'black',
    },
  },
} as const;

export const getMarkerPinElement = (node: HTMLElement) => {
  const pinElement = node.querySelector(`.${MAP_MARKER_PIN_CLASS}`);

  if (!pinElement) {
    console.error('missing pinElement');
    return;
  }

  return pinElement as HTMLElement;
};

export const changeMarkerPin = (
  marker: Marker,
  PinElement: typeof google.maps.marker.PinElement,
  pinDefinition: PinElementConfig,
) => {
  const icon = document.createElement('div');
  icon.innerHTML = pinDefinition.iconHtml;
  const faPin = new PinElement({
    glyph: icon,
    ...pinDefinition.pinOptions,
  });
  faPin.element.classList.add(MAP_MARKER_PIN_CLASS);
  faPin.element.dataset.pin_type = pinDefinition.type;

  const pinElement = getMarkerPinElement(marker.content as HTMLElement);
  pinElement?.replaceWith(faPin.element);
};

export const isMarkerPinOfType = (pinElement: HTMLElement | undefined, type: string) =>
  pinElement?.dataset?.pin_type === type;
