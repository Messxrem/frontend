import { chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { useAppContext } from 'lib/contexts/app';
import * as cookies from 'lib/cookies';

import CoinzillaTextAd from './CoinzillaTextAd';

const TextAd = ({ className }: {className?: string}) => {
  const hasAdblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED, useAppContext().cookies);

  if (!config.features.adsText.isEnabled || hasAdblockCookie) {
    return null;
  }

  return null;
};

export default chakra(TextAd);
