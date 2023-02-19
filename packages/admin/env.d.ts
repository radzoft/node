// import "vite/client"

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_GOOGLE_CLIENT_ID:string
  readonly VITE_apiKey:string
  readonly VITE_authDomain:string
  readonly VITE_projectId:string
  readonly VITE_storageBucket:string
  readonly VITE_messagingSenderId:string
  readonly VITE_appId:string
  readonly VITE_API_URL:string
  readonly VITE_SITE_NAME:string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
