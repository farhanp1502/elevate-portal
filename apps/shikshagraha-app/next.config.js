//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
});

const PORTAL_BASE_URL = 'https://sunbird-editor.tekdinext.com';

const routes = {
  API: {
    GENERAL: {
      CONTENT_PREVIEW: '/content/preview/:path*',
      CONTENT_PLUGINS: '/content-plugins/:path*',
      GENERIC_EDITOR: '/generic-editor/:path*',
    },
  },
};

// ✅ Safely read env vars (may be undefined in Docker)
const TELEMETRY_BASE = process.env.NEXT_PUBLIC_TELEMETRY_URL;
const CLOUD_STORAGE_BASE = process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  reactStrictMode: false,

  nx: {
    svgr: false,
  },

  basePath: '',

  async rewrites() {
    const rewrites = [];

    if (TELEMETRY_BASE) {
      rewrites.push(
        {
          source: '/action/data/v3/telemetry',
          destination: `${TELEMETRY_BASE}/v1/telemetry`,
        },
        {
          source: '/action/v1/telemetry',
          destination: `${TELEMETRY_BASE}/v1/telemetry`,
        },
        {
          source: '/data/v3/telemetry',
          destination: `${TELEMETRY_BASE}/v1/telemetry`,
        }
      );
    }

    if (CLOUD_STORAGE_BASE) {
      rewrites.push({
        source: '/assets/public/:path*',
        destination: `${CLOUD_STORAGE_BASE}/:path*`,
      });
    }

    rewrites.push({
      source: routes.API.GENERAL.CONTENT_PREVIEW,
      destination: `${PORTAL_BASE_URL}${routes.API.GENERAL.CONTENT_PREVIEW}`,
    });

    return rewrites;
  },
};

const plugins = [withNx, withPWA];

module.exports = composePlugins(...plugins)(nextConfig);
