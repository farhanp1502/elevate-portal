import { headers } from 'next/headers';

export const getBranding = async () => {
  const hdrs = headers();
  const host = (hdrs.get('host') || '').toLowerCase();
  const skipList = [
    'app',
    'www',
    'dev',
    'staging',
    'tekdinext',
    'org',
    'com',
    'net',
  ];
  const parts = host.split('.');
  const domainPart =
    parts.find((p) => p && !skipList.includes(p)) || 'shikshagraha';
  const knownSuffixes = ['-qa', '-dev', '-staging'];
  let core = knownSuffixes.reduce(
    (name, suf) => (name.endsWith(suf) ? name.slice(0, -suf.length) : name),
    domainPart
  );
  if (core === 'shikshagrah') core = 'shikshagraha';

  let logo = '/icons/icon-192x192.png';
  let appName = core;

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (base) {
      const res = await fetch(`${base}/user/v1/public/branding`, {
        headers: { Origin: `https://${host}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        appName = data?.result?.code || core;
        logo =
          data?.result?.logoUrl ||
          data?.result?.logo ||
          '/icons/icon-192x192.png';
      }
    }
  } catch (e) {
    // Ignore errors and use fallback
  }

  return { appName, logo };
};