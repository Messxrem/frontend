import app from './app';
import { getEnvValue } from './utils';

const defaultImageUrl = '/static/og_placeholder.png';

const meta = Object.freeze({
  promoteBlockscoutInTitle: 'false',
  og: {
    description: getEnvValue('NEXT_PUBLIC_OG_DESCRIPTION') || '',
    imageUrl: app.baseUrl + (defaultImageUrl),
    enhancedDataEnabled: getEnvValue('NEXT_PUBLIC_OG_ENHANCED_DATA_ENABLED') === 'true',
  },
  seo: {
    enhancedDataEnabled: getEnvValue('NEXT_PUBLIC_SEO_ENHANCED_DATA_ENABLED') === 'true',
  },
});

export default meta;
