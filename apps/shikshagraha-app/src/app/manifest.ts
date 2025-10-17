import { MetadataRoute } from 'next';
import { getBranding } from '../utils/branding';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { appName, logo } = await getBranding();

  return {
    name: appName,
    short_name: appName,
    description: `Welcome to ${appName}`,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1976d2',
    icons: [
      {
        src: logo,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: logo,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}