/**
 * Unified Navigation & Deep-Linking Utility for Nagarmitra
 * Handles URL parameter mapping and new-tab opening across all portals.
 */

export const getTabUrl = (tab, subTab = null, auth = null) => {
  const params = new URLSearchParams();
  if (tab) params.set('tab', tab);
  if (subTab) params.set('sub', subTab);
  if (auth) params.set('auth', auth);
  const qs = params.toString();
  return qs ? `/?${qs}` : '/';
};

export const openInNewTab = (tab, subTab = null, auth = null) => {
  const url = getTabUrl(tab, subTab, auth);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const parseUrlParams = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || null;
    const sub = params.get('sub') || params.get('module') || null;
    const auth = params.get('auth') || null;
    return { tab, sub, auth };
  } catch {
    return { tab: null, sub: null, auth: null };
  }
};
