import BigNumber from 'bignumber.js';
import fpAdd from 'lodash/fp/add';

import type { AddressTokenBalance } from 'types/api/address';
import type { TokenType } from 'types/api/token';

import sumBnReducer from 'lib/bigint/sumBnReducer';
import { ZERO } from 'lib/consts';

export type TokenEnhancedData = AddressTokenBalance & {
  usd?: BigNumber ;
}

export type Sort = 'desc' | 'asc';

export type TokenSelectData = Record<TokenType, TokenSelectDataItem>;

export interface TokenSelectDataItem {
  items: Array<TokenEnhancedData>;
  isOverflow: boolean;
}

type TokenGroup = [string, TokenSelectDataItem];

const TOKEN_GROUPS_ORDER: Array<TokenType> = [ 'DEX-20', 'DEX-721', 'DEX-1155', 'DEX-404' ];

export const sortTokenGroups = (groupA: TokenGroup, groupB: TokenGroup) => {
  return TOKEN_GROUPS_ORDER.indexOf(groupA[0] as TokenType) > TOKEN_GROUPS_ORDER.indexOf(groupB[0] as TokenType) ? 1 : -1;
};

const sortErc1155or404Tokens = (sort: Sort) => (dataA: AddressTokenBalance, dataB: AddressTokenBalance) => {
  if (dataA.value === dataB.value) {
    return 0;
  }
  if (sort === 'desc') {
    return Number(dataA.value) > Number(dataB.value) ? -1 : 1;
  }

  return Number(dataA.value) > Number(dataB.value) ? 1 : -1;
};

const sortErc20Tokens = (sort: Sort) => (dataA: TokenEnhancedData, dataB: TokenEnhancedData) => {
  if (!dataA.usd && !dataB.usd) {
    return 0;
  }

  // keep tokens without usd value in the end of the group
  if (!dataB.usd) {
    return -1;
  }
  if (!dataA.usd) {
    return 0;
  }

  if (sort === 'desc') {
    return dataA.usd.gt(dataB.usd) ? -1 : 1;
  }

  return dataA.usd.gt(dataB.usd) ? 1 : -1;
};

const sortErc721Tokens = () => () => 0;

export const sortingFns = {
  'DEX-20': sortErc20Tokens,
  'DEX-721': sortErc721Tokens,
  'DEX-1155': sortErc1155or404Tokens,
  'DEX-404': sortErc1155or404Tokens,
};

export const filterTokens = (searchTerm: string) => ({ token }: AddressTokenBalance) => {
  if (!token.name) {
    return !searchTerm ? true : token.address.toLowerCase().includes(searchTerm);
  }

  return token.name?.toLowerCase().includes(searchTerm);
};

export const calculateUsdValue = (data: AddressTokenBalance): TokenEnhancedData => {
  if (data.token.type !== 'DEX-20') {
    return data;
  }

  const exchangeRate = data.token.exchange_rate;
  if (!exchangeRate) {
    return data;
  }

  const decimals = Number(data.token.decimals || '18');
  return {
    ...data,
    usd: BigNumber(data.value).div(BigNumber(10 ** decimals)).multipliedBy(BigNumber(exchangeRate)),
  };
};

export const getTokensTotalInfo = (data: TokenSelectData) => {
  const usd = Object.values(data)
    .map(({ items }) => items.reduce(usdValueReducer, ZERO))
    .reduce(sumBnReducer, ZERO);

  const num = Object.values(data)
    .map(({ items }) => items.length)
    .reduce(fpAdd, 0);

  const isOverflow = Object.values(data).some(({ isOverflow }) => isOverflow);

  return { usd, num, isOverflow };
};

const usdValueReducer = (result: BigNumber, item: TokenEnhancedData) => !item.usd ? result : result.plus(BigNumber(item.usd));
