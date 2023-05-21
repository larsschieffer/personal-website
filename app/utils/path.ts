export function isLinkTargetingPathname(
  pathname?: string,
  linkTarget?: string
) {
  if (pathname == null || linkTarget == null) {
    return false;
  }

  return pathname.startsWith(`/${linkTarget}`);
}
