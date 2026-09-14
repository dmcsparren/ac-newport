// Build-time feature flags.
//
// Flags are read from Vite env vars (import.meta.env.VITE_FEATURE_*). Because
// they are evaluated at build time, flipping a flag requires a rebuild/redeploy
// — set the value in your hosting env (e.g. Railway) and redeploy to toggle.
//
// A flag is considered ON only when the env var is exactly the string "true".
// Anything else (unset, "false", "0", etc.) is OFF. This keeps features hidden
// by default on production unless explicitly enabled.

const isEnabled = (value: string | undefined): boolean => value === 'true'

export const features = {
  /**
   * 2027 Season Memberships / Season Tickets experience.
   * Set VITE_FEATURE_MEMBERSHIPS=true to reveal the page, nav link, and
   * homepage call-to-action. Leave unset/false to hide everything on the
   * live site.
   */
  memberships: isEnabled(import.meta.env.VITE_FEATURE_MEMBERSHIPS),
} as const

export default features
