declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_URI: string;

      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
