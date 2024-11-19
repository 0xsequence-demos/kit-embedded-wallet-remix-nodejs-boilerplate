declare namespace NodeJS {
  interface ProcessEnv {
    VITE_PROJECT_ACCESS_KEY: string;
    VITE_WAAS_CONFIG_KEY: string;
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_APPLE_CLIENT_ID: string;
    VITE_WALLET_CONNECT_ID: string;
  }
}
