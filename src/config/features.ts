// Build-time feature flags.
//
// Flags are read from Vite env vars (import.meta.env.VITE_FEATURE_*). Because
// they are evaluated at build time, flipping a flag requires a rebuild/redeploy
// — set the value in your hosting env (e.g. Railway) and redeploy to toggle.

/** ON unless the env var is explicitly the string "false". */
const isEnabledByDefault = (value: string | undefined): boolean => value !== 'false'

export const features = {
  /**
   * 2027 Season Memberships / Season Tickets experience.
   * Visible by default. Set VITE_FEATURE_MEMBERSHIPS=false to hide the page,
   * nav link, and homepage call-to-action on the live site.
   */
  memberships: isEnabledByDefault(import.meta.env.VITE_FEATURE_MEMBERSHIPS),
} as const

export default features
