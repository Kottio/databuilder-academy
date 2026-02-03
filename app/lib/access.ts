/**
 * Check if user can access a module based on their access type
 */
export function canAccessModule(
  userAccessType: string,
  moduleAccessTier: string,
): boolean {
  // Everyone can access FREE content
  if (moduleAccessTier === "FREE") return true;

  // PAID content requires PAID access
  if (moduleAccessTier === "PAID") return userAccessType === "PAID";

  // Future: Handle extensions like AI_MODULE
  // if (moduleAccessTier === "AI_MODULE") return userExtensions.includes("AI_MODULE");

  return false;
}

/**
 * Split modules into accessible and locked based on user access type
 */
export function splitModulesByAccess<T extends { accessTier: string }>(
  modules: T[],
  userAccessType: string,
): { accessible: T[]; locked: T[] } {
  const accessible = modules.filter((m) => canAccessModule(userAccessType, m.accessTier));
  const locked = modules.filter((m) => !canAccessModule(userAccessType, m.accessTier));
  return { accessible, locked };
}
