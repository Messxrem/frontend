import type { NFTTokenType, TokenType } from 'types/api/token';

export const NFT_TOKEN_TYPES: Array<{ title: string; id: NFTTokenType }> = [
  { title: 'DNC-721', id: 'DNC-721' },
  { title: 'DNC-1155', id: 'DNC-1155' },
  { title: 'DNC-404', id: 'DNC-404' },
];

export const TOKEN_TYPES: Array<{ title: string; id: TokenType }> = [
  { title: 'DNC-20', id: 'DNC-20' },
  ...NFT_TOKEN_TYPES,
];

export const NFT_TOKEN_TYPE_IDS = NFT_TOKEN_TYPES.map(i => i.id);
export const TOKEN_TYPE_IDS = TOKEN_TYPES.map(i => i.id);
