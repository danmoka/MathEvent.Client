import { getRoute } from './get-route';
import images from '../constants/images';

export const getImageSrc = (src) => getRoute(`webrootdata/?src=${src}`);

export const prepareImage = (path, isDarkTheme) => {
  if (path) {
    return getImageSrc(path).replace(/\\/g, '/');
  }

  if (isDarkTheme) {
    return images.eventDefaultDark;
  }

  return images.eventDefault;
};
