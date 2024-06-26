import type { ContractCodeIde } from 'types/client/contract';
import { NAVIGATION_LINK_IDS, type NavItemExternal, type NavigationLinkId } from 'types/client/navigation-items';
import type { ChainIndicatorId } from 'types/homepage';
import type { NetworkExplorer } from 'types/networks';
import type { ColorThemeId } from 'types/settings';

import { COLOR_THEMES } from 'lib/settings/colorTheme';

import * as views from './ui/views';
import { getEnvValue, getExternalAssetFilePath, parseEnvJson } from './utils';

const hiddenLinks = (() => {
  const parsedValue = parseEnvJson<Array<NavigationLinkId>>(getEnvValue('NEXT_PUBLIC_NAVIGATION_HIDDEN_LINKS')) || [];

  if (!Array.isArray(parsedValue)) {
    return undefined;
  }

  const result = NAVIGATION_LINK_IDS.reduce((result, item) => {
    result[item] = parsedValue.includes(item);
    return result;
  }, {} as Record<NavigationLinkId, boolean>);

  return result;
})();

const defaultColorTheme = (() => {
  const envValue = getEnvValue('NEXT_PUBLIC_COLOR_THEME_DEFAULT') as ColorThemeId | undefined;
  return COLOR_THEMES.find((theme) => theme.id === envValue);
})();

// eslint-disable-next-line max-len
const HOMEPAGE_PLATE_BACKGROUND_DEFAULT = 'rgba(32, 81, 92, 0.34)';

const UI = Object.freeze({
  sidebar: {
    logo: {
      'default': getExternalAssetFilePath('NEXT_PUBLIC_NETWORK_LOGO'),
      dark: getExternalAssetFilePath('NEXT_PUBLIC_NETWORK_LOGO_DARK'),
    },
    icon: {
      'default': getExternalAssetFilePath('NEXT_PUBLIC_NETWORK_ICON'),
      dark: getExternalAssetFilePath('NEXT_PUBLIC_NETWORK_ICON_DARK'),
    },
    hiddenLinks,
    otherLinks: parseEnvJson<Array<NavItemExternal>>(getEnvValue('NEXT_PUBLIC_OTHER_LINKS')) || [],
    featuredNetworks: getExternalAssetFilePath('NEXT_PUBLIC_FEATURED_NETWORKS'),
    plate: {
      background: 'rgba(15, 23, 42, 0.34)',
      
    }
  },
  footer: {
    links: getExternalAssetFilePath('NEXT_PUBLIC_FOOTER_LINKS'),
    frontendVersion: getEnvValue('NEXT_PUBLIC_GIT_TAG'),
    frontendCommit: getEnvValue('NEXT_PUBLIC_GIT_COMMIT_SHA'),
    backdropFilter: "blur(4px)",
    plate: {
      background: 'rgba(15, 23, 42, 0.34)',
      backdropFilter: "blur(4px)",
    }
    
  },
  homepage: {
    charts: parseEnvJson<Array<ChainIndicatorId>>(getEnvValue('NEXT_PUBLIC_HOMEPAGE_CHARTS')) || [],
    plate: {
      background: HOMEPAGE_PLATE_BACKGROUND_DEFAULT,
      textColor: 'white',
      
      // border: '1px solid white',
      // boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    showAvgBlockTime: getEnvValue('NEXT_PUBLIC_HOMEPAGE_SHOW_AVG_BLOCK_TIME') === 'false' ? false : true,
  },
  views,
  indexingAlert: {
    blocks: {
      isHidden: getEnvValue('NEXT_PUBLIC_HIDE_INDEXING_ALERT_BLOCKS') === 'true' ? true : false,
    },
    intTxs: {
      isHidden: getEnvValue('NEXT_PUBLIC_HIDE_INDEXING_ALERT_INT_TXS') === 'true' ? true : false,
    },
  },
  maintenanceAlert: {
    message: getEnvValue('NEXT_PUBLIC_MAINTENANCE_ALERT_MESSAGE'),
  },
  explorers: {
    items: parseEnvJson<Array<NetworkExplorer>>(getEnvValue('NEXT_PUBLIC_NETWORK_EXPLORERS')) || [],
  },
  ides: {
    items: parseEnvJson<Array<ContractCodeIde>>(getEnvValue('NEXT_PUBLIC_CONTRACT_CODE_IDES')) || [],
  },
  hasContractAuditReports: getEnvValue('NEXT_PUBLIC_HAS_CONTRACT_AUDIT_REPORTS') === 'true' ? true : false,
  colorTheme: {
    'default': defaultColorTheme,
  },
  
});

export default UI;
