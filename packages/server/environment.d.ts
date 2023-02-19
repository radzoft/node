declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      HOST?: string;
      FIREBASE_PROJECT_ID: string;
      GOOGLE_CLIENT_ID:string;
      FIREBASE_API_KEY:string;
      FIREBASE_AUTH_DOMAIN:string;
      FIREBASE_STORAGE_BUCKET:string;
      FIREBASE_MESSAGING_ID:string;
      FIREBASE_APP_ID:string;
      SMTP_PASSWORD:string;
      SMTP_USERNAME:string;
      SMTP_HOST:string;
      SMTP_PORT:string;
      SMTP_FROM:string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}