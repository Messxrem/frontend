import { Flex, Divider, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';

import Settings from './settings/Settings';
import SwapButton from './SwapButton';
import TopBarStats from './TopBarStats';

const feature = config.features.swapButton;

const TopBar = () => {
  const bgColor = 'rgba(0, 0, 0, 0)';

  return (
    <Flex
      py={ 0 }
      px={{ base: 0, lg: 0 }}
      bgColor={ bgColor }
      justifyContent="space-between"
      alignItems="center"
    >
      {/* <TopBarStats/>
      <Flex alignItems="center">
        { feature.isEnabled && (
          <>
            <SwapButton/>
            <Divider mr={ 3 } ml={{ base: 2, sm: 3 }} height={ 4 } orientation="vertical"/>
          </>
        ) }
        <Settings/>
      </Flex> */}
    </Flex>
  );
};

export default React.memo(TopBar);
