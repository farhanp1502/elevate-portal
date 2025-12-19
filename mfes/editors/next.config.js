//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

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

// ✅ Safely read env vars
const TELEMETRY_BASE = process.env.NEXT_PUBLIC_TELEMETRY_URL;
const CLOUD_STORAGE_BASE = process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  nx: {
    svgr: false,
  },

  async rewrites() {
    const rewrites = [
      {
        source: '/action/asset/v1/upload/:identifier*',
        destination: '/api/fileUpload',
      },
      {
        source: '/assets/pdfjs/:path*',
        destination: '/assets/:path*',
      },
      {
        source: '/action/content/v3/upload/url/:identifier*',
        destination: '/api/proxy?path=/action/content/v3/upload/url/:identifier*',
      },
      {
        source: '/action/content/v3/upload/:identifier*',
        destination: '/api/fileUpload',
      },
      {
        source: '/action/asset/:path*',
        destination: '/api/proxy?path=/action/asset/:path*',
      },
      {
        source: '/action/content/:path*',
        destination: '/api/proxy?path=/action/content/:path*',
      },
      {
        source: '/action/:path*',
        destination: '/api/proxy?path=/action/:path*',
      },
      {
        source: '/api/:path*',
        destination: '/api/proxy?path=/api/:path*',
      },
      {
        source: '/workspace/content/assets/:path*',
        destination: '/assets/:path*',
      },
      {
        source: routes.API.GENERAL.CONTENT_PREVIEW,
        destination: `${PORTAL_BASE_URL}${routes.API.GENERAL.CONTENT_PREVIEW}`,
      },
      {
        source: routes.API.GENERAL.CONTENT_PLUGINS,
        destination: `${PORTAL_BASE_URL}${routes.API.GENERAL.CONTENT_PLUGINS}`,
      },
      {
        source: routes.API.GENERAL.GENERIC_EDITOR,
        destination: `${PORTAL_BASE_URL}/:path*`,
      },
      {
        source: '/app/telemetry',
        destination: '/api/telemetry',
      },
    ];

    if (TELEMETRY_BASE) {
      rewrites.push(
        {
          source: '/action/data/v3/telemetry',
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

    return rewrites;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
