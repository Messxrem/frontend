import config from 'configs/app';

const PRODUCTION_PROPERTY_SLUG = '127fddd522';
const HYPE_API_URL = 'https://api.hypelab.com';

export const hypeInit = (() => {
  const feature = config.features.adsBanner;

  if (!feature.isEnabled || feature.provider !== 'hype') {
    return;
  }

  return;
})();
