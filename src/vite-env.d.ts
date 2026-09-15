/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string
  /** Set to "true" to enable the 2027 Season Memberships experience. */
  readonly VITE_FEATURE_MEMBERSHIPS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
