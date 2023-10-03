import { getSelectedEntity } from '../stores/map-menu-store';

let timeoutId: NodeJS.Timeout;

export const selectedClickAnimation = (content: HTMLElement) => {
  const previouslySelected = getSelectedEntity();
  if (previouslySelected) {
    const previousContent = previouslySelected.marker.content as HTMLElement;
    previousContent.style.animationName = '';
  }

  clearTimeout(timeoutId);
  content.offsetWidth;
  content.style.animation = 'bounce .75s linear 0s 3';
  timeoutId = setTimeout(() => {
    content.style.animation = '';
  }, 2250);
};

export const dropAnimation = (content: HTMLElement, intersectionObserver: IntersectionObserver) => {
  content.style.opacity = '0';
  content.addEventListener('animationend', () => {
    content.classList.remove('drop');
    content.style.opacity = '1';
  });
  const time = Math.random(); // delay for easy to see the animation
  content.style.setProperty('--delay-time', time + 's');
  intersectionObserver.observe(content);
};
