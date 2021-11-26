import { reactive, readonly } from 'vue';
import debounce from './debounce';

const scroll = reactive({});

export default () => {
  const updateScroll = () => {
    scroll.x = window.scrollX;
    scroll.y = window.scrollY;
  };

  const scrollTo = (top, left = 0) => window.scroll({ top, left, behavior: 'smooth' });

  if (!scroll.x && !scroll.y) {
    updateScroll();
    document.addEventListener('scroll', debounce(() => {
      updateScroll();
    }), { passive: true });
  }

  return { scroll: readonly(scroll), scrollTo };
};
