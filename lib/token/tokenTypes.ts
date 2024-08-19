import type { NFTTokenType, TokenType } from 'types/api/token';

export const NFT_TOKEN_TYPES: Array<{ title: string; id: NFTTokenType }> = [
  { title: 'DEX-721', id: 'DEX-721' },
  { title: 'DEX-1155', id: 'DEX-1155' },
  { title: 'DEX-404', id: 'DEX-404' },
];

export const TOKEN_TYPES: Array<{ title: string; id: TokenType }> = [
  { title: 'DEX-20', id: 'DEX-20' },
  ...NFT_TOKEN_TYPES,
];

export const NFT_TOKEN_TYPE_IDS = NFT_TOKEN_TYPES.map(i => i.id);
export const TOKEN_TYPE_IDS = TOKEN_TYPES.map(i => i.id);
