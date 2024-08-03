import type { NFTTokenType, TokenType } from 'types/api/token';

export const NFT_TOKEN_TYPES: Array<{ title: string; id: NFTTokenType }> = [
  { title: 'DNC-721', id: 'ERC-721' },
  { title: 'DNC-1155', id: 'ERC-1155' },
  { title: 'DNC-404', id: 'ERC-404' },
];

export const TOKEN_TYPES: Array<{ title: string; id: TokenType }> = [
  { title: 'DNC-20', id: 'ERC-20' },
  ...NFT_TOKEN_TYPES,
];

export const NFT_TOKEN_TYPE_IDS = NFT_TOKEN_TYPES.map(i => i.id);
export const TOKEN_TYPE_IDS = TOKEN_TYPES.map(i => i.id);
