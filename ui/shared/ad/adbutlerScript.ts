/* eslint-disable max-len */
import config from 'configs/app';

export const ADBUTLER_ACCOUNT = 182226;

export const connectAdbutler = `if (!window.AdButler){(function(){var s = document.createElement("script"); s.async = true; s.type = "text/javascript";s.src = 'https://servedbyadbutler.com/app.js';var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(s, n);}());}`;

export const placeAd = (() => {
  const feature = config.features.adsBanner;

  if (!('adButler' in feature)) {
    return;
  }

  return;
})();
