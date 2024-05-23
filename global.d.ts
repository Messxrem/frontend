import type { WalletProvider } from 'types/web3';

type CPreferences = {
  zone: string;
  width: string;
  height: string;
}

declare global {
  export interface Window {
    ethereum?: WalletProvider | undefined;
    coinzilla_display: Array<CPreferences>;
    ga?: {
      getAll: () => Array<{ get: (prop: string) => string }>;
    };
    abkw: string;
    __envs: Record<string, string>;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
